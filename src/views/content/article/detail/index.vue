<template>
  <div class="margin-30">
    <el-card shadow="always">
      <div slot="header">
        <span class="title">{{ id?'编辑文章':'新增文章' }}</span>
      </div>

      <el-form ref="ruleForm" :model="arg" :rules="rules" label-width="120px">
        <el-row :gutter="20">

          <el-col :span="8">
            <el-form-item label="作者" prop="author">
              <el-input v-model="arg.author" />
            </el-form-item>

          </el-col>
          <el-col :span="8">
            <el-form-item label="标题" prop="title">
              <el-input v-model="arg.title" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="是否显示" prop="isShow">
              <el-switch
                v-model="arg.isShow"
              />
            </el-form-item>
          </el-col>

          <el-col :span="16">
            <el-form-item label="摘要" prop="summary">
              <el-input
                v-model="arg.summary"

                type="textarea"
                :rows="3"
                placeholder="请输入摘要"
              />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="封面图片" prop="coverImg">
              <el-upload
                action="/lejuAdmin/material/uploadFileOss"
                :headers="token"
                :on-success="uploadImgs"
                :limit="1"
              >
                <el-button size="small" type="primary" icon="el-icon-upload">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
              <el-image
                v-if="id"
                style="width: 100px; height: 100px"
                :src="arg.coverImg"
              />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="切换富文本类型" prop="editorType">
              <el-radio v-model="arg.editorType" :label="0">富文本</el-radio>
              <el-radio v-model="arg.editorType" :label="1">MarkDown</el-radio>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <Tinymce v-show="arg.editorType==0" v-model="arg.content1" />
          </el-col>

          <el-col :span="24">
            <MarkdownEditor v-show="arg.editorType==1" ref="md" />
          </el-col>

          <el-col :span="12" :offset="8">
            <el-form-item style="margin-top:20px">
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button v-if="!id" @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-col>

        </el-row>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce/index.vue'
import MarkdownEditor from '@/components/MarkdownEditor/index.vue'
import { getToken } from '@/utils/myAuth'
import { addArticle, getArticle, updateArticle } from '@/api/content/addArticle/index'
export default {
  components: {
    Tinymce,
    MarkdownEditor
  },
  data() {
    return {
      id: '',
      token: {
        token: getToken()
      },
      arg: {
        'id': '',
        'author': '',
        'title': '',
        'summary': '',
        'isShow': true,
        'coverImg': '',
        'content1': '',
        'content2': '',
        'editorType': 0,
        'collectCount': 0,
        'createTime': '',
        'modifyTime': '',
        'viewCount': 0,
        'zanCount': 0
      },
      rules: {
        author: [
          { required: true, message: '请输入作者', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      this.id = this.$route.params.id

      if (this.id) {
        const res = await getArticle(this.id)
        res.data.productArticle.isShow = !!res.data.productArticle.isShow
        this.arg = res.data.productArticle
        if (this.arg.editorType === 1) {
          this.setMd(this.arg.content1)
        }
      }
    },

    getMd() {
      // 获取markdown数据
      var html = this.$refs.md.getHtml()
      var val = this.$refs.md.getValue()
      return {
        html,
        val
      }
    },
    setMd(val) {
      // 设置markdown数据
      this.$refs.md.setValue(val)
    },

    uploadImgs(response, file, fileList) {
      this.arg.coverImg = response.data.fileUrl
    },

    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          if (this.arg.editorType === 0) {
            this.arg.content2 = this.arg.content1
          } else {
            this.arg.content1 = this.getMd().val
            this.arg.content2 = this.getMd().html
          }

          const arg = JSON.parse(JSON.stringify(this.arg))
          arg.isShow = arg.isShow ? 1 : 0

          if (this.id) {
            await updateArticle(arg)
          } else {
            await addArticle(arg)
          }
          this.$router.push('/content/article')
        } else {
          this.$message.warning('文章内容格式不正确')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="scss" scoped>
  .title{
    font-size: 18px;
    font-weight: 600;
  }
</style>
