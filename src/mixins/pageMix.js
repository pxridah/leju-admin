export default {
  data() {
    return {
      start: 1,
      limit: 5,
      totalRows: 0
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.start = val
      this.init()
    },
    handleSizeChange(val) {
      this.limit = val
      this.init()
    }
  }
}
