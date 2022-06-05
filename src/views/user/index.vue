<template>
  <div>
    <el-card class="margin-30">
      <div slot="header">注册用户列表</div>
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
          label="头像"
        >
          <template slot-scope="scope">
            <el-image
              style="width: 60px; height: 60px"
              :src="scope.row.icon"
              fit="fill"
            />
          </template>
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="nickname"
          label="昵称"
        />
        <el-table-column
          header-align="center"
          align="center"
          prop="realname"
          label="真实姓名"
        />
        <el-table-column
          header-align="center"
          align="center"
          label="性别"
        >
          <template slot-scope="scope">
            {{ scope.row.sex?'女':'男' }}
          </template>
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="phone"
          label="电话"
        />
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
  </div>
</template>
<script>
import pageMix from '@/mixins/pageMix'
import { getMembersList } from '@/api/user/list/index'
export default {
  mixins: [pageMix],
  data() {
    return {
      users: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      const res = await getMembersList(this.start, this.limit)
      console.log(res)
      this.users = res.data.rows
      this.totalRows = res.data.total
    }
  }

}
</script>
<style lang="scss" scoped>

</style>
