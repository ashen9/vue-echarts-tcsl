export const Option = {
  /*   visualMap: {
      min: 0,
      max: 100,
      left: 'left',
      bottom: '8%',
      text: ['40K', '0'],
      calculable: false,
      inRange: {
        color: ['#273562', '#4785FF']
      },
      itemWidth: 8,
      itemHeight: 60,
      orient: 'horizontal',
      align: 'right',
      textStyle: {
        color: '#fff'
      }
    }, */
  geo: {
    map: 'china',
    label: {
      emphasis: {
        show: false
      }
    },
    itemStyle: {
      normal: {
        areaColor: '#684711',
        borderColor: '#0C0B0D'
      },
      emphasis: {
        areaColor: '#684711'
      }
    }
  },
  // backgroundColor: '#20203A',
  series: [
    {
      name: '中国',
      type: 'map',
      mapType: 'china',
      label: {
        show: false
      },
      itemStyle: {
        normal: {
          areaColor: '#684711',
          borderColor: '#0C0B0D'
        },
        emphasis: {
          areaColor: '#684711',
          label: {
            show: false
          }
        }
      },
      data: []
    },
    {
      name: 'Top 5',
      type: 'effectScatter',
      coordinateSystem: 'geo',
      data: [],
      symbolSize: function (val) {
        return val[2] / 20;
      },
      showEffectOn: 'render',
      rippleEffect: {
        brushType: 'fill'
      },
      hoverAnimation: true,
      label: {
        normal: {
          formatter: '{b}',
          position: 'right',
          show: false
        }
      },
      itemStyle: {
        normal: {
          color: '#F8AC00',
          shadowBlur: 10,
          shadowColor: '#333'
        }
      },
      zlevel: 1
    }
  ]
};
