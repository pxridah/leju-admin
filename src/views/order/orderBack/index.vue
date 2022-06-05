<template>
  <div>
    <el-card class="margin-30">
      <div slot="header">条件查询</div>
      <el-form ref="orderForm" :model="orderBackQuery" label-width="80px">
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="订单编号">
              <el-input v-model="orderBackQuery.orderSn" placeholder="请填写订单编号" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单类型">
              <el-select v-model="orderBackQuery.status" placeholder="订单类型" size="mini" style="width:100%" clearable>
                <el-option
                  v-for="item in backStatusOptions"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6" :offset="12">
            <el-form-item>
              <el-button type="primary" size="mini" @click="onOrderBackSubmit">查询</el-button>
              <el-button type="default" size="mini" @click="onOrderBackReset()">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="margin-30">
      <el-table
        :data="backList"
        border
      >
        <el-table-column
          align="center"
          fixed
          label="#"
          type="index"
          width="50"
        />
        <el-table-column
          align="center"
          prop="orderSn"
          label="订单编号"
          width="200"
        />

        <el-table-column
          align="center"
          label="退单状态"
          width="150"
        >
          <template slot-scope="scope">
            <el-tag effect="dark" :type="scope.row.status | statusText('type')">
              {{ scope.row.status | statusText }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="description"
          label="描述"
          width="200"
        />
        <el-table-column
          align="center"
          prop="reason"
          label="退单原因"
          width="200"
        />

        <el-table-column
          align="center"
          prop="productName"
          label="商品名称"
          width="150"
        />
        <el-table-column
          label="商品属性"
          align="center"
          width="200"
        >
          <template slot-scope="scope">
            <span v-for="attr in JSON.parse(scope.row.productAttr)" :key="attr.value">
              {{ attr.key }}:{{ attr.value }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="handleNote"
          label="商家备注"
          width="150"
        />
        <el-table-column
          align="center"
          prop="createTime"
          label="添加时间"
          width="150"
        />
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
          width="100"
        >
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-view" size="middle" @click="handleView(scope.row)">查看订单</el-button>
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
  </div>
</template>
<script>
import { findReturnApply } from '@/api/order/back/index'
import pageMix from '@/mixins/pageMix'
export default {
  filters: {
    statusText(val, type) {
      if (val === 0) {
        return type ? 'danger' : '待处理'
      } else if (val === 1) {
        return type ? 'warning' : '退货中'
      } else if (val === 2) {
        return type ? 'success' : '已完成'
      } else {
        return type ? 'info' : '已拒绝'
      }
    }
  },
  mixins: [pageMix],
  data() {
    return {
      backList: [],
      orderBackQuery: {
        'createTime': '',
        'handleTime': '',
        'memberUsername': '',
        'orderId': '',
        'orderSn': '',
        'status': ''
      },
      backStatusOptions: [
        {
          value: 0,
          name: '待处理'
        },
        {
          value: 1,
          name: '退货中'
        },
        {
          value: 2,
          name: '已完成'
        },
        {
          value: 3,
          name: '已拒绝'
        }
      ]
    }
  },
  created() {
    this.init()
  },
  methods: {
    onOrderBackSubmit() {
      this.init()
    },
    onOrderBackReset() {
      this.orderBackQuery = {
        'createTime': '',
        'handleTime': '',
        'memberUsername': '',
        'orderId': '',
        'orderSn': '',
        'status': ''
      }
      this.init()
    },
    handleView(item) {
      this.$router.push({ name: 'orderBackDetail', params: { id: item.id }})
    },

    async init() {
      const res = await findReturnApply(this.start, this.limit, this.orderBackQuery)
      this.totalRows = res.data.total
      this.backList = res.data.rows
    }
  }

}
</script>
<style lang="scss" scoped>

</style>
