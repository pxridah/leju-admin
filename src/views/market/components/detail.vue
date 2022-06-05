<template>
  <div>
    <el-dialog
      style="margin-top: -100px"
      width="80%"
      title="热销详情"
      :visible.sync="open"
    >

      <div class="search">
        <p class="title">条件查询</p>
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
      </div>

      <div class="products">
        <p class="title">商品列表</p>
        <el-table
          :data="productList"
          style="width: 100%"
          border
        >
          <el-table-column
            type="index"
            label="序号"
            width="50"
          />
          <el-table-column
            align="center"
            label="选择"
            width="80"
          >
            <template slot-scope="scope">
              <el-radio v-model="radio" :label="scope.row.id" @change="handleSelectChange(scope.row)"><span /></el-radio>
            </template>
          </el-table-column>
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
            width="500"
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
          />
          <el-table-column
            align="center"
            prop="weight"
            label="重量"
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
      </div>
    </el-dialog>

    <el-dialog
      width="70%"
      title="编辑限时活动"
      :visible.sync="dialogVisible"
    >
      <el-form ref="form" :model="currentProduct" label-width="80px">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="原价">
              {{ currentProduct.originalPrice }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商品名称">
              {{ currentProduct.name }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="促销价格">
              <el-input-number v-model="currentProduct.promotionPrice" :min="0" size="mini" style="width:100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序">
              <el-input-number v-model="currentProduct.sort" :min="0" size="mini" style="width:100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开始时间">
              <el-date-picker
                v-model="currentProduct.promotionStartTime"
                type="datetime"
                placeholder="选择日期时间"
                style="width:100%"
                size="mini"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间">
              <el-date-picker
                v-model="currentProduct.promotionEndTime"
                type="datetime"
                placeholder="选择日期时间"
                style="width:100%"
                size="mini"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="限购数量">
              <el-input v-model="currentProduct.promotionPerLimit" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商品图片">
              <el-image
                style="width: 100px; height: 100px"
                :src="currentProduct.pic"
                fit="fill"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="handleConfirm">确定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import pageMix from '@/mixins/pageMix'
import { getProductList, getAllBrands, addRecommend } from '@/api/market/addRecommend/index'
export default {
  mixins: [pageMix],
  data() {
    return {
      open: false,
      dialogVisible: false,

      brandOptions: [],
      productList: [],
      radio: '',
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
      currentProduct: {
        'sort': 0,
        'name': '',
        'originalPrice': '',
        'pic': '',

        'productId': '',
        'promotionEndTime': '',
        'promotionPerLimit': 0,
        'promotionPrice': 0,
        'promotionStartTime': ''
      }

    }
  },
  created() {
    this.init()
  },
  methods: {
    openDetail() {
      this.open = true
    },
    async handleConfirm() {
      try {
        await addRecommend(this.currentProduct)
        this.$message.success('成功!')
        this.dialogVisible = false
        this.open = false
        this.$emit('success')
      } catch (error) {
        this.$message.error('失败!')
      }
    },
    handleSelectChange(item) {
      for (const key in this.currentProduct) {
        this.currentProduct[key] = item[key]
      }
      this.currentProduct.productId = item.id
      this.dialogVisible = true
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
p.title{
  border-bottom: 1px solid #EBEEF5;
  padding-bottom: 16px;
}
</style>
