<template>
  <div ref="dashboard" class="dashboard-container">
    <div class="top">
      <svg-icon icon-class="screen-full" class-name="screen-full" @click="fullScreen" />
      <div class="title">乐居数据大屏</div>
      <div class="timer">{{ datetime }}</div>
    </div>
    <div class="main">
      <div class="left">
        <div class="shell">
          <div class="title">电商数据 <span class="etitle">Shell Data</span></div>
          <div class="sold">
            <span>销售量</span><span class="unit">万元</span>
          </div>
          <!-- eslint-disable-next-line vue/attribute-hyphenation -->
          <countTo :start-val="startVal" :end-val="endVal" :duration="3000" class="count" @mountedCallback="countToCallBack" />
          <div class="percent">
            <div class="title">完成百分比</div>
            <el-progress :percentage="percentage" :stroke-width="10" class="progress" />
          </div>

        </div>

        <div class="hot">
          <div class="title">热词搜索<span class="etitle">Top Search</span></div>
          <Word />
        </div>
      </div>
      <div class="center">
        <div class="order-wrapper">
          <Order />
        </div>
        <div class="map-wrapper">
          <Map />
        </div>
        <div class="terminal-wrapper">
          <Terminal />
        </div>
      </div>

      <div class="right">
        <div class="statistics">
          <div class="title">
            统计数据 <span class="etitle">Statistics Data</span>
          </div>
          <div class="content">
            <div class="item">
              <div class="left">
                <img src="@/assets/imgs/article.png" alt="">
              </div>
              <div class="right">
                <div class="title">85.6</div>
                <div class="unit">订单总数(万)</div>
              </div>
            </div>
            <div class="item">
              <div class="left">
                <img src="@/assets/imgs/light.png" alt="">
              </div>
              <div class="right">
                <div class="title">32.5</div>
                <div class="unit">销售总量(万元)</div>
              </div>
            </div>
            <div class="item">
              <div class="left">
                <img src="@/assets/imgs/redflash.png" alt="">
              </div>
              <div class="right">
                <div class="title">92.6</div>
                <div class="unit">人均消费</div>
              </div>
            </div>
            <div class="item">
              <div class="left">
                <img src="@/assets/imgs/greenflash.png" alt="">
              </div>
              <div class="right">
                <div class="title">45</div>
                <div class="unit">仅十分钟新增订单数量</div>
              </div>
            </div>
          </div>
        </div>
        <div class="supper">
          <div class="title">
            大额订单TOP <span class="etitle">Supper Orders</span>
          </div>
          <div class="content">
            <el-table
              :data="suppers"
            >
              <el-table-column
                prop="time"
                label="时间"
              />
              <el-table-column
                prop="product"
                label="物品"
              />
              <el-table-column
                prop="count"
                label="数量"
              />
              <el-table-column
                prop="amount"
                label="金额"
              />
            </el-table>
          </div>

        </div>
      </div>
    </div>

    <div v-if="showBottom" class="bottom">
      <BgAnimate />
    </div>
  </div>
</template>

<script>
import countTo from 'vue-count-to'
import screenfull from 'screenfull'
import Order from './components/Order.vue'
import Word from './components/Word.vue'
import Map from './components/Map.vue'
import Terminal from './components/Terminal.vue'
import BgAnimate from './components/BgAnimate.vue'
export default {
  components: {
    Order,
    countTo,
    Word,
    Map,
    Terminal,
    BgAnimate
  },
  data() {
    return {
      timer: null,
      datetime: '',
      startVal: 1010001,
      endVal: 1821102,
      percentage: 50,
      suppers: [],
      showBottom: false

    }
  },

  created() {
    this.init()
  },
  mounted() {
    this.timer = setInterval(() => {
      this.datetime = new Date().toLocaleString()
    }, 1000)
  },
  beforeDestroy() {
    /* 离开页面前销毁定时器 */
    if (this.timer) {
      clearInterval(this.timer)
    }
  },

  methods: {
    countToCallBack() {
      this.percentage = 89
    },
    init() {
      for (let i = 0; i < 8; i++) {
        var count = Math.ceil(Math.random() * 100)
        var amount = Math.round(Math.random() * 10000 + 15000)
        this.suppers.push({
          time: `10-2${i}`,
          product: `物品${i}`,
          count,
          amount
        })
      }
    },
    fullScreen() {
      // 全屏
      if (screenfull.isEnabled) {
        // 控制是否全屏的按钮
        screenfull.toggle(this.$refs.dashboard)
        this.showBottom = !this.showBottom
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container{
  background-color: #0a1631;
  .top{
    display: flex;
    justify-content: center;
    position: relative;

    width:100%;
    height: 100px;
    .screen-full{
      position: absolute;
      width: 25px;
      height: 25px;
      left: 10px;
      top: 10px
    }
    .timer{
      position: absolute;
      color: #fff;
      font-size: 20px;
      top: 20px;
      right: 25px;
    }
    .title{
      width: 70%;
      color: #fff;
      text-shadow: #fff 0px 0px 15px;
      font-size: 36px;
      font-weight: bold;
      height: 120px;
      line-height: 100px;
      text-align: center;
      background: url('~@/assets/imgs/titleBG.png') no-repeat;
      background-size: 100% 100%;
      background-position: center;
    }
  }
  .main{
    display: flex;
    width:100%;

    .left{
      width: 25%;
      .shell{
        padding: 10px;
        width: 100%;
        .title{
          font-family: "Microsoft Yahei", Arial, sans-serif;
          font-size: 22px;
          color: #9aa8d4;
          font-weight: normal;
          .etitle{
            font-size: 20px;
            color: #404d69;
          }
        }
        .sold{
          font-size: 16px;
          color: #9aa8d4;
          display: flex;
          justify-content: space-between;
          padding: 20px 0;
          .unit{
            color:#73aae5;
          }
        }
        .count{
          letter-spacing: 5px;
          font-size: 60px;
          font-weight: bold;
          color: white;
        }
        .percent{
          .title{
            padding: 20px 0;
            font-size: 16px;
            color: #9aa8d4;
          }
          .progress{
            width: 96%;
            margin: 20px auto;
            ::v-deep .el-progress-bar__inner{
                      background: linear-gradient(to right, #24cbff 30%, #9000ff 100%);
                  }
          }
        }
      }

      .hot{
        padding: 10px;
        width: 340px;
        .title{
          font-family: "Microsoft Yahei", Arial, sans-serif;
          font-size: 22px;
          color: #9aa8d4;
          font-weight: normal;
          .etitle{
            font-size: 20px;
            color: #404d69;
          }
        }
      }
    }
    .center{
      width:50%;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      .order-wrapper{
        width: 100%;
        height: 380px;
        padding:10px;
      }
      .terminal-wrapper{
        padding: 10px;
        width: 50%;
        height: 360px;
      }
      .map-wrapper{
        padding:10px;
        width: 50%;
        height: 360px;
      }
    }
    .right{
      width: 25%;
      .statistics{
        width: 100%;
        .title{
          font-family: "Microsoft Yahei", Arial, sans-serif;
          font-size: 22px;
          color: #9aa8d4;
          font-weight: normal;
          .etitle{
            font-size: 20px;
            color: #404d69;
          }
        }
        .content{
          padding: 10px;
          width: 100%;
          height: 150px;
          margin-top: 20px;
          display: flex;
          flex-wrap: wrap;
          .item{
            height: 50%;
            width: 50%;
            display: flex;
            .left{
              width: 35%;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              img{
                width: 43px;
                height: 43px;
                display: block;
              }
            }
            .right{
              width: 75%;
              height: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              .title{
                font-family: "Microsoft Yahei";
                font-size: 32px;
                font-weight: bold;
                color: white;
              }
              .unit{
                margin-top: 4px;
                font-family: "Microsoft Yahei";
                font-size: 12px;
                color: #b0c2f9;
              }
            }
          }
        }
      }
      .supper{
        .title{
          margin: 10px 0;
          font-family: "Microsoft Yahei", Arial, sans-serif;
          font-size: 22px;
          color: #9aa8d4;
          font-weight: normal;
          .etitle{
            font-size: 20px;
            color: #404d69;
          }
        }
        .content{

          .el-table{
            border:1px solid #33416b;
            border-bottom:0;
            color: #9aa8d4;
            &::before{
              height: 0;
            }
          }
          ::v-deep .el-table td,
          ::v-deep .el-table th {
            border-bottom: 1px solid #33416b;
            background-color: #0a1631;

          }
        }

      }
    }

  }

  .bottom{
    position: absolute;
    z-index: 1;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 25%;
  }
}

</style>
