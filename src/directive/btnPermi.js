import store from '@/store'

export default {
  inserted(el, binding, vNode) {
    // 按钮权限标识 add edit remove list
    var flag = binding.arg
    if (!flag) {
      el.parentNode && el.parentNode.removeChild(el)
      throw new Error('权限标识不能为空')
    }
    // 从 vuex 中取出按钮权限列表
    var permissionList = store.state.user.btnPermissions
    if (permissionList != null && permissionList.length > 0) {
      // [xxList.add,xxxList.edit ...]
      var reg = new RegExp('.+\.' + flag + '$', 'g')
      var isPermissionExist = permissionList.some(item => reg.test(item))
      if (!isPermissionExist) {
        // 如果权限不存在,删除按钮
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  }
}
