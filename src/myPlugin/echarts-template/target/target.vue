<template>
    <div :id="id" class="target-box">
        <el-row>
            <el-col :span="24" class="target"
                    :style="{minHeight: as.height}">
                <div class="target-title" :style="{fontSize: as.title}">{{data.name}}</div>
                <div class="target-number mt10" :class="targetClass" :style="{fontSize: as.num}">{{data.data}}</div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {fmoney} from '../common.js';
export default {
  props: {
    id: String,
    chartData: {},
    theme: String
  },
  data () {
    return {
      targetClass: '',
      as: {
        title: '',
        num: ''
      },
      data: {name: '', data: ''},
      medias: [100, 200, 300, 400, 500, 900, 1100, 1300, 1500, 1700, 1900, 2100]
    };
  },
  mounted () {
    this.resolveData();
    const numbers = this.data.data.toString();
    let decimalCount = numbers.length - (numbers.indexOf('.') + 1); // 获取小数点后的个数
    if (numbers.indexOf('.') < 0) {
      decimalCount = 0;
    }
    let arr = this.data.data.toString().split('%');
    this.data.data = fmoney(arr[0], decimalCount, true).toString();
    if (arr.length === 2) {
      this.data.data += '%';
    }
    this.targetClass = `target-number-${this.theme}`;
    this.$nextTick(() => {
      this.resize();
    });
    window.addEventListener('resize', this.resize);
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resize);
  },
  methods: {
    resolveData () {
      let {name, data} = this.chartData.yAxis[0];
      data = data[0];
      this.data = {name, data};
    },
    resize () {
      const width = document.getElementById(this.id).offsetWidth;
      // const height = document.getElementById(this.id).offsetHeight;
      for (let $index = 0; $index < this.medias.length; $index++) {
        if (width < this.medias[$index]) {
          this.as = {
            title: ($index * 12) + 'px',
            num: ($index * 22) + 'px'
          };
          break;
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
    .target-box {
        padding: 10px;
        overflow-y: auto;
        overflow-x: hidden;
        display: flex;
        //align-items:center;
        flex-direction: column;
        justify-content: center;

        .target {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 0 10px;
        }
        .target-title {
            color: #666;
            font-size:28px;
            font-weight:400;
            color:rgba(255,255,255,1);
        }
        @mixin target-number($color){
            font-size:56px;
            font-family:'Roboto';
            font-weight:500;
            color: $color;
        }
        .target-number-purple {
            @include target-number(#65E3FF);
        }
        .target-number-orange {
            @include target-number(#FFAD1F);
        }
        .target-number-blue {
            @include target-number(#65E3FF);
        }
    }
</style>
