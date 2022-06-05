<template>
  <div>
    <el-card class="margin-30">
      <div slot="header">条件查询</div>
      <el-form ref="queryForm" :model="queryForm" label-width="80px">
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="昵称">
              <el-input v-model="queryForm.nickname" placeholder="昵称模糊查询" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用户名">
              <el-input v-model="queryForm.username" placeholder="用户名模糊查询" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="12">
            <el-form-item>
              <el-button type="primary" size="mini" @click="onSubmit">查询</el-button>
              <el-button type="default" size="mini" @click="onReset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="margin-30">
      <div slot="header">
        <el-button v-btn-permi:add type="primary" @click="handleAdd">新增</el-button>
      </div>
      <el-table
        :data="users"
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
          prop="username"
          label="用户名"
        />
        <el-table-column
          header-align="center"
          align="center"
          prop="nick_name"
          label="昵称"
        />
        <el-table-column
          header-align="center"
          align="center"
          label="头像"
        >
          <template slot-scope="scope">
            <el-image
              style="width: 60px; height: 60px"
              :src="scope.row.salt"
              fit="fill"
            />
          </template>
        </el-table-column>

        <el-table-column
          header-align="center"
          align="center"
          label="角色"
          prop="roles"
        />
        <el-table-column
          header-align="center"
          align="center"
          prop="create_time"
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

    <el-dialog title="编辑用户" :visible.sync="dialogFormVisible" @close="handleCancel">
      <el-form :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.username" autocomplete="off" size="mini" />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nickName" autocomplete="off" size="mini" />
        </el-form-item>
        <el-form-item v-if="!form.id" label="密码">
          <el-input v-model="form.password" type="password" autocomplete="off" size="mini" />
        </el-form-item>
        <el-form-item label="用户头像">
          <el-upload
            class="avatar-uploader"
            action="/lejuAdmin/material/uploadFileOss"
            :headers="token"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.salt" :src="form.salt" class="avatar" style="width:40px;height:40px">
            <el-avatar v-else icon="el-icon-user-solid" :src="form.salt" />
          </el-upload>
        </el-form-item>
        <el-form-item label="选择角色">
          <el-select v-model="form.roleIds" multiple placeholder="请选择" size="mini" clearable>
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            />
          </el-select>
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
import pageMix from '@/mixins/pageMix'
import { getUserList, getAllRoles, saveUserRoles, getUserDetail, updateUserRoles, removeUser } from '@/api/auth/user/index'
import { getToken } from '@/utils/myAuth'
export default {
  mixins: [pageMix],
  data() {
    return {
      queryForm: {
        'nickName': '',
        'username': ''
      },
      users: [],
      roles: [],
      form: {
        'isDeleted': false,
        'nickName': '',
        'password': '',
        'roleIds': [],
        'salt': '',
        'username': ''
      },
      dialogFormVisible: false
    }
  },
  computed: {
    token() {
      return { token: getToken() }
    }
  },
  created() {
    this.init()
  },
  methods: {
    handleCancel() {
      this.form = {
        'isDeleted': false,
        'nickName': '',
        'password': '',
        'roleIds': [],
        'salt': '',
        'username': ''
      }
      this.dialogFormVisible = false
    },
    async handleConfirm() {
      try {
        if (this.form.id) {
          await updateUserRoles(this.form)
        } else {
          await saveUserRoles(this.form)
        }
        this.$message.success('成功')
        this.handleCancel()
        this.init()
      } catch (error) {
        this.$message.error('失败')
      }
    },
    handleAvatarSuccess(res) {
      if (res.success) {
        this.form.salt = res.data.fileUrl
      } else {
        this.$message.error(res.message)
      }
    },
    beforeAvatarUpload(file) {
      var reg = /image\/(jpeg|png|gif|webp)/ig
      const isTypeOk = reg.test(file.type)
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isTypeOk) {
        this.$message.error('上传头像图片只能是 jpeg|png|gif|webp 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isTypeOk && isLt2M
    },
    async init() {
      const res = await getUserList(this.start, this.limit)
      this.users = res.data.rows
      this.totalRows = res.data.total
      const res1 = await getAllRoles()
      this.roles = res1.data.items
      console.log(res1)
    },
    handleAdd() {
      this.dialogFormVisible = true
    },
    async handleDelete(item) {
      try {
        await removeUser(item.id)
        this.$message.success('成功')
        this.init()
      } catch (error) {
        this.$message.error('失败')
      }
    },
    async handleEdit(item) {
      this.dialogFormVisible = true
      const res = await getUserDetail(item.id)
      this.form = res.data.user
    },
    onSubmit() {
    },
    onReset() {
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
