<template>
  <div>
    <el-card class="margin-30">
      <div slot="header">
        <el-button v-btn-permi:add type="primary" @click="handleAddBrand">新增</el-button>
      </div>
      <el-table
        :data="brandList"
        border
        class="brandList"
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
          prop="name"
          label="品牌名称"
          width="150"
        />
        <el-table-column
          align="center"
          label="展示状态"
          width="150"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.showStatus"
              active-text="是否展示"
              @change="changeShowStatus(scope.row, $event)"
            />

          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="logo"
          width="150"
        >
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.logo"
              fit="fill"
            />
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="专区大图"
          width="150"
        >
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.bigPic"
              fit="fill"
            />
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="brandStory"
          label="品牌故事"
          width="150"
        />

        <el-table-column
          align="center"
          prop="createTime"
          label="创建时间"
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
          prop="productCommentCount"
          label="产品评论数量"
          width="150"
        />
        <el-table-column
          align="center"
          prop="productCount"
          label="产品数量"
          width="150"
        />
        <el-table-column
          align="center"
          label="是否品牌制造商"
          width="150"
        >
          <template slot-scope="scope">
            {{ scope.row.factoryStatus?'是':'不是' }}
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
      <el-dialog title="品牌详情" :visible.sync="dialogFormVisible">
        <el-form :model="currentBrand" label-width="100px">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="品牌名称">
                <el-input v-model="currentBrand.name" size="mini" placeholder="品牌名称" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="首字母">
                <el-input v-model="currentBrand.firstLetter" size="mini" placeholder="首字母" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="排序">
                <el-input v-model="currentBrand.sort" size="mini" placeholder="排序" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="产品数量">
                <el-input v-model="currentBrand.productCount" size="mini" placeholder="产品数量" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否展示">
                <el-switch
                  v-model="currentBrand.showStatus"
                  size="mini"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否为品牌制造商">
                <el-switch
                  v-model="currentBrand.factoryStatus"
                  size="mini"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="上传专区大图">
                <el-upload
                  style="width:150px;height:150px;line-height:150px;text-align:center;border:1px dashed #c0ccda;background:#fbfdff;border-radius: 6px"
                  action="/lejuAdmin/material/uploadFileOss"
                  :headers="token"
                  :show-file-list="false"
                  :on-success="handleBrandBigPicSuccess"
                  :limit="1"
                >
                  <el-image
                    v-if="currentBrand.bigPic"
                    :src="currentBrand.bigPic"
                    fit="fill"
                    style="width: 150px; height: 150px;"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon" />
                </el-upload>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="上传专区大图">
                <el-upload
                  style="width:150px;height:150px;line-height:150px;text-align:center;border:1px dashed #c0ccda;background:#fbfdff;border-radius: 6px"
                  action="/lejuAdmin/material/uploadFileOss"
                  :headers="token"
                  :show-file-list="false"
                  :on-success="handleBrandLogoPicSuccess"
                  :limit="1"
                >
                  <el-image
                    v-if="currentBrand.logo"
                    :src="currentBrand.logo"
                    fit="fill"
                    style="width: 150px; height: 150px;"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon" />
                </el-upload>
              </el-form-item>
            </el-col>

          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handledialogFormCancel">取 消</el-button>
          <el-button type="primary" @click="handledialogFormConfirm">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import { getToken } from '@/utils/myAuth'
import { deleteBrand, addBrand, getBrandList, switchShowStatus, updateBrand } from '@/api/product/brand/index'
import pageMix from '@/mixins/pageMix'
export default {
  mixins: [pageMix],
  data() {
    return {
      brandList: [],
      brandQuery: {
        'bigPic': '',
        'brandStory': '',
        'createTime': '',
        'factoryStatus': false,
        'firstLetter': '',
        'id': '',
        'logo': '',
        'modifyTime': '',
        'name': '',
        'productCommentCount': 0,
        'productCount': 0,
        'showStatus': false,
        'sort': 0
      },
      currentBrand: {},
      dialogFormVisible: false
    }
  },
  computed: {
    token() {
      return { token: getToken() }
    }
  },
  created() {
    this.init()
  },

  methods: {
    handleAddBrand() {
      this.dialogFormVisible = true
      this.currentBrand = JSON.parse(JSON.stringify(this.brandQuery))
    },
    async handledialogFormConfirm() {
      this.currentBrand.showStatus = this.currentBrand.showStatus ? 1 : 0
      this.currentBrand.factoryStatus = this.currentBrand.factoryStatus ? 1 : 0
      try {
        if (this.currentBrand.id) {
          await updateBrand(this.currentBrand)
        } else {
          await addBrand(this.currentBrand)
        }

        this.$message({
          message: this.currentBrand.id ? '更新成功' : '添加成功',
          type: 'success'
        })
        this.handledialogFormCancel()
        this.init()
      } catch (error) {
        this.$message.error(this.currentBrand.id ? '更新失败' : '添加失败')
      }
    },
    handledialogFormCancel() {
      this.dialogFormVisible = false
      this.currentBrand = JSON.parse(JSON.stringify(this.brandQuery))
    },
    handleBrandLogoPicSuccess(res) {
      this.currentBrand.logo = res.data.fileUrl
    },
    handleBrandBigPicSuccess(res) {
      this.currentBrand.bigPic = res.data.fileUrl
    },
    handleEdit(item) {
      this.currentBrand = item
      this.dialogFormVisible = true
    },
    handleDelete(item) {
      this.$confirm('此操作将删除该品牌信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await deleteBrand(item.id)
        this.$message.success('删除成功!')
        this.init()
      }).catch(() => {
        this.$message.info('已取消创建')
      })
    },
    async changeShowStatus(item, val) {
      try {
        await switchShowStatus({
          id: item.id,
          status: val ? 1 : 0
        })
        this.$message.success('修改成功')
        // eslint-disable-next-line
      } catch (error) {
        this.$message.error('修改失败')
        // eslint-disable-next-line
        item.isShow = !val
      }
    },
    async init() {
      const res = await getBrandList(this.start, this.limit)
      res.data.rows.forEach(el => {
        el.showStatus = !!el.showStatus
        el.factoryStatus = !!el.factoryStatus
      })
      this.totalRows = res.data.total
      this.brandList = res.data.rows
    }

  }

}
</script>
<style lang="scss" scoped>

</style>
