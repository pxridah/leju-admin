<template>
  <div>
    <el-card class="margin-30">
      <div slot="header">
        <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
        <el-dialog
          title="地址详情"
          :visible.sync="dialogFormVisible"
          @close="resetForm('form')"
        >
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="收货地址" prop="addressName">
                  <el-input v-model="form.addressName" size="mini" placeholder="发货地址" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="发货人姓名" prop="name">
                  <el-input v-model="form.name" size="mini" placeholder="发货人姓名" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="发货人手机号" prop="phone">
                  <el-input v-model="form.phone" size="mini" placeholder="发货人手机号" />
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="邮政编码" prop="postCode">
                  <el-input v-model="form.postCode" size="mini" placeholder="邮政编码" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="收货地址" prop="address">
                  <el-cascader
                    v-model="selectedOptions"
                    placeholder="请选择"
                    size="mini"
                    style="width:100%"
                    :options="options"
                    @change="handleSelectChange"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="详细地址" prop="detailAddress">
                  <el-input v-model="form.detailAddress" size="mini" placeholder="详细地址" />
                </el-form-item>
              </el-col>

              <el-col :span="8" :offset="16">
                <el-form-item>
                  <el-button type="primary" size="small" @click="submitForm('form')">确认</el-button>
                  <el-button size="small" @click="resetForm('form')">取消</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

        </el-dialog>
      </div>
      <div>
        <el-table
          :data="addressList"
          border
          style="width: 100%"
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
            prop="addressName"
            label="地址名称"
            width="150"
          />
          <el-table-column
            align="center"
            label="默认发货地址"
            width="150"
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.sendStatus"
                @change="changeSendStatus(scope.row, $event)"
              />
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            prop="name"
            label="收货人姓名"
            width="150"
          />
          <el-table-column
            align="center"
            prop="phone"
            label="收货人电话"
            width="150"
          />
          <el-table-column
            align="center"
            label="收货人地址"
            width="150"
          >
            <template slot-scope="scope">
              {{ scope.row.province + scope.row.city + scope.row.region + scope.row.detailAddress }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="默认收货地址"
            width="150"
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.receiveStatus"
                @change="changeReceiveStatus(scope.row, $event)"
              />
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="createTime"
            label="创建时间"
            width="150"
          />
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="200"
          >
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-edit" size="middle" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="text" style="color:red" icon="el-icon-delete" size="middle" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </el-card>
  </div>
</template>
<script>
import { getAddressList, setSendOne, setReceiveOne, saveAddress, deleteAddress, getAddress, updateAddress } from '@/api/order/address/index'
import { regionData, CodeToText } from 'element-china-area-data'
export default {
  data() {
    return {
      editTag: false,
      options: regionData,
      selectedOptions: [],
      dialogFormVisible: false,
      addressList: [],
      form: {
        'addressName': '',
        'city': '',
        'cityCode': '',
        'createTime': '',
        'detailAddress': '',
        'id': '',
        'modifyTime': '',
        'name': '',
        'phone': '',
        'postCode': '',
        'province': '',
        'receiveStatus': 0,
        'region': '',
        'sendStatus': 0
      },
      rules: {
        addressName: [
          { required: true, message: '发货地址不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    handleSelectChange(value) {
      this.form.cityCode = value.toString()
      this.form.province = CodeToText[value[0]]
      this.form.city = CodeToText[value[1]]
      this.form.region = CodeToText[value[2]]
    },
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          try {
            if (this.editTag) {
              await updateAddress(this.form)
              this.$message.success('地址更新成功')
            } else {
              await saveAddress(this.form)
              this.$message.success('地址添加成功')
            }
            this.resetForm('form')
            this.init()
          } catch (error) {
            this.$message.error('失败!')
          }
        } else {
          return false
        }
      })
    },

    resetForm(formName) {
      this.editTag = false
      this.$refs[formName].resetFields()
      this.dialogFormVisible = false
      this.selectedOptions = []
    },
    async handleEdit(item) {
      this.editTag = true
      this.dialogFormVisible = true

      const res = await getAddress(item.id)
      if (res.success) {
        this.form = res.data.address
        this.selectedOptions = this.form.cityCode.split(',')
      }
    },
    async handleDelete(item) {
      try {
        await deleteAddress(item.id)
        this.$message.success('地址删除成功')
        this.init()
      } catch (error) {
        this.$message.error('地址删除失败')
      }
    },
    async changeReceiveStatus(item, val) {
      try {
        await setReceiveOne({
          id: item.id,
          receiveStatus: val ? 1 : 0
        })
        this.$message.success('修改成功!')
        this.init()
      } catch (error) {
        this.$message.error('修改失败!')
        // eslint-disable-next-line
        item.sendStatus = !val
      }
    },
    async changeSendStatus(item, val) {
      try {
        await setSendOne({
          id: item.id,
          sendStatus: val ? 1 : 0
        })
        this.$message.success('修改成功!')
        this.init()
      } catch (error) {
        this.$message.error('修改失败!')
        // eslint-disable-next-line require-atomic-updates
        item.sendStatus = !val
      }
    },
    async init() {
      const res = await getAddressList()
      this.addressList = res.data.items
      res.data.items.forEach(ele => {
        ele.sendStatus = !!ele.sendStatus
        ele.receiveStatus = !!ele.receiveStatus
      })
    }
  }
}
</script>
<style lang="">

</style>
