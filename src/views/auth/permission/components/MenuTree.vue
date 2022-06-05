<template>
  <div>
    <el-dialog
      title="初始化的菜单列表"
      :visible.sync="dialogVisible"
      width="30%"
      :close="handleClose"
    >
      <el-alert
        title="请谨慎操作! 初始化菜单会覆盖之前记录!"
        type="warning"
      />
      <el-tree :data="menuTree" :props="props" />
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="handleClose">取 消</el-button>
        <el-button type="primary" size="mini" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { asyncRoutes } from '@/router/index'
import { saveInitMenus } from '@/api/auth/permission/index'
import _ from 'lodash'
export default {
  data() {
    return {
      dialogVisible: false,
      asyncRoutes,
      menuTree: [],
      props: {
        label: 'title',
        children: 'children'
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      var routes = _.cloneDeep(this.asyncRoutes)
      this.reBuildMenuTree(routes)
      this.menuTree = routes
    },
    reBuildMenuData(routes) {
      for (var i = 0; i < routes.length; i++) {
        var route = routes[i]

        if (route.meta) {
          route.component = route.meta.componentUrl
          route.title = route.meta.title
          route.icon = route.meta.icon
          route.meta = JSON.stringify(route.mete)
        } else {
          // 没有meta  直接跳过
          continue
        }
        if (route.children && route.children.length > 0) {
          this.reBuildMenuData(route.children)
        }
      }
      return routes
    },
    reBuildMenuTree(routes) {
      for (var i = 0; i < routes.length; i++) {
        var route = routes[i]
        route.id = route.name
        if (route.meta) {
          route.component = route.meta.componentUrl
          route.title = route.meta.title
        } else {
          // 按钮没有meta  直接跳过
          continue
        }
        if (route.children && route.children.length > 0) {
          this.reBuildMenuTree(route.children)
        } else {
          route.children = [
            {
              id: route.id + '.list',
              title: '查询'
            }, {
              id: route.id + '.add',
              title: '新增'
            }, {
              id: route.id + '.edit',
              title: '编辑'
            }, {
              id: route.id + '.del',
              title: '删除'
            }
          ]
        }
      }
    },
    handleClose() {
      this.dialogVisible = false
      this.menuTree = []
    },
    async handleConfirm() {
      this.$message.warning('此数据谨慎修改,模拟已经初始化完毕!')
      this.handleClose()
      this.$emit('refresh')
      return
      // var routes = _.cloneDeep(this.asyncRoutes)
      // var menus = this.reBuildMenuData(routes)
      // try {
      //   await saveInitMenus(menus)
      //   this.$message.success('初始化成功')
      //   this.handleClose()
      //   this.$emit('refresh')
      // } catch (error) {
      //   this.$message.error('初始化失败')
      // }
    },
    openMenuTree() {
      this.dialogVisible = true
      this.init()
    }
  }

}
</script>
<style lang="scss" scoped>

</style>
