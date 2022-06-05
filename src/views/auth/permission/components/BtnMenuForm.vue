<template>
  <div>

    <el-form ref="form" :model="form" label-width="80px">

      <el-form-item label="所在页面">
        <el-cascader v-model="form.pid" size="mini" :options="menuOptions" :props="{ expandTrigger: 'hover', emitPath: false, checkStrictly: true , label: 'title', value: 'id' }" clearable />
      </el-form-item>

      <el-form-item label="按钮名称">
        <el-input v-model="form.title" placeholder="按钮名称,如:添加" size="mini" />
      </el-form-item>

      <el-row :gutter="10">

        <el-col :span="8">
          <el-form-item label="排序">
            <el-input-number v-model="form.sort" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="层级">
            <el-input-number v-model="form.level" size="mini" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="权限标识">
        <el-input v-model="form.permissionValue" placeholder="权限标识不能为空,如:xxx.add" size="mini" />
      </el-form-item>
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
        'id': '',
        'pid': '', // 所在页面的id
        'level': 2,
        'sort': 0, // 排序
        'type': 2, // 按钮type=2
        'title': '', // 按钮名称
        // 增删改查建议使用add remove edit list
        // 命名空间建议使用 当前页面的路由name  ,比如 productList.add
        'permissionValue': '' // 按钮权限标识,用于区分页面按钮
      }

    }
  },
  methods: {

    submit() {
      return {
        ...this.form
      }
    },
    reset() {
      this.form = {
        'id': '',
        'pid': '', // 所在页面的id
        'level': 2,
        'sort': 0, // 排序
        'type': 2, // 按钮type=2
        'title': '', // 按钮名称
        // 增删改查建议使用add remove edit list
        // 命名空间建议使用 当前页面的路由name  ,比如 productList.add
        'permissionValue': '' // 按钮权限标识,用于区分页面按钮
      }
    }
  }
}
</script>
<style lang="">

</style>
