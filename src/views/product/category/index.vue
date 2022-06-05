<template>
  <div>
    <el-card class="margin-30">
      <div slot="header">分类管理</div>
      <div>
        <el-row :gutter="10">
          <el-col :span="24">
            <p style="font-size:16px;font-weight:600">乐居分类</p>
          </el-col>
          <el-col v-for="child in lejuCate.children" :key="child.id" :span="6">
            <el-card>
              <div slot="header">{{ child.name }}</div>
              <el-upload
                ref="upload"
                style="width:100%px;height:340px;line-height:340px;text-align:center;border:1px dashed #c0ccda;background:#fbfdff;border-radius: 16px;overflow:hidden"
                action="/lejuAdmin/material/uploadFileOss"
                :headers="token"
                :show-file-list="false"
                :on-success="handleCateIconSuccess"
                :limit="1"
                :before-upload="handleBeforeCateIconUpload"
                @click.native="handleCateIconUpload(child)"
              >
                <el-image
                  v-if="child.icon"
                  :src="child.icon"
                  fit="fill"
                  style="width:100%px;height:340px;display:block"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-card>
          </el-col>

          <el-col :span="24">
            <p style="padding-top:30px;font-size:16px;font-weight:600">全部分类</p>
          </el-col>
          <el-col :span="24">
            <el-table
              :data="allCate"
              row-key="id"
              border
            >
              <el-table-column
                prop="name"
                label="菜单名称"
                width="150"
                fixed="left"
              />
              <el-table-column
                label="icon"
                align="center"
                width="150"
              >
                <template slot-scope="scope">
                  <el-image
                    style="width: 60px; height: 60px"
                    :src="scope.row.icon"
                    fit="fill"
                  />
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                align="center"
                label="分类名字"
                width="150"
              />
              <el-table-column
                prop="sort"
                align="center"
                label="排序"
                width="150"
              />
              <el-table-column
                label="显示状态"
                align="center"
                width="150"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.showStatus?'显示':'不显示' }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="导航栏展示"
                align="center"
                width="150"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.navStatus?'展示':'不展示' }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="description"
                align="center"
                label="描述"
                width="150"
              />
              <el-table-column
                prop="createTime"
                align="center"
                label="创建时间"
                width="200"
              />
            </el-table>
          </el-col>
        </el-row>

      </div>
    </el-card>
  </div>
</template>
<script>
import { getToken } from '@/utils/myAuth'
import { getAllCategory } from '@/api/product/category/index'
export default {
  data() {
    return {
      lejuCate: {},
      allCate: [],
      currentChild: {}
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
    handleBeforeCateIconUpload() {
      this.$confirm('此操作将修改Icon, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('已确认!')
      }).catch(() => {
        this.$message('已取消!')
      })
    },
    handleCateIconUpload(item) {
      this.currentChild = item
    },
    handleCateIconSuccess(res) {
      this.currentChild.icon = res.data.fileUrl
    },
    async init() {
      const res = await getAllCategory()
      this.lejuCate = res.data.items.filter(el => el.category.name === '乐居')[0]
      var treeData = []
      res.data.items.forEach(ele => {
        ele.category.children = ele.children
        treeData.push(ele.category)
      })
      this.allCate = treeData
    }
  }
}
</script>
<style lang="">

</style>
