//糖网眼底彩照辅助诊断系统
<template>
  <div class="seg">
    <el-row class="image_row">
      <el-col class="col">
        <el-card class="line1" flex:4>
          <div slot="header" class="clearfix">
            <span class="steps" >图源</span>
          </div>
          <el-row class="body"  >
            <el-col class="dd">
              <div class="demo-image__preview">
                <el-image
                  :src="url_raw"
                  class="image_1"
                  style="border-radius: 3px 3px 0 0;"
                  :preview-src-list = "[url_raw]"
                  fit
                >
                  <div slot="error">
                    <div slot="placeholder" class="error">
                      <el-button
                        v-show=true
                        type="primary"
                        class="download_bt"
                        icon="el-icon-upload"
                        v-on:click="true_upload1"
                      >
                        上传图片
                        <input
                          ref="upload"
                          style="display: none"
                          accept="image/png,image/gif,image/jpeg"
                          name="file"
                          type="file"
                          @change="update"
                        />
                      </el-button>
                    </div>
                  </div>
                </el-image>
              </div>
              <div class="info_1">
                <span style="color:white; letter-spacing: 4px; padding-bottom: 0"
                >原始图片</span>
              </div>
            </el-col>
            <el-col class="dd">
              <div class="demo-image__preview">
                <el-image
                  :src="url_enh"
                  class="image_1"
                  style="border-radius: 3px 3px 0 0;"
                  :preview-src-list = "[url_enh]"
                  fit="contain"
                >
                  <div slot="error">
                    <div slot="placeholder" class="error">
                      <el-button
                        style=""
                        v-show=true
                        type="primary"
                        :loading="load"
                        class="download_bt"
                        icon="el-icon-caret-right"
                        v-on:click="enh"
                      >
                        增强图像
                      </el-button>
                    </div>
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
          <div slot="header" class="clearfix2" >
            <span class="steps" style="letter-spacing: 7px">处理结果</span>
            <el-select v-model="radio" style="" placeholder="请选择">
              <el-option label="增强前" value="1"></el-option>
              <el-option label="增强后" value="2"></el-option>
            </el-select>
          </div>
          <el-row class="body">
            <el-col class="dd">
              <div class="demo-image__preview">
                <el-image
                  :src="url_ves[link_dic[radio]]"
                  class="image_1"
                  style="border-radius: 3px 3px 0 0;"
                  :preview-src-list = "url_ves"
                >
                  <div slot="error">
                    <div slot="placeholder" class="error">
                      <el-button
                        v-show=true
                        type="primary"
                        :loading="load"
                        icon="el-icon-caret-right"
                        class="download_bt"
                        v-on:click="vessel_run"
                      >
                        运行模型
                      </el-button>
                    </div>
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
                  :src="url_ss[link_dic[radio]]"
                  class="image_1"
                  style="border-radius: 3px 3px 0 0;
                      "
                  :preview-src-list = "url_ss"
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
            <span class="steps" style="letter-spacing: 7px">病灶分析结果与统计分析</span>
            <el-button
              style=""
              v-show=true
              type="primary"
              :loading="load"
              class="download_bt"
              icon="el-icon-caret-right"
              v-on:click="dr"
            >
              病灶分割
            </el-button>
          </div>
          <el-row class="body">
            <el-col class="pic">
              <div class="o-image__preview">
                <el-image
                  :src="url_dr_raw"
                  class="image_1"
                  style="border-radius: 3px 3px 0 0;"
                  :preview-src-list = "[url_dr_raw]"
                >
                  <div slot="error">
                    <div slot="placeholder" class="error"></div>
                  </div>
                </el-image>
              </div>
              <div class="info_2">
                    <span style="color:white; letter-spacing: 4px; padding-bottom: 0"
                    >原始图片</span
                    >
              </div>
            </el-col>
            <el-col class="pic">
              <div class="o-image__preview">
                <el-image
                  :src="url_dr_enh"
                  class="image_1"
                  style="border-radius: 3px 3px 0 0;
                    "
                  :preview-src-list = "[url_dr_enh]"
                >
                  <div slot="error">
                    <div slot="placeholder" class="error"></div>
                  </div>
                </el-image>
              </div>
              <div class="info_2">
                <span style="color: white; letter-spacing: 4px; padding-bottom: 0"
                >增强图片</span
                >
              </div>
            </el-col>
            <el-col class="tc">
              <el-row class="table">
                <el-table
                  :data="feature_list"
                  border
                  style=" text-align: center"
                  v-loading="loading"
                  element-loading-text="数据正在处理中，请耐心等待"
                  element-loading-spinner="el-icon-loading"
                  lazy
                >
                  //绿色表示相同，红色表示相异
                  <el-table-column prop="2" label="增强状态">
                    <template slot-scope="scope">
                      <span>{{ scope.row[0] }}</span>
                    </template>
                  </el-table-column>
                  <!-- 特征名 -->
                  <!-- 特征值 -->
                  <el-table-column prop="3" label="正常概率">
                    <template slot-scope="scope">
                      <span>{{ scope.row[1] }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="3" label="一级概率">
                    <template slot-scope="scope">
                      <span>{{ scope.row[2] }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="3" label="二级概率">
                    <template slot-scope="scope">
                      <span>{{ scope.row[3] }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="3" label="三级概率">
                    <template slot-scope="scope">
                      <span>{{ scope.row[4] }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="3" label="增殖概率">
                    <template slot-scope="scope">
                      <span>{{ scope.row[5] }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>
              <el-row class="charts">
                <el-col class="chart">
                  <ve-histogram :data="areaData" height="250px"></ve-histogram>
                </el-col>
                <el-col class="chart">
                  <ve-histogram :data="numData" height="250px"></ve-histogram>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import VeHistogram from 'v-charts/lib/histogram.common'
import Vue from 'vue'
import Plugin from 'v-fit-columns'
import axios from 'axios'

// 引入柱状图组件
require('echarts/lib/chart/line')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

Vue.use(Plugin)
Vue.component(VeHistogram.name, VeHistogram)
export default {
  data () {
    return {

      // button loading属性
      ves_load: false,
      enh_load: false,
      dr_load: false,
      load: false,
      // url part
      url_raw: '',
      url_enh: '',
      url_ves: ['', ''], // 分割叠加
      url_ss: ['', ''], // 分类叠加
      url_dr_enh: '',
      url_dr_raw: '',
      url_test: 'https://imagej.net/media/plugins/vessel-analysis-rgb.png',
      server_url: 'http://127.0.0.1:5000',
      // name
      radio: '1',
      tmp: '上传图片',
      link_dic: {
        '1': 0,
        '2': 1
      },
      // chart/table
      feature_list: [],
      areaData: {
        columns: ['种类', '增强前面积', '增强后面积'],
        rows: [
          { '种类': '微血管瘤', '增强前面积': 0, '增强后面积': 0 },
          { '种类': '硬性渗出', '增强前面积': 0, '增强后面积': 0 },
          { '种类': '出血', '增强前面积': 0, '增强后面积': 0 },
          { '种类': '棉絮斑', '增强前面积': 0, '增强后面积': 0 }
        ]
      },
      numData: {
        columns: ['种类', '增强前数量', '增强后数量'],
        rows: [
          { '种类': '微血管瘤', '增强前数量': 0, '增强后数量': 0 },
          { '种类': '硬性渗出', '增强前数量': 0, '增强后数量': 0 },
          { '种类': '出血', '增强前数量': 0, '增强后数量': 0 },
          { '种类': '棉絮斑', '增强前数量': 0, '增强后数量': 0 }
        ]
      }
    }
  },
  activated () {
    this.init()
  },
  mounted () {
    this.init()
    // 在mounted生命周期或方法中执行下述代码
    this.drawprob()
    this.drawnum()
  },
  methods: {
    dr () {
      this.load = true
      let param = new FormData()
      console.log('ill')
      let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      axios
        .post('http://127.0.0.1:5000/seg/ill', param, config)
        .then(
          res => {
            this.url_dr_raw = 'http://127.0.0.1:5000/tmp/seg/dr_r.png'
            this.url_dr_enh = 'http://127.0.0.1:5000/tmp/seg/dr_e.png'
            this.load = false
            this.feature_list = [['增强前', res.data.prob_r[0], res.data.prob_r[1], res.data.prob_r[2], res.data.prob_r[3], res.data.prob_r[4]],
              ['增强后', res.data.prob_e[0], res.data.prob_e[1], res.data.prob_e[2], res.data.prob_e[3], res.data.prob_e[4]]]
            this.areaData = {
              columns: ['种类', '增强前面积', '增强后面积'],
              rows: [
                { '种类': '微血管瘤', '增强前面积': res.data.weight_r[0], '增强后面积': res.data.weight_e[0] },
                { '种类': '硬性渗出', '增强前面积': res.data.weight_r[1], '增强后面积': res.data.weight_e[1] },
                { '种类': '出血', '增强前面积': res.data.weight_r[2], '增强后面积': res.data.weight_e[2] },
                { '种类': '棉絮斑', '增强前面积': res.data.weight_r[3], '增强后面积': res.data.weight_e[3] }
              ]
            }

            this.numData = {
              columns: ['种类', '增强前数量', '增强后数量'],
              rows: [
                { '种类': '微血管瘤', '增强前数量': res.data.count_r[0], '增强后数量': res.data.count_e[0] },
                { '种类': '硬性渗出', '增强前数量': res.data.count_r[1], '增强后数量': res.data.count_e[1] },
                { '种类': '出血', '增强前数量': res.data.count_r[2], '增强后数量': res.data.count_e[2] },
                { '种类': '棉絮斑', '增强前数量': res.data.count_r[3], '增强后数量': res.data.count_e[3] }
              ]
            }
          }
        )
    },
    enh () {
      this.load = true
      let param = new FormData()
      console.log('enhance')
      let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      axios
        .post('http://127.0.0.1:5000/seg/enh', param, config)
        .then(
          res => {
            this.url_enh = 'http://127.0.0.1:5000/tmp/seg/enh.png'
            this.load = false
          }
        )
    },
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
    },
    true_upload1 () {
      this.$refs.upload.click()
    },
    update (e) {
      let file = e.target.files[0]
      let param = new FormData()
      param.append('file', file, file.name)
      // FormData私有类对象，访问不到，可以通过get判断值是否传进去
      console.log(param.get('file'))
      let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      axios
        .post('http://127.0.0.1:5000/upload/seg', param, config)
        .then(
          res => {
            this.url_raw = 'http://127.0.0.1:5000/tmp/seg/raw.png'
            console.log(this.url_raw)
          }
        )
    },
    vessel_run () {
      this.load = true
      let param = new FormData()
      console.log('enhance')
      let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      axios
        .post('http://127.0.0.1:5000/seg/vessel', param, config)
        .then(
          res => {
            this.url_ves = ['http://127.0.0.1:5000/tmp/seg/raw_seg.png', 'http://127.0.0.1:5000/tmp/seg/enh_seg.png']
            this.url_ss = ['http://127.0.0.1:5000/tmp/seg/raw_ater.png', 'http://127.0.0.1:5000/tmp/seg/enh_ater.png']
            this.load = false
          }
        )
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~styles/common.scss';
.clearfix {
  height: 30px;
}
.error {
}
.clearfix2 {
  height: 30px;
  align-items:center;
  display: flex;
  flex-direction:row;
  flex-wrap: nowrap;
  justify-content:space-around;
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
  flex-direction:row;
  flex-basis: 100%;
  align-items:center;
  margin-left: 5%;
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
  width: 80%;
  aspect-ratio: 1 / 1;
  float: left;
  text-align: center;
  align-content: center;
  display: flex;
  flex-direction:column;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.09);
}
.info_1 {
  text-align: center;
  line-height: 30px;
  background-color: #21b3b9;
  width:80%
}
.o-image__preview {
  width: 100%;
  aspect-ratio: 1 / 1;
  float: left;
  text-align: center;
  align-content: center;
  display: flex;
  flex-direction:column;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.09);
}
.info_2 {
  width: 100%;
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
.image_1 {
  width: 100%;
  aspect-ratio: 1 / 1;
  background: #ffffff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.09);
  display: flex;
  justify-content: center;
  align-items:center;
}
.table {
  flex-basis: 30%;
}
.charts {

  display: flex;
  flex-direction:row;
  justify-content: center; /* 水平居中 */
}
.chart {

}
.tc{
  display: flex;
  flex-direction:column;
  justify-content: center; /* 水平居中 */
  flex-basis: 50%;
}
.pic{
  flex-basis: 21%;
  display: flex;
  flex-direction:column;
  margin-right: 3%;
}
</style>
