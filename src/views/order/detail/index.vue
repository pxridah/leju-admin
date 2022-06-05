<template>
  <div>

    <el-card class="margin-30">
      <el-row :gutter="10">
        <el-col :span="24">
          <el-steps :active="step" align-center>
            <el-step title="待付款" :description="order.createTime" />
            <el-step title="待发货" :description="step>1?order.paymentTime:''" />
            <el-step title="已发货" :description="step>2?order.deliveryTime:''" />

            <el-step v-if="step===4" title="退货中" :description="step>4?order.finishTime:''" />
            <el-step v-else title="已完成" :description="step>3?order.receiveTime:''" />
          </el-steps>
        </el-col>
        <el-col :span="24" class="line">
          <el-col :span="24">
            <p><b>订单信息:</b> <el-tag effect="dark" size="small" :type="order.status|statusText('type')">{{ order.status|statusText }}</el-tag></p>
          </el-col>

          <el-col :span="6">
            <p>订单金额: <span style="color:red">{{ order.totalAmount }}</span></p>
          </el-col>
          <el-col :span="6">
            <p>订单编号: <span>{{ order.orderSn }}</span></p>
          </el-col>
          <el-col :span="6">
            <p>用户账号: <span>{{ order.memberUsername }}</span></p>
          </el-col>
          <el-col :span="6">
            <p>备注: <span>{{ order.totalAmount }}</span></p>
          </el-col>
          <el-col :span="6">
            <p>下单时间: <span>{{ order.createTime }}</span></p>
          </el-col>
          <el-col :span="6">
            <p>付款时间: <span>{{ order.paymentTime }}</span></p>
          </el-col>
          <el-col :span="6">
            <p>发货时间: <span>{{ order.deliveryTime }}</span></p>
          </el-col>
          <el-col :span="6">
            <p>收货时间: <span>{{ order.receiveTime }}</span></p>
          </el-col>
        </el-col>

        <el-col :span="24" class="line">
          <el-col :span="24">
            <p><b>收货人信息:</b></p>
          </el-col>

          <el-col :span="6">
            <p>收货人: <span style="color:red">{{ order.receiverName }}</span></p>
          </el-col>
          <el-col :span="6">
            <p>用户姓名: <span>{{ order.memberUsername }}</span></p>
          </el-col>
          <el-col :span="6">
            <p>手机号码: <span>{{ order.receiverPhone }}</span></p>
          </el-col>
          <el-col :span="6">
            <p>邮政编码: <span>{{ order.receiverPostCode }}</span></p>
          </el-col>
          <el-col :span="6">
            <p>地市: <span>{{ order.receiverProvince }} {{ order.receiverCity }}</span></p>
          </el-col>
          <el-col :span="6">
            <p>详细地址: <span>{{ order.receiverDetailAddress }}</span></p>
          </el-col>
        </el-col>

        <el-col :span="24" class="line">
          <el-col :span="24">
            <p><b>商品信息:</b></p>
          </el-col>
          <el-col :span="24">
            <el-table
              :data="products"
              style="width: 100%"
              border
            >
              <el-table-column
                prop="productName"
                label="商品名称"
                align="center"
                width="200"
              />

              <el-table-column
                label="商品图片"
                align="center"
                width="200"
              >
                <template slot-scope="scope">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="scope.row.productSkuPic"
                    fit="fill"
                  />
                </template>
              </el-table-column>

              <el-table-column
                label="是否退货"
                align="center"
                width="100"
              >
                <template slot-scope="scope">
                  {{ scope.row.isReturn?'是':'否' }}
                </template>
              </el-table-column>
              <el-table-column
                prop="productBrand"
                label="品牌"
                align="center"
                width="200"
              />
              <el-table-column
                prop="productPrice"
                label="价格"
                align="center"
                width="200"
              />
              <el-table-column
                prop="productQuantity"
                label="商品数量"
                align="center"
                width="200"
              />
              <el-table-column
                prop="totalPrice"
                label="小计"
                align="center"
                width="200"
              />
            </el-table>
          </el-col>
        </el-col>
        <el-col :span="24" class="line">
          <el-col :span="24">
            <p><b>费用信息:</b></p>
          </el-col>
          <el-col :span="6">
            <p>运费金额: <span style="color:red">0</span></p>
          </el-col>
          <el-col :span="6">
            <p>订单总金额: <span style="color:red">{{ order.totalAmount }}</span></p>
          </el-col>
          <el-col :span="6">
            <p>实际金额: <span style="color:red">{{ order.totalAmount }}</span></p>
          </el-col>
          <el-col :span="6">
            <p>促销优化金额: <span style="color:red">{{ order.promotionAmount }}</span></p>
          </el-col>
        </el-col>

        <el-col v-if="step===2" :span="24" class="line">
          <el-col :span="24">
            <p><b>确认发货:</b></p>
          </el-col>
          <el-col :span="24">
            <el-form ref="deliveryForm" :model="deliveryQuery" label-width="80px">
              <el-col :span="6">
                <el-form-item label="物流公司">
                  <el-select v-model="deliveryQuery.deliveryCompany" placeholder="物流公司" size="mini" style="width:100%" clearable>
                    <el-option
                      v-for="item in deliveryCompanyOptions"
                      :key="item.value"
                      :label="item.name"
                      :value="item.name"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="物流编号">
                  <el-input v-model="deliveryQuery.deliverySn" placeholder="请填写物流编号" size="mini" />
                </el-form-item>
              </el-col>
              <el-col :span="6" :offset="12">
                <el-form-item>
                  <el-button type="primary" size="mini" @click="onDeliverySubmit">确认发货</el-button>
                </el-form-item>
              </el-col>
            </el-form>
          </el-col>
        </el-col>

        <el-col v-if="step>=3" :span="24" class="line">
          <el-col :span="24">
            <p><b>物流信息:</b> <span style="color:grey">{{ order.deliveryCompany }} [{{ order.deliverySn }}]</span></p>
          </el-col>
          <el-table
            :data="deliveryInfo"
            style="width: 100%"
            border
          >
            <el-table-column
              prop="time"
              label="时间"
              width="200"
            />
            <el-table-column
              prop="status"
              label="状态"
              width="500"
            />
            <el-table-column
              prop="note"
              label="备注"
              width="600"
            />
          </el-table>
        </el-col>
      </el-row>
    </el-card>

  </div>
</template>
<script>
import { getOrderDetail, sendDone } from '@/api/order/detail/index'

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
  data() {
    return {
      order: {},
      orderId: '',
      step: 0,
      products: [],
      deliveryQuery: {
        deliveryCompany: '',
        deliverySn: '',
        orderId: ''
      },
      deliveryCompanyOptions: [
        {
          name: '顺丰快递',
          value: 0
        },
        {
          name: '韵达快递',
          value: 1
        },
        {
          name: '中国邮政',
          value: 2
        },
        {
          name: '申通快递',
          value: 3
        },
        {
          name: '中通快递',
          value: 4
        }
      ],
      deliveryInfo: [
        {
          time: '2015-03-06 21:16:58',
          status: '深圳市横岗速递营销部已收件',
          note: '揽投员姓名：钟定基;联系电话：13883838888'
        },
        {
          time: '2015-03-07 14:25:00',
          status: '	离开深圳市发往呼和浩特市',
          note: ''
        },
        {
          time: '2015-03-10 18:06:00',
          status: '到达呼和浩特市处理中心',
          note: ''
        },
        {
          time: '2015-03-11 09:53:48',
          status: '呼和浩特市邮政速递物流分公司金川揽投部安排投递',
          note: '	投递员姓名：安长虹;联系电话：18047140142'
        }
      ]
    }
  },
  created() {
    this.init()
  },
  methods: {
    async onDeliverySubmit() {
      this.deliveryQuery.orderId = this.orderId
      try {
        await sendDone(this.deliveryQuery)
        this.$message.success('发货成功')
        this.init()
      } catch (error) {
        this.$message.error('发货失败')
      }
    },
    async init() {
      this.orderId = this.$route.params.id
      const res = await getOrderDetail(this.orderId)
      this.order = res.data.orderDetail.orderBase
      this.products = res.data.orderDetail.orderItems
      this.step = this.order.status + 1
    }
  }
}
</script>
<style lang="scss" scoped>
.line{
  margin-top: 30px;
  border-top: 1px solid #dcdfe6;

}
</style>
