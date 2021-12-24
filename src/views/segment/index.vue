<template>
  <div class="seg">
    <el-row class="image_row">
      <el-col class="col">
        <el-card class="line1" flex:4>
          <div slot="header" class="clearfix">
            <span class="steps" style="letter-spacing: 7px">图源</span>
          </div>
          <el-row class="body"  >
            <el-col class="dd">
              <div class="demo-image__preview">
                <el-image
                  :src="url_test"
                  class="image_1"
                  style="border-radius: 3px 3px 0 0;
                      "
                  :preview-src-list = "[url_test]"
                >
                  <div slot="error">
                    <div slot="placeholder" class="error"></div>
                  </div>
                </el-image>
              </div>
              <div class="info_1">
                    <span style="color:white; letter-spacing: 4px; padding-bottom: 0"
                    >原始图片</span
                    >
              </div>
            </el-col>
            <el-col class="dd">
              <div class="demo-image__preview">
                <el-image
                  :src="url_test"
                  class="image_1"
                  style="border-radius: 3px 3px 0 0;
                      "
                  :preview-src-list = "[url_test]"
                >
                  <div slot="error">
                    <div slot="placeholder" class="error"></div>
                  </div>
                </el-image>

              </div>
              <div class="info_1">
                  <span style="color: white; letter-spacing: 4px; padding-bottom: 0"
                  >增强图片</span
                  >
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col class="col">
        <el-card class="line2" flex:4>
          <div slot="header" class="clearfix">
            <span class="steps" style="letter-spacing: 7px">处理结果</span>
          </div>
          <el-row class="body"  >
            <el-col class="dd">
              <div class="demo-image__preview">
                <el-image
                  :src="url_test"
                  class="image_1"
                  style="border-radius: 3px 3px 0 0;
                      "
                  :preview-src-list = "[url_test]"
                >
                  <div slot="error">
                    <div slot="placeholder" class="error"></div>
                  </div>
                </el-image>
              </div>
              <div class="info_1">
                    <span style="color: white; letter-spacing: 4px; padding-bottom: 0"
                    >分割叠加图</span
                    >
              </div>
            </el-col>
            <el-col class="dd">
              <div class="demo-image__preview">
                <el-image
                  :src="url_test"
                  class="image_1"
                  style="border-radius: 3px 3px 0 0;
                      "
                  :preview-src-list = "[url_test]"
                >
                  <div slot="error">
                    <div slot="placeholder" class="error"></div>
                  </div>
                </el-image>

              </div>
              <div class="info_1">
                  <span style="color: white; letter-spacing: 4px; padding-bottom: 0"
                  >分类叠加图</span>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="stat_row">
      <el-col class="col2">
        <el-card class="line1">
          <div slot="header" class="clearfix">
            <span class="steps" style="letter-spacing: 7px">结果二</span>
          </div>
          <el-row class="body">
            <el-col class="dd2">
              <el-row class="pic">
                <div class="demo-image__preview">
                  <el-image
                    :src="url_test"
                    class="image_1"
                    style="border-radius: 3px 3px 0 0;
                        "
                    :preview-src-list = "[url_test]"
                  >
                    <div slot="error">
                      <div slot="placeholder" class="error"></div>
                    </div>
                  </el-image>
                </div>
                <div class="info_1">
                      <span style="color:white; letter-spacing: 4px; padding-bottom: 0"
                      >原始图片</span
                      >
                </div>
              </el-row>
              <el-row class="pic">
                <div class="demo-image__preview">
                  <el-image
                    :src="url_test"
                    class="image_1"
                    style="border-radius: 3px 3px 0 0;
                      "
                    :preview-src-list = "[url_test]"
                  >
                    <div slot="error">
                      <div slot="placeholder" class="error"></div>
                    </div>
                  </el-image>
                </div>
                <div class="info_1">
                  <span style="color: white; letter-spacing: 4px; padding-bottom: 0"
                  >增强图片</span
                  >
                </div>
              </el-row>
            </el-col>
            <el-col class="table">
              <el-table
                :data="feature_list"
                border
                style=" text-align: center"
                v-loading="loading"
                element-loading-text="数据正在处理中，请耐心等待"
                element-loading-spinner="el-icon-loading"
                lazy
              >
                <el-table-column prop="1" label="Feature">
                  <template slot-scope="scope">
                    <span>{{ scope.row[2] }}</span>
                  </template>
                </el-table-column>
                <!-- 特征名 -->
                <el-table-column prop="2" label="特征名">
                  <template slot-scope="scope">
                    <span>{{ scope.row[0] }}</span>
                  </template>
                </el-table-column>
                <!-- 特征值 -->
                <el-table-column prop="3" label="特征值">
                  <template slot-scope="scope">
                    <span>{{ scope.row[1] }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
            <el-col class="charts">
              <ve-histogram :title="title" :data="data"></ve-histogram>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import VeLine from 'v-charts/lib/line.common'
import VeRing from 'v-charts/lib/ring.common'
import VeHistogram from 'v-charts/lib/histogram.common'

import Vue from 'vue'

import { registerAllModules } from 'handsontable/registry';
registerAllModules();
import Plugin from 'v-fit-columns';
Vue.use(Plugin);
Vue.component(VeLine.name, VeLine)
Vue.component(VeRing.name, VeRing)
Vue.component(VeHistogram.name, VeHistogram)
export default {
  data () {
    return {
      props: {
        tripe: true,
        border: true,
        showHeader: true,
        showSummary: false,
        showRowHover: true,
        showIndex: false,
        treeType: true,
        isFold: true,
        expandType: false,
        selectionType: false,
        stripe: false
      },
      data:{
        columns:['姓名', '资产'],
        rows:[{'姓名':'蛋尼', '资产':20},
          {'姓名':'张飞', '资产':30},
          {'姓名':'关羽', '资产':40},
          {'姓名':'刘备', '资产':60},
          {'姓名':'尼古拉斯', '资产':26},]
      },
      title:{
        text: '个人资产',
        textStyle: {color:'darkgray'}
      },
      columns: [
        {
          title: 'name',
          key: 'name',
          width: '400px'
        },
        {
          title: 'sex',
          key: 'sex',
          minWidth: '50px'
        },
        {
          title: 'score',
          key: 'score'
        },
        {
          title: 'likes',
          key: 'likes',
          minWidth: '200px',
          type: 'template',
          template: 'likes'
        }
      ],
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' },
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%',
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%',
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%',
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%',
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%',
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%',
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%',
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%',
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%',
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%',
        },
      ],
      chartData: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
          { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
          { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
          { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
          { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
          { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
        ]
      },
      probl: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]],
      numl: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
      weightl:w [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
      radio: 'normal',
      tmp: '上传图片',
      rurl: ['', '', '', '', ''],
      link_dic: {
        'normal': 0,
        'first': 1,
        'second': 2,
        'third': 3,
        'forth': 4
      },
      url_test: 'https://imagej.net/media/plugins/vessel-analysis-rgb.png'
    }
  },
  activated () {
    this.init()
  },
  mounted () {
    // 在mounted生命周期或方法中执行下述代码
    this.drawprob()
    this.drawnum()
  },
  methods: {
    drawprob () {
      let prob = this.$echarts.init(document.getElementById('prob'))
      // 绘制图表
      // eslint-disable-next-line camelcase
      let option_prob = {
        title: { text: '患病概率图' },
        tooltip: {},
        xAxis: {
          data: ['正常', '一级', '二级', '三级', '四级']
        },
        yAxis: {
          type: 'value',
          max: 100,
          axisLabel: {
            show: true,

            interval: 'auto',
            formatter: function (value, index) {
              return value + '%'
            }
          },
          name: '概率（%）',
          show: true },
        series: [{
          name: '概率',
          type: 'bar',
          data: this.probl[this.link_dic[this.radio]],
          label: {
            normal: {
              show: true,
              position: 'top',
              formatter: '{c}%'
            }
          }
        }]
      }
      // eslint-disable-next-line eqeqeq
      prob.resize()
      prob.setOption(option_prob, true)
      console.log('prob_painted')
    },
    drawnum () {
      let num = this.$echarts.init(document.getElementById('num'))
      // 绘制图表
      // eslint-disable-next-line camelcase
      let option_num = {
        title: {
          text: '病灶数量与面积'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'cross' }
        },
        legend: {
          show: 'true',
          top: 25, // 统计图两个方块到Title的距离
          data: ['病灶个数(个)', '病灶面积(像素点)']
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: ['微血管瘤', '硬性渗出', '出血', '棉绒斑'],
            axisLabel: {
              show: true,
              textStyle: {
                color: '#000000'
              }
            },
            axisLine: { // X轴线的颜色
              lineStyle: {

              }
            }
          }
        ],
        yAxis: [
          {
            name: '个数',
            type: 'value',
            position: 'right',
            // max: 20,
            max: function (value) {
              return value.max + 10
            },
            minInterval: 1,
            // name:"推\n送\n班\n级\n数",
            nameTextStyle: {
              fontSize: 12
            },
            axisLabel: {
              formatter: '{value} ',
              show: true
            },
            axisLine: { // Y轴线的颜色、和轴线的宽度
            }
          },
          {
            name: '像素点',
            splitLine: {
              show: false
            },
            type: 'value',
            max: function (value) {
              return value.max + 10
            },
            // name:"平\n均\n完\n成\n率",

            minInterval: 1,
            nameTextStyle: {
              fontSize: 12
            },
            position: 'left',
            axisLabel: {
              formatter: '{value}',
              show: true
            },
            axisLine: {
            }
          }
        ],
        series: [
          {
            name: '病灶个数(个)',
            type: 'bar',
            yAxisIndex: 0,
            data: this.numl[this.link_dic[this.radio]],
            label: {
              normal: {
                show: true,
                position: 'top',
                formatter: '{c}'
              }
            },
            itemStyle: { // 双Y轴A柱的柱体颜色
              normal: {
                color: '#77caff'
              }
            }
          },
          {
            name: '病灶面积(像素点)',
            type: 'bar',
            yAxisIndex: 1,
            data: this.weightl[this.link_dic[this.radio]],
            label: {
              normal: {
                show: true,
                position: 'top',
                formatter: '{c}'
              }
            },
            itemStyle: { // 双Y轴B柱的柱体颜色
              normal: {
                color: '#ffae82'
              }
            }
          }
        ]
      }
      // eslint-disable-next-line eqeqeq
      num.resize()
      num.setOption(option_num, true)
      console.log('num_painted')
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~styles/common.scss';
.pic{
  display: flex;
  flex-direction:column;
  margin-bottom: 6%;
}
.seg{
  display: flex;
  flex-direction:column;
}
.col{
  flex-basis: 43%;
}
.col2{
  flex-basis: 90%;
}
.pic_col{
  width: 60%;
  display: flex;
  flex-direction:column;
  justify-content:space-around;
  align-items: center;
}
.image_row{
  display: flex;
  flex-direction:row;
  flex-wrap: nowrap;
  justify-content:space-around;
  margin-bottom: 20px;
}
.stat_row{
  display: flex;
  flex-direction:row;
  flex-wrap: nowrap;
  justify-content:space-around;
  margin-bottom: 20px;
}
.dd{
  width: 100%;
  display: flex;
  flex-direction:column;
  align-items:center;
}
.dd2{
  display: flex;
  flex-direction:column;
  flex-basis: 55%;
  margin-left: 5%;
}
.table{
  flex-basis: 80%;
}
.body{
  display: flex;
  flex-direction:row;
  flex-wrap: nowrap;
  justify-content:space-around;
  align-items: flex-start;
}
.sta_body{
  align-items:center;
  display: flex;
  flex-direction:row;
  flex-wrap: nowrap;
  justify-content:space-around;
  align-content: center;
}
.demo-image__preview {
  width: 60%;
  aspect-ratio: 1 / 1;
  float: left;
  text-align: center;
  align-content: center;
  display: flex;
  flex-direction:column;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.09);
}
.image_1 {
  background: #ffffff;
}
.info_1 {
  text-align: center;
  line-height: 30px;
  background-color: #21b3b9;
  width:60%
}
.o-image__preview {
  aspect-ratio: 1 / 1;
  float: left;
  text-align: center;
  align-content: center;
  display: flex;
  flex-direction:column;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.09);
}
.info_2 {
  text-align: center;
  line-height: 30px;
  background-color: #21b3b9;
}
.steps {
  font-family: "lucida grande", "lucida sans unicode", lucida, helvetica,
  "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  color: #21b3b9;
  text-align: center;
  font-weight: bold;
}
.charts {
  flex-basis: 80%;
  align-content: center;
  display: flex;
  flex-direction:column;
  justify-content: center; /* 水平居中 */
}
</style>
