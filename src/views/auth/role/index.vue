<template>
  <div>
    <el-card class="margin-30">
      <div slot="header"><el-button v-btn-permi:add type="primary" @click="handleAdd">新增角色</el-button></div>
      <el-table
        :data="roles"
        style="width: 100%"
        border
      >
        <el-table-column
          type="index"
          label="#"
          width="50"
          align="center"
        />
        <el-table-column
          header-align="center"
          align="center"
          prop="roleName"
          label="角色名称"
        />
        <el-table-column
          header-align="center"
          align="center"
          prop="roleCode"
          label="角色编码"
        />
        <el-table-column
          header-align="center"
          align="center"
          prop="remark"
          label="备注"
        />
        <el-table-column
          header-align="center"
          align="center"
          prop="createTime"
          label="添加时间"
        />
        <el-table-column
          align="center"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button v-btn-permi:edit type="text" icon="el-icon-edit" size="middle" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button v-btn-permi:remove type="text" style="color:red" icon="el-icon-delete" size="middle" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        :current-page="start"
        :page-size="limit"
        :total="totalRows"
        :page-sizes="[5, 10, 15]"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <el-dialog title="编辑角色" :visible.sync="dialogFormVisible" @close="handleCancel">
      <el-form :model="form" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="form.roleName" autocomplete="off" size="mini" />
        </el-form-item>
        <el-form-item label="角色编码">
          <el-input v-model="form.roleCode" autocomplete="off" size="mini" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input
            v-model="form.remark"
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="选择菜单">
          <el-row :gutter="10">
            <el-col :span="6" :offset="0">
              <el-checkbox v-model="isExpand" :indeterminate="false" @change="handelExpand">展开/关闭</el-checkbox>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-checkbox v-model="isSelectAll" :indeterminate="false" @change="handleSelectAll">全选/取消权限</el-checkbox>
            </el-col>
            <el-col :span="24">
              <el-tree
                ref="tree"
                v-loading="treeLoad"
                :props="props"
                show-checkbox
                :data="menuList"
                node-key="id"
              />
            </el-col>
          </el-row>

        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getAllRoles, getAllPermissions, saveRolePermissions, getRolePermissions, updateRolePermissions, removeRole } from '@/api/auth/role/index'
import pageMix from '@/mixins/pageMix'
export default {
  mixins: [pageMix],
  data() {
    return {
      roles: [],
      dialogFormVisible: false,
      form: {
        'isDeleted': false,
        'permissionIds': [
          ''
        ],
        'remark': '',
        'roleCode': '',
        'roleName': ''
      },
      // 树形控件配置
      treeLoad: false,
      menuList: [],
      props: {
        label: 'title',
        children: 'children'
      },
      isExpand: false,
      isSelectAll: false,
      selectKeys: []

    }
  },
  created() {
    this.init()
    this.getMenuList()
  },
  methods: {
    // 处理展开
    handelExpand(state) {
      var nodes = this.$refs.tree.store.nodesMap
      for (var i in nodes) {
        nodes[i].expanded = state
      }
    },
    // 处理全选
    handleSelectAll(v) {
      if (v) {
        this.seltAllSelect(this.menuList)
        this.$refs.tree.setCheckedKeys(this.selectKeys)
      } else {
        this.$refs.tree.setCheckedKeys([])
      }
    },
    // 递归处理
    seltAllSelect(menuList) {
      for (var i = 0; i < menuList.length; i++) {
        var item = menuList[i]
        this.selectKeys.push(item.id)
        if (item.children && item.children.length > 0) {
          this.seltAllSelect(item.children)
        }
      }
    },

    async handleConfirm() {
      this.form.permissionIds = this.$refs.tree.getCheckedKeys()
      try {
        if (this.form.id) {
          await updateRolePermissions(this.form)
        } else {
          await saveRolePermissions(this.form)
        }

        this.$message.success('成功')
        this.handleCancel()
        this.init()
      } catch (error) {
        this.$message.error('失败')
      }
    },
    handleCancel() {
      this.form = {
        'isDeleted': false,
        'permissionIds': [
          ''
        ],
        'remark': '',
        'roleCode': '',
        'roleName': ''
      }
      this.selectKeys = []
      this.$refs.tree.setCheckedKeys([])
      this.dialogFormVisible = false
    },

    async handleEdit(item) {
      this.dialogFormVisible = true
      this.treeLoad = true
      this.form = item

      const res = await getRolePermissions(item.id)
      this.selectKeys = res.data.role.permissionIds
      this.$refs.tree.setCheckedKeys(this.selectKeys)
      this.treeLoad = false
    },
    async handleDelete(item) {
      try {
        await removeRole(item.id)
        this.$message.success('成功')
        this.init()
      } catch (error) {
        this.$$message.error('失败')
      }
    },
    handleAdd() {
      this.dialogFormVisible = true
    },
    async getMenuList() {
      const res = await getAllPermissions()
      this.menuList = res.data.menus
    },
    async init() {
      const res = await getAllRoles(this.start, this.limit)
      this.roles = res.data.rows
      this.totalRows = res.data.total
    }
  }
}
</script>
<style lang="scss">

</style>
