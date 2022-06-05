<template>
  <div>

    <el-form ref="form" :model="form" label-width="80px">

      <el-form-item label="上级菜单">
        <el-cascader v-model="form.pid" size="mini" :options="menuOptions" :props="{ expandTrigger: 'hover', emitPath: false, checkStrictly: true , label: 'title', value: 'id' }" clearable />
      </el-form-item>

      <el-form-item label="路由名称">
        <el-input v-model="form.name" placeholder="前端路由name,唯一" size="mini" />
      </el-form-item>
      <el-form-item label="路径">
        <el-input v-model="form.path" placeholder="前端路由path,忽略父节点路径" size="mini" />
      </el-form-item>
      <el-form-item label="组件路径">
        <el-input v-model="form.componentUrl" placeholder="前端路由组件路径比如:@/views/foo/index.vue" size="mini" />
      </el-form-item>
      <el-form-item label="重定向">
        <el-input v-model="form.redirect" placeholder="重定向redirect属性" size="mini" />
      </el-form-item>

      <el-row :gutter="10">

        <el-col :span="8">
          <el-form-item label="排序">
            <el-input-number v-model="form.sort" size="mini" />
          </el-form-item>
        </el-col>

        <el-form-item label="是否隐藏">
          <el-radio-group v-model="form.hidden">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="是否展开">
          <el-radio-group v-model="form.alwaysShow">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="meta属性">
          <el-col v-for="meta in metaList" :key="meta.key" :span="24">
            <el-col :span="8">
              <el-input v-model="meta.key" size="mini" />
            </el-col>
            <el-col :span="8">
              <el-input v-model="meta.value" :placeholder="meta.placeholder" size="mini" />
            </el-col>
            <el-col :span="8">
              <el-button type="primary" icon="el-icon-plus" size="mini" circle @click="handleAddMeta" />
              <el-button v-if="!meta.hiddenDel" type="danger" icon="el-icon-minus" size="mini" circle @click="handleDelMeta(meta.tempId)" />
            </el-col>
          </el-col>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>
<script>

export default {
  props: {

    menuOptions: {
      type: Array,
      required: true
    }

  },
  data() {
    return {
      form: {
        pid: '0',
        type: 1,
        level: 1,
        hidden: false,
        alwaysShow: false,
        sort: 0,
        meta: {},

        name: '',
        path: '',
        component: '',
        redirect: ''
      },
      metaList: [
        {
          key: 'title',
          value: '',
          placeholder: '比如商品管理',
          hiddenDel: true
        },
        {
          key: 'icon',
          value: 'el-icon-menu',
          placeholder: '比如 el-icon-menu',
          hiddenDel: true
        }
      ]
    }
  },
  methods: {

    submit() {
      this.metaList.forEach(el => {
        this.form.meta[el.key] = el.value
      })
      var { icon, title } = this.form.meta
      this.form.meta = JSON.stringify(this.form.meta)
      return {
        ...this.form,
        icon,
        title
      }
    },
    reset() {
      this.form = {
        pid: '0',
        type: 1,
        level: 0,
        hidden: false,
        alwaysShow: false,
        sort: 0,
        meta: {},

        name: '',
        path: '',
        component: '',
        redirect: ''
      }
    },
    handleAddMeta() {
      this.metaList.push({
        tempId: new Date().getTime(),
        key: '',
        value: ''
      })
    },
    handleDelMeta(tempId) {
      this.metaList = this.metaList.filter(item => item.tempId !== tempId)
    }
  }
}
</script>
<style lang="">

</style>
