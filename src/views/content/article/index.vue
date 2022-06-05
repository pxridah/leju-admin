<template>
  <div class="article">
    <el-card class="search" shadow="always">
      <div slot="header">
        <span class="title">条件查询</span>
      </div>
      <el-form class="search-form" :inline="true" :model="arg">
        <el-form-item label="作者">
          <el-input v-model="arg.author" placeholder="作者" />
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="arg.title" placeholder="标题" />
        </el-form-item>
        <el-form-item label="编辑类型">
          <el-select v-model.number="arg.editorType" placeholder="编辑类型">
            <el-option label="富文本" value="0" />
            <el-option label="MarkDown" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="default" @click="onReset">重置</el-button>
          <el-button type="info" @click="onAdd">新增</el-button>
        </el-form-item>
      </el-form>

    </el-card>

    <div class="article-list">
      <el-table
        :data="articles"
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
          prop="title"
          label="文章标题"
          width="200"
        />
        <el-table-column
          align="center"
          label="展示图片"
          width="200"
        >
          <template slot-scope="scope">
            <img :src="scope.row.coverImg" alt="">
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

          prop="author"
          label="文章作者"
          width="200"
        />
        <el-table-column
          align="center"

          label="文章是否展示"
          width="150"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isShow"
              @change="changeArtShowStatus(scope.row, $event)"
            />
          </template>
        </el-table-column>
        <el-table-column
          align="center"

          label="内容"
          width="200"
        >
          <template slot-scope="scope">
            <el-tag>
              {{ scope.row.editorType==0?'富文本框':'Markdown' }}
            </el-tag>
          </template>

        </el-table-column>
        <el-table-column
          align="center"

          fixed="right"
          label="操作"
          width="200"
        >
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit" size="middle" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button type="text" style="color:red" icon="el-icon-delete" size="middle" @click="handleDelete(scope.row)">删除</el-button>
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
    </div>

  </div>
</template>
<script>
import pageMix from '@/mixins/pageMix'
import { getAllArticles, changeShowStatus, deleteArticle } from '@/api/content/article/index'
export default {
  mixins: [pageMix],
  data() {
    return {
      articles: [],
      arg: {
        'author': '',
        'collectCount': 0,
        'content1': '',
        'content2': '',
        'coverImg': '',
        'createTime': '',
        'editorType': '',
        'id': '',
        'isShow': 0,
        'modifyTime': '',
        'summary': '',
        'title': '',
        'viewCount': 0,
        'zanCount': 0
      }

    }
  },
  created() {
    this.init()
  },
  methods: {
    handleEdit(id) {
      this.$router.push({ name: 'editArticle', params: { id }})
    },
    onAdd() {
      this.$router.push({ name: 'addArticle' })
    },
    onReset() {
      Object.assign(this.arg, {
        'author': '',
        'title': '',
        'editorType': ''
      })
      this.init()
    },
    onSubmit() {
      this.init()
    },

    async handleDelete(item) {
      try {
        await this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        const res = await deleteArticle(item.id)
        if (res.success) {
          this.$message.success('删除文章成功')
          this.init()
        }
      } catch (error) {
        this.$message.info('取消删除')
      }
    },

    async changeArtShowStatus(item, val) {
      try {
        await changeShowStatus({
          id: item.id,
          isShow: val ? 1 : 0
        })
        this.$message.success('修改状态成功')
      } catch (error) {
        this.$message.error('修改状态失败')
        // eslint-disable-next-line
        item.isShow = !val
      }
    },
    async init() {
      const res = await getAllArticles(this.start, this.limit, this.arg)
      this.totalRows = res.data.total
      res.data.rows.forEach(ele => {
        ele.isShow = !!ele.isShow
      })
      this.articles = res.data.rows
    }
  }
}
</script>
<style lang="scss" scoped>
.article{

  .search{
    background-color: #fff;
    width: 96%;
    margin: 30px auto;

    .title{
      font-size: 18px;
      font-weight: 600;
    }
    .search-form{
      .el-form-item{
        margin-right: 40px;
      }
    }
  }

  .article-list{
    background: #fff;
    width: 96%;
    margin:0 auto 60px;
    padding: 20px;
    img{
      width: 150px;
      height: 150px;
      display: block;
    }
  }

}
</style>
