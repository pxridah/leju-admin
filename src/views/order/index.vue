<template>
  <div>
    <el-card class="margin-30">
      <div slot="header">条件查询</div>
      <el-form ref="orderForm" :model="orderQuery" label-width="80px">
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="订单编号">
              <el-input v-model="orderQuery.orderSn" placeholder="请填写订单编号" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单类型">
              <el-select v-model="orderQuery.orderType" placeholder="订单类型" size="mini" style="width:100%" clearable>
                <el-option
                  v-for="item in orderTypeOptions"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="支付方式">
              <el-select v-model="orderQuery.payType" placeholder="支付方式" size="mini" style="width:100%" clearable>
                <el-option
                  v-for="item in payTypeOptions"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单状态">
              <el-select v-model="orderQuery.status" placeholder="订单状态" size="mini" style="width:100%" clearable>
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="18">
            <el-form-item>
              <el-button type="primary" size="mini" @click="onOrderSubmit">查询</el-button>
              <el-button type="default" size="mini" @click="onOrderReset()">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="margin-30">
      <el-table
        :data="orderList"
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
          label="支付方式"
          width="150"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.payType===0" effect="dark" style="font-size: 25px;">
              <svg-icon icon-class="alipay" />
            </el-tag>
            <el-tag v-else-if="scope.row.payType===1" effect="dark" style="font-size: 25px;" type="success">
              <svg-icon icon-class="weixin" />
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="订单状态"
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
          prop="createTime"
          label="添加时间"
          width="200"
        />
        <el-table-column
          align="center"
          prop="memberUsername"
          label="用户账号"
          width="200"
        />
        <el-table-column align="center" label="订单类型" width="200">
          <template slot-scope="scope">
            <!-- <router-link></router-link> -->
            <el-tag
              v-if="scope.row.orderType === 1"
              type="warning"
            >秒杀订单</el-tag>
            <el-tag v-else type="success">正常订单</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="note"
          label="备注"
          width="150"
        />
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
          width="150"
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
import { getOrderList } from '@/api/order/list/index'
import pageMix from '@/mixins/pageMix'
export default {
  filters: {
    statusText(val, type) {
      if (val === 0) {
        return type ? 'danger' : '待付款'
      } else if (val === 1) {
        return type ? 'warning' : '待发货'
      } else if (val === 2) {
        return type ? '' : '已发货'
      } else if (val === 3) {
        return type ? 'success' : '已完成'
      } else if (val === 4) {
        return type ? 'info' : '退货中'
      } else {
        return type ? 'info' : '无效订单'
      }
    }
  },
  mixins: [pageMix],
  data() {
    return {
      orderList: [],
      orderQuery: {
        'deliverySn': '',
        'id': '',
        'memberUsername': '',
        'orderSn': '',
        'orderType': '',
        'payType': '',
        'sourceType': '',
        'status': ''
      },
      orderTypeOptions: [
        {
          // 数据格式有问题
          value: null,
          name: '正常订单'
        },
        {
          value: 1,
          name: '秒杀订单'
        }
      ],
      payTypeOptions: [
        {
          value: 0,
          name: '支付宝'
        },
        {
          value: 1,
          name: '微信'
        }
      ],
      statusOptions: [
        {
          value: 0,
          name: '待付款'
        },
        {
          value: 1,
          name: '待发货'
        },
        {
          value: 2,
          name: '已发货'
        },
        {
          value: 3,
          name: '已完成'
        },
        {
          value: 4,
          name: '退货中'
        },
        {
          value: 5,
          name: '无效订单'
        }
      ]
    }
  },
  created() {
    this.init()
  },
  methods: {
    onOrderSubmit() {
      this.init()
    },
    onOrderReset() {
      this.orderQuery = {
        'deliverySn': '',
        'id': '',
        'memberUsername': '',
        'orderSn': '',
        'orderType': '',
        'payType': '',
        'sourceType': '',
        'status': ''
      }
      this.init()
    },
    handleView(item) {
      this.$router.push({ name: 'orderDetail', params: { id: item.id }})
    },
    async init() {
      const res = await getOrderList(this.start, this.limit, this.orderQuery)
      this.totalRows = res.data.total
      this.orderList = res.data.rows
    }
  }

}
</script>
<style lang="scss" scoped>

</style>
