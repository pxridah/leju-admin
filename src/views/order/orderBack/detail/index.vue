<template>
  <div>
    <el-card class="margin-30">
      <el-row :gutter="10">

        <el-col :span="24" style="border-bottom: 1px solid #dcdfe6;">
          <el-col :span="24">
            <p>
              <b>订单信息:</b> <el-tag effect="dark" size="small" :type="backOrder.status|statusText('type')">{{ backOrder.status|statusText }}</el-tag>
            </p>
          </el-col>

          <el-col :span="6">
            <p>订单编号: <span>{{ backOrder.orderSn }}</span> <el-button style="margin:0;padding:0" type="text" size="small">查看详情</el-button></p>
          </el-col>
          <el-col :span="6">
            <p>退单人姓名: <span>{{ backOrder.returnName }}</span></p>
          </el-col>
          <el-col :span="6">
            <p>退单理由: <span>{{ backOrder.reason }}</span></p>
          </el-col>
          <el-col :span="6">
            <p>退单描述: <span>{{ backOrder.description }}</span></p>
          </el-col>

          <el-col :span="6">
            <p>申请时间: <span>{{ backOrder.createTime }}</span></p>
          </el-col>
        </el-col>

        <el-col :span="24">
          <el-col :span="24">
            <p><b>退货商品:</b></p>
          </el-col>
          <el-col :span="24">
            <el-table
              :data="productList"
              style="width: 100%"
              border
            >
              <el-table-column
                label="商品图片"
                width="150"
                align="center"
              >
                <template slot-scope="scope">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="scope.row.productPic"
                    fit="fill"
                  />
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                prop="description"
                label="商家描述"
                width="200"
              />
              <el-table-column
                align="center"
                prop="productRealPrice"
                label="商品价格"
                width="200"
              />
              <el-table-column
                align="center"
                prop="productCount"
                label="商品数量"
                width="200"
              />
              <el-table-column
                align="center"
                prop="productAttr"
                label="商品属性"
                width="200"
              >
                <template slot-scope="scope">
                  <div>
                    <span v-for="attr in JSON.parse(scope.row.productAttr)" :key="attr.value" style="margin:5px">{{ attr.key }}:{{ attr.value }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                prop="returnAmount"
                label="总计"
              />
            </el-table>
          </el-col>
        </el-col>
        <el-col :span="24" style="border-bottom: 1px solid #dcdfe6;">
          <el-col :span="24">
            <p><b>用户信息:</b></p>
          </el-col>
          <el-col :span="6">
            <p>联系人: <span>{{ backOrder.returnName }}</span></p>
          </el-col>
          <el-col :span="6">
            <p>联系电话: <span>{{ backOrder.returnPhone }}</span></p>
          </el-col>
        </el-col>

        <el-col :span="24" style="border-bottom: 1px solid #dcdfe6;">
          <el-col :span="24">
            <p><b>费用信息:</b></p>
          </el-col>
          <el-col :span="6">
            <p>退单金额: <span style="color:red">{{ backOrder.returnAmount }}</span></p>
          </el-col>
          <el-col :span="6">
            <p>运费金额: <span style="color:red">0</span></p>
          </el-col>
          <el-col v-if="backOrder.status===0" :span="24">
            <el-form ref="backForm" :model="backQuery" label-width="80px">

              <el-col :span="6">
                <el-form-item label="退款金额">
                  <el-input-number v-model="backQuery.returnAmount" :min="0" size="mini" style="width:100%" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="处理人">
                  <el-input v-model="backQuery.handleMan" size="mini" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="处理备注">
                  <el-input v-model="backQuery.handleNote" size="mini" />
                </el-form-item>
              </el-col>
              <el-col :span="6" :offset="8">
                <el-form-item>
                  <el-button type="primary" size="mini" @click="onagree">同意退款</el-button>
                  <el-button type="default" size="mini" @click="onreject">拒绝退款</el-button>
                </el-form-item>
              </el-col>
            </el-form>
          </el-col>
          <el-col v-if="backOrder.status===1" :span="24">
            <el-form ref="backForm" :model="receiveQuery" label-width="80px">

              <el-col :span="6">
                <el-form-item label="收货人">
                  <el-input v-model="receiveQuery.receiveMan" size="mini" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="收货备注">
                  <el-input v-model="receiveQuery.receiveNote" size="mini" />
                </el-form-item>
              </el-col>
              <el-col :span="4" :offset="11">
                <el-form-item>
                  <el-button type="primary" size="mini" @click="onConfirmReceive">同意退款</el-button>
                </el-form-item>
              </el-col>
            </el-form>
          </el-col>
        </el-col>

      </el-row>
    </el-card>
  </div>
</template>
<script>
import { getOrderReturn, agreeApply, rejectApply, receiveProduct } from '@/api/order/backDetail/index'
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
  data() {
    return {
      backId: '',
      backOrder: {},
      productList: [],
      backQuery: {
        id: '',
        handleMan: '',
        handleNote: '',
        returnAmount: ''
      },
      receiveQuery: {
        id: '',
        receiveMan: '',
        receiveNote: ''
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    async onConfirmReceive() {
      this.receiveQuery.id = this.backId
      try {
        await receiveProduct(this.backId, this.receiveQuery)
        this.$message.success('成功!')
        this.init()
      } catch (error) {
        this.$message.error('失败!')
      }
    },
    async onagree() {
      this.backQuery.id = this.backId
      try {
        await agreeApply(this.backId, this.backQuery)
        this.$message.success('成功!')
        this.init()
      } catch (error) {
        this.$message.error('失败')
      }
    },
    async onreject() {
      this.backQuery.id = this.backId
      try {
        await rejectApply(this.backId, this.backQuery)
        this.$message.success('成功!')
        this.init()
      } catch (error) {
        this.$message.error('失败')
      }
    },
    async init() {
      this.backId = this.$route.params.id
      const res = await getOrderReturn(this.backId)
      this.backOrder = res.data.orderReturnApply

      this.productList = [this.backOrder]
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
