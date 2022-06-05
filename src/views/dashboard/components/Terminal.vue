<template>
  <div ref="terminal" class="terminal" />
</template>
<script>
import * as echarts from 'echarts'
export default {
  mounted() {
    var myChart = echarts.init(this.$refs.terminal)
    // 绘制图表
    myChart.setOption({

      title: {
        text: '购买终端',
        textStyle: {
          color: '#9aa8d4',
          fontSize: '22px',
          fontWeight: 'normal'
        }

      },

      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },

      series: [

        {

          name: '购买终端',
          type: 'pie',
          radius: ['25%', '50%'],
          center: ['50%', '50%'],
          roseType: 'area',
          data: [
            { value: 10, name: 'Wap Web',
              itemStyle: {
                color: 'rgb(107,72,220)'
              },
              label: {
                color: 'rgb(107,72,220)'
              }
            },
            { value: 5, name: 'iOS',
              itemStyle: {
                color: 'rgb(130,29,139)'
              },
              label: {
                color: 'rgb(130,29,139)'
              }
            },
            { value: 15, name: 'PC Web',
              itemStyle: {
                color: 'rgb(193,0,255)'
              },
              label: {
                color: 'rgb(193,0,255)'
              }

            },
            { value: 25, name: 'Android',
              itemStyle: {
                color: 'rgb(36,175,255)'
              },
              label: {
                color: 'rgb(36,175,255)'
              }
            }
          ]
        }
      ]
    }
    )
  }
}
</script>
<style lang="scss" scoped>
.terminal{
  width: 100%;
  height: 100%;
}
</style>
