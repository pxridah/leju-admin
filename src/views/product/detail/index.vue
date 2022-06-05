<template>
  <div>
    <el-card>
      <el-steps :active="step" finish-status="success" align-center>
        <el-step title="步骤 1" />
        <el-step title="步骤 2" />
        <el-step title="步骤 3" />
      </el-steps>
    </el-card>

    <el-card class="margin-30">

      <el-form ref="form" :model="form" label-width="90px">

        <el-row v-if="step===1" :gutter="10">
          <el-col :span="24">
            <p class="title">基本信息</p>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品名称">
              <el-input v-model="form.product.name" size="mini" placeholder="商品名称" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品编码">
              <el-input v-model="form.product.productSn" size="mini" placeholder="商品编码" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品品牌">
              <el-select v-model="form.product.brandId" placeholder="商品品牌" size="mini" style="width:100%">
                <el-option
                  v-for="item in brands"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品分类">
              <el-select v-model="form.product.productCategoryId" placeholder="商品分类" size="mini" style="width:100%">
                <el-option
                  v-for="item in category"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="商品描述">
              <el-input
                v-model="form.product.description"
                type="textarea"
                :rows="2"
                placeholder="商品描述"
                size="mini"
              />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <p class="title">商品属性</p>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="商品原价">
                <el-input-number v-model="form.product.originalPrice" :min="0" size="mini" style="width:100%" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="促销类型">
                <el-select v-model="form.product.promotionType" disabled placeholder="没有促销使用原价" size="mini" style="width:100%" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="活动价格">
                <el-input-number v-model="form.product.promotionPrice" :min="0" disabled size="mini" style="width:100%" />
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="8">
            <el-form-item label="重量(kg)">
              <el-input-number v-model="form.product.weight" :min="0" size="mini" style="width:100%" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="审核状态">
              <el-switch
                v-model="form.product.verifyStatus"
                size="mini"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否上架">
              <el-switch
                v-model="form.product.publishStatus"
                size="mini"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="缩略图">
              <el-upload
                style="width:150px;height:150px;line-height:150px;text-align:center;border:1px dashed #c0ccda;background:#fbfdff;border-radius: 6px"
                action="/lejuAdmin/material/uploadFileOss"
                :headers="token"
                :show-file-list="false"
                :on-success="handleProductPicSuccess"
                :limit="1"
              >
                <el-image
                  v-if="form.product.pic"
                  :src="form.product.pic"
                  fit="fill"
                  style="width: 150px; height: 150px;"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <p class="title">其他信息</p>
          </el-col>
          <el-col :span="8">
            <el-form-item label="推荐状态">
              <el-switch
                v-model="form.product.recommendStatus"
                size="mini"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="新品状态">
              <el-switch
                v-model="form.product.newStatus"
                size="mini"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="预告商品">
              <el-switch
                v-model="form.product.previewStatus"
                size="mini"
              />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="搜索关键词">
                <el-input v-model="form.product.keywords" size="mini" placeholder="关键词" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="库存预警">
                <el-input-number v-model="form.product.lowStock" :min="0" size="mini" style="width:100%" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="商品排序">
                <el-input-number v-model="form.product.sort" :min="0" size="mini" style="width:100%" />
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-form-item label="产品服务">
              <el-checkbox-group
                v-if="form.product.serviceIds"
                v-model="form.product.serviceIds"
              >
                <el-checkbox v-for="item in serviceOpitions" :key="item.name" :label="item.id">{{ item.name }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="step===2" :gutter="10">
          <el-col :span="24">
            <p class="title">商品sku信息</p>
          </el-col>
          <el-col :span="8">
            <el-form-item label="标题">
              <el-input v-model="form.product.detailTitle" size="mini" placeholder="标题" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="副标题">
              <el-input v-model="form.product.detailDesc" size="mini" placeholder="副标题" />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="画册图片">

              <el-upload
                v-if="form.product.albumPics"
                action="/lejuAdmin/material/uploadFileOss"
                :headers="token"
                list-type="picture-card"
                :on-preview="handleAlbuymPicPreview"
                :on-remove="handleRemoveAlbumPic"
                :on-success="handleUploadAlbumPic"
                :file-list="form.product.albumPics"
              >
                <i class="el-icon-plus" />
              </el-upload>
              <el-dialog :visible.sync="alubmPicDialogVisible">
                <img width="100%" :src="alubmPicDialogImageUrl" alt="">
              </el-dialog>

            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="sku设置">
              <el-col v-if="skuColorOpitions.length" :span="24">
                <el-col :span="1">颜色:</el-col>
                <el-col :span="23">
                  <el-checkbox-group

                    v-model="selectedSkuColorList"
                  >
                    <el-checkbox v-for="color in skuColorOpitions" :key="color.uid" :label="color.name">
                      {{ color.name }}
                      <el-button type="text" style="color:red" size="mini" @click="skuColorOpitions.splice(skuColorOpitions.findIndex(el=>el===color),1)">删除</el-button>
                    </el-checkbox>
                  </el-checkbox-group>
                </el-col>

              </el-col>

              <el-col v-if="skuSizeOpitions.length" :span="24">
                <el-col :span="1">大小:</el-col>
                <el-col :span="23">
                  <el-checkbox-group
                    v-model="selectedSkuSizeList"
                  >
                    <el-checkbox v-for="size in skuSizeOpitions" :key="size.uid" :label="size.name">
                      {{ size.name }}
                      <el-button type="text" style="color:red" size="mini" @click="skuSizeOpitions.splice(skuSizeOpitions.findIndex(el=>el===size),1)">删除</el-button>
                    </el-checkbox>

                  </el-checkbox-group>
                </el-col>
              </el-col>

              <el-col :span="8">
                <el-input v-model="currentSkuColor" placeholder="颜色描述:例如粉金" size="mini" />
                <el-button type="primary" size="mini" @click="createSkuColorOptions">创建颜色选项</el-button>
              </el-col>
              <el-col :span="8">
                <el-input v-model="currentSkuSize" placeholder="大小描述" size="mini" />
                <el-button type="primary" size="mini" @click="createSkuSizeOptions">创建大小选项</el-button>
              </el-col>
              <el-col :span="3" :offset="5">
                <el-button type="primary" size="mini" @click="createSkuList">生成sku列表</el-button>
                <el-button type="primary" size="mini" style="margin:0" @click="addSkuItem">新增sku选项</el-button>
              </el-col>
              <el-table
                :data="form.pmsSkuStockList"
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
                    <el-button type="text" style="color:red" icon="el-icon-delete" size="small" @click="handleSkuDelete(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>

          </el-col>
        </el-row>

        <el-row v-if="step===3" :gutter="10">
          <el-col :span="24">
            <p class="title">详情描述</p>
          </el-col>
          <el-col :span="24">
            <el-form-item label="商品详情">
              <Tinymce v-model="form.product.detailMobileHtml" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input v-model="form.product.note" type="textarea" rows="2" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="8">
            <el-button v-if="step>1" size="small" @click="step--">返回上一步</el-button>
            <el-button type="primary" size="small" @click="nextStep">{{ nextText }}</el-button>
          </el-col>

        </el-row>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce/index.vue'
import { getToken } from '@/utils/myAuth'
import { v4 as uuidv4 } from 'uuid'
import { addProductAndSkus, getProductSkusDetail, getAllBrands, getAllCategory, updateProductAndSkus } from '@/api/product/detail/index'
export default {
  components: {
    Tinymce
  },
  data() {
    return {
      form: {
        'pmsSkuStockList': [],
        'product': {
          'albumPics': '',
          'brandId': '',
          'brandName': '',
          'createTime': '',
          'deleteStatus': 0,
          'description': '',
          'detailDesc': '',
          'detailHtml': '',
          'detailMobileHtml': '',
          'detailTitle': '',
          'feightTemplateId': '',
          'giftGrowth': 0,
          'giftPoint': 0,
          'id': '',
          'keywords': '',
          'lowStock': 0,
          'modifyTime': '',
          'name': '',
          'newStatus': 0,
          'note': '',
          'originalPrice': 0,
          'pic': '',
          'previewStatus': 0,
          'price': 0,
          'productAttributeCategoryId': '',
          'productCategoryId': '',
          'productCategoryName': '',
          'productSn': '',
          'promotionEndTime': '',
          'promotionPerLimit': 0,
          'promotionPrice': 0,
          'promotionStartTime': '',
          'promotionType': 0,
          'publishStatus': 0,
          'recommendStatus': 0,
          'sale': 0,
          'serviceIds': '',
          'sort': 0,
          'stock': 0,
          'subTitle': '',
          'unit': '',
          'usePointLimit': 0,
          'verifyStatus': 0,
          'weight': 0
        }
      },
      token: {
        token: getToken()
      },
      id: '',
      step: 1,
      brands: [],
      category: [],
      serviceOpitions: [
        {
          id: '1',
          name: '无忧退货'
        },
        {
          id: '2',
          name: '快速退款'
        },
        {
          id: '3',
          name: '免费包邮'
        }
      ],

      alubmPicDialogVisible: false,
      alubmPicDialogImageUrl: '',

      currentSkuItem: {},
      currentSkuColor: '',
      skuColorOpitions: [],
      selectedSkuColorList: [],
      currentSkuSize: '',
      skuSizeOpitions: [],
      selectedSkuSizeList: [],
      newSku: {
        'createTime': '',
        'id': '',
        'lockStock': 0,
        'lowStock': 0,
        'modifyTime': '',
        'pic': '',
        'price': 0,
        'productId': this.id,
        'promotionPrice': 0,
        'sale': 0,
        'skuCode': '',
        'spData': [{ 'key': '颜色', 'value': '' }, { 'key': '大小', 'value': '' }],
        'stock': 0
      }
    }
  },
  computed: {
    nextText() {
      var text = ''
      if (this.step === 1) {
        text = '下一步,填写库存信息'
      } else if (this.step === 2) {
        text = '下一步,填写移动端详情'
      } else if (this.step === 3) {
        text = '提交保存'
      }
      return text
    }
  },
  created() {
    this.id = this.$route.params.id
    this.init()
  },
  methods: {
    createSkuList() {
      if (!(this.selectedSkuColorList.length && this.selectedSkuSizeList.length)) {
        this.$message.error('请选择颜色和大小')
        return
      }
      this.$confirm('此操作将清空sku列表,并生成新列表, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.form.pmsSkuStockList.splice(0, this.form.pmsSkuStockList.length)
        this.addSkuItem()
        this.$message.success('success')
      }).catch(() => {
        this.$message.info('已取消创建')
      })
    },
    addSkuItem() {
      if (!(this.selectedSkuColorList.length && this.selectedSkuSizeList.length)) {
        this.$message.error('请选择颜色和大小')
        return
      }
      this.selectedSkuColorList.forEach(color => {
        this.selectedSkuSizeList.forEach(size => {
          var spData = [{ 'key': '颜色', 'value': color }, { 'key': '大小', 'value': size }]
          var newSku = JSON.parse(JSON.stringify(this.newSku))
          newSku.spData = spData
          this.form.pmsSkuStockList.push(newSku)
          console.log(this.form.pmsSkuStockList)
        })
      })
    },
    createSkuColorOptions() {
      if (!this.currentSkuColor) return
      this.skuColorOpitions.push({
        uid: uuidv4(),
        name: this.currentSkuColor
      })
    },
    createSkuSizeOptions() {
      if (!this.currentSkuSize) return
      this.skuSizeOpitions.push({
        uid: uuidv4(),
        name: this.currentSkuSize
      })
    },
    handleSkuDelete(item) {
      var idx = this.form.pmsSkuStockList.findIndex(el => el === item)
      if (idx !== -1) { this.form.pmsSkuStockList.splice(idx, 1) }
    },
    clickSkuImgUpload(item) {
      this.currentSkuItem = item
    },
    handleSkuImgSuccess(res) {
      this.currentSkuItem.pic = res.data.fileUrl
    },

    handleUploadAlbumPic(res) {
      this.form.product.albumPics.push({ uid: uuidv4(), url: res.data.fileUrl })
      console.log(this.form.product.albumPics)
    },
    handleRemoveAlbumPic(file) {
      var idx = this.form.product.albumPics.findIndex(el => el.uid === file.uid)
      if (idx !== -1) { this.form.product.albumPics.splice(idx, 1) }
    },
    handleAlbuymPicPreview(file) {
      this.alubmPicDialogVisible = true
      this.alubmPicDialogImageUrl = file.url
    },

    handleProductPicSuccess(res) {
      this.form.product.pic = res.data.fileUrl
    },
    async getDetail() {
      var form = JSON.parse(JSON.stringify(this.form))

      if (this.id) {
        const res = await getProductSkusDetail(this.id)
        form.product = res.data.product
        res.data.skus.forEach(el => {
          el.spData = JSON.parse(el.spData)
        })
        this.form.pmsSkuStockList = res.data.skus
      }

      form.product.verifyStatus = !!form.product.verifyStatus
      form.product.publishStatus = !!form.product.publishStatus
      form.product.recommendStatus = !!form.product.recommendStatus
      form.product.newStatus = !!form.product.newStatus
      form.product.previewStatus = !!form.product.previewStatus
      if (form.product.serviceIds) {
        form.product.serviceIds = form.product.serviceIds.split(',')
      } else {
        form.product.serviceIds = []
      }
      if (form.product.albumPics) {
        form.product.albumPics = form.product.albumPics.split(',').map(el => {
          return {
            uid: uuidv4(),
            url: el
          }
        })
      } else {
        form.product.albumPics = []
      }
      this.form.product = form.product
    },
    async init() {
      this.getDetail()
      const res1 = await getAllCategory()
      const res2 = await getAllBrands()

      this.category = res1.data.items.filter(el => el.category.id === '1308336521604599809')[0].children
      this.brands = res2.data.items
    },
    async nextStep() {
      if (this.step < 3) {
        this.step++
      } else {
        var form = JSON.parse(JSON.stringify(this.form))

        form.product.albumPics = form.product.albumPics.map(el => {
          return el.url
        }).toString()
        form.product.serviceIds = form.product.serviceIds.toString()
        form.product.verifyStatus = form.product.verifyStatus ? 1 : 0
        form.product.publishStatus = form.product.publishStatus ? 1 : 0
        form.product.recommendStatus = form.product.recommendStatus ? 1 : 0
        form.product.newStatus = form.product.newStatus ? 1 : 0
        form.product.previewStatus = form.product.previewStatus ? 1 : 0
        form.pmsSkuStockList.forEach(el => {
          el.spData = JSON.stringify(el.spData)
        })

        try {
          if (this.id) {
            await updateProductAndSkus(form)
          } else {
            await addProductAndSkus(form)
          }

          this.$message.success(this.id ? '修改成功!' : '保存成功')
          this.$router.push('/product/list')
        } catch (error) {
          this.$message.error(this.id ? '修改失败!' : '保存失败!')
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
p.title{
  border-bottom: 1px solid #e5e5e5;
  padding: 8px 0;
}
</style>
