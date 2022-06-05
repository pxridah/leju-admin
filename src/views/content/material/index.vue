<template>
  <div>
    <el-card class="margin-30">
      <div slot="header">
        <el-upload
          action="/lejuAdmin/material/uploadFileOssSave"
          :headers="token"
          :on-success="uploadImgs"
          :limit="1"
          :show-file-list="false"
        >
          <el-button size="small" type="primary" icon="el-icon-upload">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
      <div>
        <el-row :gutter="20">
          <el-col v-for="item in materials" :key="item.id" class="item" :span="6" style="margin-bottom:20px">
            <el-card>
              <div slot="header">创建时间: {{ item.createTime }}</div>
              <div>
                <el-image
                  style="width: 100%; height: 250px;display:block;margin:0 auto"
                  :src="item.ossUrl"
                />
              </div>
              <div class="bottom">
                <el-button type="danger" size="small" @click="handleDelete(item.id)">删除素材</el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <!-- 分页 -->
        <el-pagination
          :current-page="start"
          :page-size="limit"
          :total="totalRows"
          :page-sizes="[12, 24, 36]"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>
<script>
import { getAllArticles, delteMaterial } from '@/api/content/materials/index'
import { getToken } from '@/utils/myAuth'
import pageMix from '@/mixins/pageMix'
export default {
  mixins: [pageMix],
  data() {
    return {
      token: {
        token: getToken()
      },
      materials: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    uploadImgs(response, file, fileList) {
      this.init()
    },
    async handleDelete(id) {
      try {
        await this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        const res = await delteMaterial(id)
        if (res.success) {
          this.$message.success('删除素材成功')
          this.init()
        }
      } catch (error) {
        this.$message.info('取消删除')
      }
    },
    async init() {
      const res = await getAllArticles(this.start, this.limit)
      this.totalRows = res.data.total
      this.materials = res.data.rows
    }
  }
}
</script>
<style lang="scss" scoped>
.item{
  .bottom{
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
}
</style>
