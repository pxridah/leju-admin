<template>
  <div>
    <el-dialog
      title="编辑菜单"
      :visible.sync="dialogVisible"
      width="70%"
      :close="handleClose"
    >
      <div>
        <label style="width:80px;margin-right:20px">菜单类型</label>
        <el-radio-group v-model="menuType">
          <el-radio :label="1">顶级目录</el-radio>
          <el-radio :label="2">菜单</el-radio>
          <el-radio :label="3">按钮</el-radio>
        </el-radio-group>
      </div>
      <TopMenuForm v-if="menuType===1" ref="form_tab1" />
      <NormalMenuForm v-if="menuType===2" ref="form_tab2" :menu-options="optionsCom" />
      <BtnMenuForm v-if="menuType===3" ref="form_tab3" :menu-options="optionsCom" />
      <div slot="footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import _ from 'lodash'
import TopMenuForm from './TopMenuForm.vue'
import NormalMenuForm from './NormalMenuForm.vue'
import BtnMenuForm from './BtnMenuForm.vue'
import { savePermission } from '@/api/auth/permission/index.js'
export default {
  components: {
    TopMenuForm,
    NormalMenuForm,
    BtnMenuForm
  },
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      dialogVisible: false,
      menuType: 1
    }
  },
  computed: {
    optionsCom() {
      var menus = _.cloneDeep(this.options)
      this.reBuildMunuTree(menus)
      return menus
    }
  },
  methods: {
    reBuildMunuTree(menus) {
      for (var i = 0; i < menus.length; i++) {
        var item = menus[i]
        if (item.type === 2) {
          item.disabled = true
        }
        if (item.children && item.children.length === 0) {
          delete item.children
        } else {
          this.reBuildMunuTree(item.children)
        }
      }
    },
    async handleConfirm() {
      var form = this.$refs[`form_tab${this.menuType}`].submit()
      try {
        await savePermission(form)
        this.$message.success('成功')
        this.handleClose()
        this.$emit('refresh')
      } catch (error) {
        console.log(form)
        this.$message.error('失败')
      }
    },
    handleClose() {
      this.$refs[`form_tab${this.menuType}`].reset()
      this.dialogVisible = false
    },
    openMenuForm() {
      this.dialogVisible = true
    }
  }
}
</script>
<style lang="">

</style>
