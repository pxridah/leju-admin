<template>
  <div class="recommends">
    <el-card class="margin-30">
      <div slot="header"><el-button type="primary" size="small" @click="handleAdd">新增</el-button></div>
      <el-table
        :data="recommends"
        style="width: 100%"
        border
      >
        <el-table-column
          align="center"
          type="index"
          label="序号"
          fixed
          width="50"
        />
        <el-table-column
          align="center"
          label="商品图片"
          width="150"
        >
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.pic"
              fit="fill"
            />
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="活动时间"
          width="250"
        >
          <template slot-scope="scope">
            <p>开始时间: {{ scope.row.promotionStartTime }}</p>
            <p>结束时间: {{ scope.row.promotionEndTime }}</p>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="是否过期"
        >
          <template slot-scope="scope">
            {{ scope.row.promotionEndTime | handleTime }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="商品名称"
          width="150"
        />
        <el-table-column
          align="center"
          prop="brandName"
          label="品牌名称"
          width="150"
        />
        <el-table-column
          align="center"
          prop="brandName"
          label="商品价格"
          width="150"
        />
        <el-table-column
          align="center"
          prop="productCategoryName"
          label="商品类别"
          width="100"
        />
        <el-table-column
          align="center"
          prop="createTime"
          label="创建时间"
          width="150"
        />
        <el-table-column
          align="center"
          width="150"
          fixed="right"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="text" style="color:red" icon="el-icon-delete" size="middle" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <detail-com ref="detail" @success="detailSuccess" />
  </div>
</template>
<script>
import { getAllRecommends, delteRecommend } from '@/api/market/list/index'
import detailCom from '@/views/market/components/detail'

export default {
  components: { detailCom },
  filters: {
    handleTime(val) {
      const endTime = new Date(val).getTime()
      const now = new Date().getTime()
      return endTime - now > 0 ? '否' : '是'
    }
  },
  data() {
    return {
      recommends: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    detailSuccess() {
      this.init()
    },
    handleAdd() {
      this.$refs.detail.openDetail()
    },
    async handleDelete(item) {
      try {
        await delteRecommend(item.recommendId)
        this.$message.success('删除成功')
        this.init()
      } catch (error) {
        this.$message.error('删除失败')
      }
    },
    async init() {
      const res = await getAllRecommends()
      this.recommends = res.data.items
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
