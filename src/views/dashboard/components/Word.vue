<template>
  <div ref="word" />
</template>
<script>
import * as echarts from 'echarts'
import 'echarts-wordcloud'
export default {
  mounted() {
    var myChart = echarts.init(this.$refs.word, null, { height: 390, width: 320 })
    // 绘制图表
    myChart.setOption({
      series: [{
        type: 'wordCloud',

        shape: 'circle',
        left: 'center',
        top: 'center',
        width: '70%',
        height: '80%',
        right: null,
        bottom: null,

        sizeRange: [12, 60],
        rotationRange: [-90, 90],
        rotationStep: 45,
        gridSize: 8,
        drawOutOfBound: false,
        layoutAnimation: true,
        textStyle: {
          fontFamily: 'sans-serif',
          fontWeight: 'bold',
          color: function() {
            return 'rgb(' + [
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160)
            ].join(',') + ')'
          }
        },
        emphasis: {
          focus: 'self',
          textStyle: {
            textShadowBlur: 10,
            textShadowColor: '#333'
          }
        },

        data: [
          {
            name: 'Farrah Abraham',
            value: 366
          },
          {
            name: 'Alibaba',
            value: 650
          },
          {
            name: 'Amazon',
            value: 460
          },
          {
            name: 'iPhone',
            value: 700
          },
          {
            name: 'Google',
            value: 300
          }
        ]
      }]
    })
  }
}
</script>
<style lang="scss" scoped>
</style>
