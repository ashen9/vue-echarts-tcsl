<template>
    <div class="farther" :class="parentClass" v-loading="loading">
        <article>{{title}}</article>
        <div style="height:calc(100% - 15px);">
            <component :chartType="chartType" ref="chartTemplate" :is="'dc-chart-template-' + chartType" :theme="theme"
                       :id="specialId" :chartData="chartData"  v-if="isShowChart" style="height:100%;">
            </component>
            <div v-show="!isShowChart && chartMsg" class="child" v-text="chartMsg"></div>
        </div>
    </div>

</template>

<script>
import pie from '@/myPlugin/echarts-template/pie/pie.vue'; // 饼
import ring from '@/myPlugin/echarts-template/ring/ring.vue'; // 环
import gauge from '@/myPlugin/echarts-template/gauge/gauge.vue'; // 计量图
import line from '@/myPlugin/echarts-template/line/line.vue'; // 线
import number from '@/myPlugin/echarts-template/number/number.vue'; // 翻牌器
import column from '@/myPlugin/echarts-template/column/column.vue'; // 柱
import stack from '@/myPlugin/echarts-template/stack/stack.vue'; // 堆积
import bars from '@/myPlugin/echarts-template/bars/bars.vue'; // 条形图
import area from '@/myPlugin/echarts-template/area/area.vue'; // 面积
import target from '@/myPlugin/echarts-template/target/target.vue'; // 指标卡
import table from '@/myPlugin/echarts-template/table/table.vue'; // 表
import map from '@/myPlugin/echarts-template/map/map.vue'; // 地图
export default {
  name: 'VueEchartsTcsl',
  data () {
    return {
      loading: true,
      isShowChart: false,
      chart: '',
      chartMsg: ''
    };
  },
  computed: {
    parentClass () {
      return `chart-parent-${this.theme}`;
    }
  },
  props: {
    chartType: {
      type: String,
      required: true
    },
    chartData: Object,
    title: {
      type: String,
      required: true,
      default: function () {
        return '默认图表';
      }
    },
    specialId: {
      type: String,
      required: true
    },
    theme: {
      type: String,
      default: function () {
        return 'blue';
      }
    }
  },
  mounted () {
    setTimeout(_ => {
      this.loaderStop();
    }, 1000);
  },
  methods: {
    loaderStop () {
      this.loading = false;
      this.isShowChart = true;
      // this.chartMsg = '当前图表无数据';
    },
    loader () {
      this.loading = true;
    },
    resize () {
      try {
        this.$refs.chartTemplate.resize();
      } catch (e) {
        console.trace(`'dc-chart-template-${this.chartType}' component unMounted`);
        /* console.log('the chart unMounted');
        console.info('the chart unMounted');
        console.error('the chart unMounted');
        console.warn('the chart unMounted'); */
      }
    }
  },
  components: { // 图表组件注册机
    // 'dc-chart-template-pie': resolve => require.ensure([], () => resolve(require('@/myPlugin/echarts-template/pie/pie.vue')), 'pie'), // 饼
    // 'dc-chart-template-ring': resolve => require.ensure([], () => resolve(require('@/myPlugin/echarts-template/ring/ring.vue')), 'ring'), // 饼
    'dc-chart-template-pie': pie, // 饼
    'dc-chart-template-ring': ring, // 环
    'dc-chart-template-gauge': gauge, // 计量图
    'dc-chart-template-line': line,// 线
    'dc-chart-template-number': number, // 翻牌器
    'dc-chart-template-column': column, // 柱
    'dc-chart-template-stack': stack, // 堆积
    'dc-chart-template-bars': bars, // 条形图
    'dc-chart-template-area': area, // 面积
    'dc-chart-template-target': target, // 指标卡
    'dc-chart-template-table': table, // 表
    'dc-chart-template-map': map // 地图
  }
};
</script>
<style lang="scss">
    .farther {
        .el-loading-mask{
            background-color: transparent;
        }
    }
</style>
<style lang="scss" scoped>
    .farther {
        width: 100%;
        height: 100%;
    }
    @mixin chart-parent($font-color, $border-image){
        font-size:18px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color: $font-color;
        overflow: hidden; //有滚动条，加上试试
        border:15px solid transparent;
        border-image: url($border-image) 30 30 stretch;
        -moz-border-image:url($border-image) 30 30 stretch;/* Old Firefox */
        -webkit-border-image:url($border-image) 30 30 stretch;/* Safari and Chrome */
        -o-border-image:url($border-image) 30 30 stretch;
    }
    .chart-parent-purple{
        $font-color: rgba(226,202,255,1);
        $border-image: '~@/assets/static/chart/purple_border.png';
        background:rgba(139,45,255,0.07);
        @include chart-parent($font-color, $border-image);
    }
    .chart-parent-orange{
        $font-color: #FFB617;
        $border-image: '~@/assets/static/chart/orange_border.png';
        background:rgba(31,21,13,0.5);
        @include chart-parent($font-color, $border-image);
    }
    .chart-parent-blue{
        $font-color: #65B8FF;
        $border-color: rgba(63,95,252,1);
        @include chart-parent($font-color, '');
        > div{
            margin-top: 5px;
            padding-top: 8px;
            border-top: $border-color 1px solid;
            background:rgba(80,102,244, .1);
            background-clip: content-box;
        }
        &:before{
            $height: 3px;
            content:"..";
            color: transparent;
            background-color:$border-color;
            height: $height;
            width: $height * 2;
            margin-top: 26px - ($height / 2);
            position: absolute;
            z-index: 2;
        }
    }
</style>
