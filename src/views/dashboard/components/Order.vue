<template>
  <div ref="order" class="order" />
</template>
<script>
import * as echarts from 'echarts'
export default {
  mounted() {
    const xData = ['1st', '2nd', '3rd']
    const orderData = []
    const backData = []
    for (let i = 3; i < 31; i++) {
      xData.push(`${i + 1}th`)
    }
    for (let i = 0; i < 31; i++) {
      orderData.push(Math.ceil(Math.random(0, 1) * 256))
      backData.push(Math.ceil(Math.random(0, 1) * 50))
    }

    var myChart = echarts.init(this.$refs.order)
    // 绘制图表
    myChart.setOption({
      title: {
        text: '订单退单柱状图',
        textStyle: {
          color: '#9aa8d4',
          fontSize: '22px',
          fontWeight: 'normal'
        }

      },

      legend: {
        bottom: 10,
        textStyle: {
          color: '#9aa8d4'
        }
      },
      tooltip: {},
      xAxis: {
        data: xData,
        axisLabel: {
          rotate: 45,
          textStyle: {
            color: '#9aa8d4'
          }
        }
      },
      yAxis: {
        splitLine: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: '#9aa8d4'
          }
        }
      },
      series: [
        {
          name: '订单',
          type: 'bar',
          data: orderData,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgb(251, 118, 123)'
                },
                {
                  offset: 1,
                  color: 'rgb(204, 46, 72)'
                }
              ]
            }
          }
        },
        {
          name: '退单',
          type: 'bar',
          data: backData,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgb(129, 227, 238)'
                },
                {
                  offset: 1,
                  color: 'rgb(25, 183, 207)'
                }
              ]
            }
          }

        }
      ]
    })
  }
}
</script>
<style lang="scss" scoped>
.order{
  width: 100%;
  height: 100%;
}
</style>
