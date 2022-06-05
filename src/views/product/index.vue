<template>
  <div>
    <el-collapse accordion style="margin:30px;padding:20px;background:#fff;">
      <el-collapse-item>
        <template slot="title">
          <b style="font-size: 16px;color:#606266;">条件查询 <i class="header-icon el-icon-question" /></b>
        </template>
        <el-form ref="productForm" :model="productQuery" label-width="80px">
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item label="商品名称">
                <el-input v-model="productQuery.name" placeholder="商品名称/模糊查询" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="商品货号">
                <el-input v-model="productQuery.productSn" placeholder="商品货号" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="品牌">
                <el-select v-model="productQuery.brandId" clearable placeholder="品牌" size="mini" style="width:100%">
                  <el-option
                    v-for="item in brandOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="上架状态">
                <el-select v-model="productQuery.publishStatus" clearable placeholder="上架状态" size="mini" style="width:100%">
                  <el-option
                    v-for="item in publishOptions"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="审核状态">
                <el-select v-model="productQuery.verifyStatus" clearable placeholder="审核状态" size="mini" style="width:100%">
                  <el-option
                    v-for="item in verifyOptions"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="12">
              <el-form-item>
                <el-button type="primary" size="mini" @click="onProductSubmit">查询</el-button>
                <el-button type="default" size="mini" @click="onProductReset('productForm')">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </el-collapse-item>
    </el-collapse>

    <el-card class="margin-30">
      <div slot="header">
        <el-button v-btn-permi:add type="primary" @click="$router.push({name: 'addProductDetail'})">新增</el-button>
        <el-button type="primary" @click="handleExport2Excel">导出商品列表Excel文件</el-button>
      </div>
      <el-table
        :data="productList"
        border
        class="product-list"
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
          label="商品名称"
          width="350"
        >
          <template slot-scope="scope">
            <p>{{ scope.row.name }}</p>
            <p>品牌: {{ scope.row.brandName }}</p>
            <p>{{ scope.row.description }}</p>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="商品价格"
          width="150"
        >
          <template slot-scope="scope">
            <p>原价: {{ scope.row.originalPrice }}</p>
            <p>现价: {{ scope.row.price }}</p>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          prop="productCategoryName"
          label="商品类别"
          width="150"
        />

        <el-table-column
          align="center"
          label="标签"
          width="150"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.newStatus"
              active-text="最新"
              style="margin-bottom:20px"
              @change="changeNewStatus(scope.row, $event)"
            />
            <el-switch
              v-model="scope.row.recommendStatus"
              active-text="推荐"
              @change="changeRecommendStatus(scope.row, $event)"
            />
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="标签2"
          width="150"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.publishStatus"
              active-text="发布"
              style="margin-bottom:20px"
              @change="changePublishStatus(scope.row, $event)"
            />
            <el-switch
              v-model="scope.row.verifyStatus"
              active-text="审核"
              @change="changeVerifyStatus(scope.row, $event)"
            />
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="weight"
          label="重量"
          width="150"
        />
        <el-table-column
          align="center"
          prop="sort"
          label="排序"
          width="150"
        />
        <el-table-column
          align="center"
          label="sku"
          width="150"
        >
          <template slot-scope="scope">
            <el-button type="text" size="middle" @click="handleEditSku(scope.row)">编辑sku</el-button>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          fixed="right"
          label="操作"
          width="200"
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
      <!-- 编辑sku -->
      <el-dialog
        width="70%"
        title="sku列表"
        :visible.sync="skuDialogVisible"
      >
        <el-card>
          <div slot="header">
            <el-button type="primary" @click="handleSkuAdd">新增</el-button>
          </div>
          <div>
            <el-table
              :data="skuList"
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
                label="图片"
                width="150"
              >
                <template slot-scope="scope">
                  <el-upload
                    style="width: 100px; height: 100px; line-height:100px"
                    action="/lejuAdmin/material/uploadFileOss"
                    :headers="token"
                    :show-file-list="false"
                    :on-success="handleSkuImgSuccess"
                    :limit="1"
                    @click.native="clickSkuImgUpload(scope.row)"
                  >
                    <el-image
                      v-if="scope.row.pic"
                      :src="scope.row.pic"
                      fit="fill"
                    />
                    <i v-else class="el-icon-plus avatar-uploader-icon" />

                  </el-upload>

                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="颜色"
                width="150"
              >
                <template slot-scope="scope">
                  <el-input v-model="scope.row.spData[0]['value']" size="mini" />
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="大小"
                width="150"
              >
                <template slot-scope="scope">
                  <el-input v-model="scope.row.spData[1]['value']" size="mini" />
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="库存"
                width="150"
              >
                <template slot-scope="scope">
                  <el-input v-model="scope.row.stock" size="mini" />
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="预警库存"
                width="150"
              >
                <template slot-scope="scope">
                  <el-input v-model="scope.row.lowStock" size="mini" />
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="锁定库存"
                width="150"
              >
                <template slot-scope="scope">
                  <el-input v-model="scope.row.lockStock" size="mini" />
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="sku编码"
                width="150"
              >
                <template slot-scope="scope">
                  <el-input v-model="scope.row.skuCode" size="mini" />
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="价格"
                width="150"
              >
                <template slot-scope="scope">
                  <el-input v-model="scope.row.price" size="mini" />
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="销量"
                width="150"
              >
                <template slot-scope="scope">
                  <el-input v-model="scope.row.sale" size="mini" />
                </template>
              </el-table-column>
              <el-table-column
                align="center"

                fixed="right"
                label="操作"
                width="150"
              >
                <template slot-scope="scope">
                  <el-button type="text" icon="el-icon-edit" size="small" @click="handleSkuUpdate(scope.row)">{{ scope.row.id?'修改':'保存' }}</el-button>
                  <el-button type="text" style="color:red" icon="el-icon-delete" size="small" @click="handleSkuDelete(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
        <div slot="footer">
          <el-button @click="skuDialogVisible = false">取 消</el-button>
        </div>
      </el-dialog>

    </el-card>
  </div>
</template>
<script>
import { getToken } from '@/utils/myAuth'
import { deleteProduct, getSkusByProductId, getProductList, switchVerifyStatus, switchNewStatus, switchRecommandStatus, switchPublishStatus, updateSkuInfo, deleteSku, getAllBrands, addProductSkus } from '@/api/product/list/index'
import pageMix from '@/mixins/pageMix'
export default {
  mixins: [pageMix],
  data() {
    return {
      brandOptions: [],
      publishOptions: [
        {
          name: '未上架',
          value: 0
        },
        {
          name: '上架',
          value: 1
        }
      ],
      verifyOptions: [
        {
          name: '未审核',
          value: 0
        },
        {
          name: '审核',
          value: 1
        }
      ],
      productQuery: {
        'name': '',
        'productSn': '',
        'brandId': '',
        'publishStatus': '',
        'verifyStatus': ''
      },
      token: {
        token: getToken()
      },
      productList: [],
      skuList: [],
      skuDialogVisible: false,
      currentSkuItem: {},
      currentProductItem: {}
    }
  },
  created() {
    this.init()
  },
  methods: {
    handleExport2Excel() {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['商品名称', '商品类别']
        const filterVal = ['name', 'productCategoryName']
        const data = this.formatJson(filterVal, this.productList)

        excel.export_json_to_excel({
          header: tHeader, // 表头 必填
          data, // 具体数据 必填
          filename: 'product-list', // 非必填
          autoWidth: true, // 非必填
          bookType: 'xlsx' // 非必填
        })
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    handleDelete(item) {
      this.$confirm('此操作将永久删除该产品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        try {
          await deleteProduct(item.id)
          this.$message.success('删除成功!')
          this.getAllProducts()
        } catch (error) {
          this.$message.error('删除失败')
        }
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    handleEdit(item) {
      this.$router.push({ name: 'productDetail', params: { id: item.id }})
    },
    clickSkuImgUpload(item) {
      this.currentSkuItem = item
    },
    handleSkuImgSuccess(res) {
      this.currentSkuItem.pic = res.data.fileUrl
    },
    handleSkuAdd() {
      var newSku = {
        'createTime': '',
        'id': '',
        'lockStock': 0,
        'lowStock': 0,
        'modifyTime': '',
        'pic': '',
        'price': 0,
        'productId': this.currentProductItem.id,
        'promotionPrice': 0,
        'sale': 0,
        'skuCode': '',
        'spData': [{ 'key': '颜色', 'value': '' }, { 'key': '大小', 'value': '' }],
        'stock': 0
      }
      this.skuList.push(newSku)
    },
    async handleSkuUpdate(item) {
      item.spData = JSON.stringify(item.spData)
      try {
        if (item.id) {
          await updateSkuInfo(item)
          this.$message.success('修改成功')
        } else {
          await addProductSkus(item)
          this.$message.success('保存成功')
        }

        this.handleEditSku(this.currentProductItem)
      } catch (error) {
        this.$message.error('失败!')
      }
    },
    async handleSkuDelete(item) {
      if (item.id) {
        try {
          await deleteSku(item.id)
          this.$message.success('删除成功')
          this.handleEditSku(this.currentProductItem)
        } catch (error) {
          this.$message.error('删除失败')
        }
      } else {
        var idx = this.skuList.findIndex(el => el === item)
        if (idx !== -1) { this.skuList.splice(idx, 1) }
      }
    },
    async handleEditSku(item) {
      this.currentProductItem = item
      this.skuDialogVisible = true

      const res = await getSkusByProductId(item.id)
      res.data.items.forEach(el => {
        el.spData = JSON.parse(el.spData)
      })
      this.skuList = res.data.items
    },

    changeVerifyStatus(item, val) {
      this.changeStatus(item, val, switchVerifyStatus)
    },
    changePublishStatus(item, val) {
      this.changeStatus(item, val, switchPublishStatus)
    },
    changeNewStatus(item, val) {
      this.changeStatus(item, val, switchNewStatus)
    },
    changeRecommendStatus(item, val) {
      this.changeStatus(item, val, switchRecommandStatus)
    },
    async changeStatus(item, val, callback) {
      try {
        await callback({
          productId: item.id,
          status: val ? 1 : 0
        })
        this.$message.success('修改成功')
      } catch (error) {
        this.$message.error('修改失败')
        // eslint-disable-next-line
        item.isShow = !val
      }
    },

    onProductSubmit() {
      this.getAllProducts()
    },
    onProductReset(formName) {
      this.productQuery = {
        'name': '',
        'productSn': '',
        'brandId': '',
        'publishStatus': '',
        'verifyStatus': ''
      }
      this.getAllProducts()
    },

    async getAllProducts() {
      const res = await getProductList(this.start, this.limit, this.productQuery)
      this.totalRows = res.data.total
      res.data.rows.forEach(el => {
        el.verifyStatus = !!el.verifyStatus
        el.publishStatus = !!el.publishStatus
        el.recommendStatus = !!el.recommendStatus
        el.newStatus = !!el.newStatus
      })
      this.productList = res.data.rows
    },
    async init() {
      this.getAllProducts()
      const res = await getAllBrands()
      this.brandOptions = res.data.items
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
