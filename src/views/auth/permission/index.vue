<template>
  <div>
    <el-card class="margin-30">
      <div slot="header">
        <el-button type="warning" size="mini" @click="goInitMenu">初始化菜单</el-button>
        <el-button type="primary" size="mini" @click="goAddMenu">新增菜单</el-button>
      </div>
      <el-table
        :data="menuList"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column label="菜单名称" width="200" fixed>
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span><svg-icon v-if="scope.row.hidden" title="隐藏,不可见" icon-class="hidden" class-name="custom-class" />
          </template>
        </el-table-column>
        <el-table-column label="图标" width="100">
          <template slot-scope="scope">
            <template v-if="scope.row.icon">
              <i v-if="/^el-/.test(scope.row.icon)" :class="scope.row.icon" />
              <svg-icon v-else :icon-class="scope.row.icon" class-name="icon" />
            </template>
          </template>
        </el-table-column>
        <el-table-column label="等级" prop="level" width="100" />
        <el-table-column label="排序" prop="sort" width="100" />
        <el-table-column
          label="权限标识"
          prop="permissionValue"
          width="200"
        />
        <el-table-column label="路由" prop="path" width="200" />
        <el-table-column label="组件路径" prop="component" width="200" />
        <el-table-column label="是否可用" prop="status" width="100" />
        <el-table-column label="创建时间" prop="createTime" width="200" />

        <el-table-column
          align="center"
          label="操作"
          width="200"
        >
          <template slot-scope="scope">
            <el-button v-btn-permi:edit type="text" icon="el-icon-edit" size="middle" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button v-btn-permi:remove type="text" style="color:red" icon="el-icon-delete" size="middle" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <MenuTree ref="menuTree" @refresh="init" />
    <MenuForm ref="menuForm" :options="menuList" @refresh="init" />
  </div>
</template>
<script>
import { getAllPermissions, removePermission } from '@/api/auth/permission/index'
import MenuTree from './components/MenuTree.vue'
import MenuForm from './components/MenuForm.vue'
export default {
  components: { MenuTree, MenuForm },
  data() {
    return {
      menuList: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    async handleDelete(item) {
      try {
        await removePermission(item.id)
        this.$message.success('成功')
        this.init()
      } catch (error) {
        this.$message.error('失败')
      }
    },
    handleEdit(item) {

    },
    goAddMenu() {
      this.$refs.menuForm.openMenuForm()
    },
    goInitMenu() {
      this.$refs.menuTree.openMenuTree()
    },
    async init() {
      const res = await getAllPermissions()
      this.menuList = res.data.menus
      console.log(this.menuList)
    }
  }
}
</script>
<style lang="">

</style>
