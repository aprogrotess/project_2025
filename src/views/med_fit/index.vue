<template>
  <div class="dashboard" >
    <el-dialog width="30%" :visible.sync="dialogVisible" :before-close="handleClose" :title="title">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="1"
        style="text-align:center;"
        layout=" prev, pager, next"
        :total="3">
      </el-pagination>
      <div slot="title" class="header-title">
        <img :src="require('@/assets/images/imed_h.png')" style=" display: inline-block;
          height: auto;
          max-width: 100%;">
        <span>{{title}}</span>
      </div>
      <page1 v-show="currentPage1===1"></page1>
      <page2 v-show="currentPage1===2"></page2>
      <page3 v-show="currentPage1===3"></page3>
    </el-dialog>
    <el-dialog width="30%" :visible.sync="diag2_visible" :before-close="handleClose">
      <p style="text-align: center">完成运行</p>
    </el-dialog>
    <el-row class="main" style="flex:7; margin-right: 20px" :gutter="40">
      <el-col style="flex: 4">
        <el-card
          id="CT_image_1"
          class="box-card1"
          style="margin-bottom: 20px;height: 400px"
          :header-style="{
          height: '60px'
        }"
        >
          <div slot="header" class="clearfix">
            <span class="steps" >原始图片</span>
            <el-button
              style="margin-left: 35px;position: relative;top:0px;left:0px"
              v-show=true
              type="primary"
              icon="el-icon-upload"
              class="download_bt"
              v-on:click="true_upload1"
            >
              {{tmp}}
              <input
                ref="upload"
                style="display: none"
                accept="image/png,image/gif,image/jpeg"
                name="file"
                type="file"
                multiple="multiple"
                @change="update"
              />
            </el-button>
          </div>
          <el-row class="body1" :span="12" >
            <div class="demo-image__preview">
              <el-image
                :src="rurl[0]"
                class="image_1"
                style="border-radius: 3px 3px 0 0;
                  "
                :preview-src-list = "[rurl[0]]"
              >
                <div slot="error">
                  <div slot="placeholder" class="error"></div>
                </div>
              </el-image>
              <div class="info_1">
                <span style="color: black; letter-spacing: 4px"
                >患者一</span
                >
              </div>
            </div>
            <div class="demo-image__preview">
              <el-image
                :src="rurl[1]"
                class="image_1"
                style="border-radius: 3px 3px 0 0;
                  "
                :preview-src-list = "[rurl[1]]"
              >
                <div slot="error">
                  <div slot="placeholder" class="error"></div>
                </div>
              </el-image>
              <div class="info_1">
                <span style="color: black; letter-spacing: 4px"
                >患者二</span
                >
              </div>
            </div>
            <div class="demo-image__preview">
              <el-image
                :src="rurl[2]"
                class="image_1"
                style="border-radius: 3px 3px 0 0;
                  "
                :preview-src-list = "[rurl[2]]"
              ><div slot="error">
                <div slot="placeholder" class="error"></div>
              </div>
              </el-image>
              <div class="info_1">
                <span style="color: black; letter-spacing: 4px"
                >患者三</span
                >
              </div>
            </div>
            <div class="demo-image__preview">
              <el-image
                :src="rurl[3]"
                class="image_1"
                style="border-radius: 3px 3px 0 0;
                  "
                :preview-src-list = "[rurl[3]]"
              >
                <div slot="error">
                  <div slot="placeholder" class="error"></div>
                </div>
              </el-image>
              <div class="info_1">
                <span style="color: black; letter-spacing: 4px"
                >患者四</span
                >
              </div>
            </div>
            <div class="demo-image__preview">
            <el-image
              :src="rurl[4]"
              class="image_1"
              style="border-radius: 3px 3px 0 0;
                "
              :preview-src-list = "[rurl[4]]"
            >
              <div slot="error">
                <div slot="placeholder" class="error"></div>
              </div>
            </el-image>
            <div class="info_1">
              <span style="color: black; letter-spacing: 4px"
              >患者五</span
              >
            </div>
          </div>
          </el-row>
        </el-card>
      </el-col>
      <el-col style="flex: 6">
        <el-card
          id="CT_image_2"
          class="box-card2"
          style="margin-bottom: 20px;
          border-radius: 8px;"
          :header-style="{
          height: '60px'
        }"
        >
          <div slot="header" class="clearfix">
            <span class="steps" >处理结果</span>
            <el-button
              style="margin-left: 35px;position: relative;top:0px;left:0px"
              v-show=true
              type="primary"
              :loading="loading_bt"
              icon="el-icon-caret-right"
              class="download_bt"
              v-on:click="run"
            >
              运行模型
            </el-button>
            <el-select v-model="radio" style="margin-left:250px; margin-top:-40px; width: 100px" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <el-col class="body2"  >
            <el-row class="demo1">
              <el-image
                :src="murl[link_dic[radio]]"
                class="image_1"
                style="border-radius: 3px 3px 0 0;
                  width: 240px;
                  height: 240px;
                  "
                :preview-src-list = "[murl[link_dic[radio]]]"
                @click.native.stop="click_test()"
              >
                <div slot="error">
                  <div slot="placeholder" class="error"></div>
                </div>
              </el-image>
              <div class="info_2">
                <span style="color: black; letter-spacing: 4px">病灶分割结果</span>
              </div>
            </el-row>
            <el-row class="charts">
              <div class="st">
                <div id="prob" style="width: 420px;
                 height: 200px;
                 fontSize:25px;
                 padding-left:5px" ></div>
              </div>
              <div class="num">
              <div id="num" :style="{width: '425px', height: '200px',fontSize:'25px'}" ></div>
            </div>
            </el-row>
          </el-col>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="side" style="flex:2">
      <el-card class="box-card"
               :header-style="{
            height: '60px'
          }"
               style="width: 200px;
               height:97%"
          >
        <div slot="header" class="clearfix">
          <span>糖网分级详情</span>
        </div>
        <div>
          <p>正常-无明显视网膜病变：眼底无异常</p>
          <p><br/></p>
          <p>一级-轻度非增殖期：眼底仅见微动脉瘤</p>
          <p><br/></p>
          <p>二级-中度非增殖期：眼底病变介于轻、重度之间</p>
          <p><br/></p>
          <p>三级-重度非增殖期：眼底出现以下任一病变，但尚无PDR期表现：1.四个象限任一象限出现多于20处视网膜内出血2.两个象限以上出现明确的静脉串珠样改变3.一个以上象限出现明显的视网膜内微血管异常。</p>
          <p><br/></p>
          <p>四级-高度增殖期：眼底出现以下一个或以上改变：1.新生血管生成2.玻璃体内出血/视网膜前出血</p>
        </div>
      </el-card>
    </el-row>
  </div>
</template>
<script>
import axios from 'axios'
import Page1 from '@/components/diag/page1'
import Page2 from '@/components/diag/page2'
import Page3 from '@/components/diag/page3'

// eslint-disable-next-line no-unused-vars
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/line')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  name: 'Content',
  components: {
    Page1,
    Page2,
    Page3
  },
  data () {
    return {
      diag2_visible: false,
      showViewer: false,
      currentPage1: 1,
      url_tmp: 'http://www.zj.xinhuanet.com/edu/txcj.htm',
      dia_url: ['http://www.zj.xinhuanet.com/edu/txcj.htm', 'https://www.csdn.net/', 'https://blog.csdn.net/super111t/article/details/121657898?spm=1000.2115.3001.5927'],
      diag_num: 0,
      dialogVisible: true,
      loading_bt: false,
      percentage: 0,
      dialogTableVisible: true,
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
      murl: [],
      st: [],
      a1: 0,
      a2: 0,
      a3: 0,
      a4: 0,
      a5: 0,
      flag: 0,
      options: [{
        value: 'normal',
        label: '患者1'
      }, {
        value: 'first',
        label: '患者2'
      }, {
        value: 'second',
        label: '患者3'
      }, {
        value: 'third',
        label: '患者4'
      }, {
        value: 'forth',
        label: '患者5'
      }],
      probl: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]],
      numl: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
      weightl: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
    }
  },
  activated () {
    this.init()
    this.drawprob()
    this.drawnum()
  },
  mounted () {
    // 在mounted生命周期或方法中执行下述代码
    this.drawprob()
    this.drawnum()
  },
  computed: {},
  watch: {
    flag (val, oldVal) {
      this.drawnum()
      this.drawprob()
      console.log('flag change')
    },
    radio (val, oldVal) {
      this.drawnum()
      this.drawprob()
    }
  },
  methods: {
    click_test () {
      console.log('test_success')
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    dia_for () {
      console.log(this.url_tmp)
      if (this.diag_num < 2) {
        this.diag_num = this.diag_num + 1
        this.url_tmp = this.dia_url[this.diag_num]
        console.log(this.url_tmp)
      }
    },
    dia_back () {
      if (this.diag_num > 0) {
        this.diag_num = this.diag_num - 1
        this.url_tmp = this.dia_url[this.diag_num]
      }
    },
    drawprob () {
      let prob = this.$echarts.init(document.getElementById('prob'))
      // 绘制图表
      // eslint-disable-next-line eqeqeq

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
      let test_op = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'cross' }
        },
        legend: {},
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            data: [
              '1月',
              '2月',
              '3月',
              '4月',
              '5月',
              '6月',
              '7月',
              '8月',
              '9月',
              '10月',
              '11月',
              '12月'
            ]
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '降水量',
            min: 0,
            max: 250,
            position: 'right',
            axisLabel: {
              formatter: '{value} ml'
            }
          },
          {
            type: 'value',
            name: '温度',
            min: 0,
            max: 25,
            position: 'left',
            axisLabel: {
              formatter: '{value} °C'
            }
          }
        ],
        series: [
          {
            name: '降水量',
            type: 'bar',
            yAxisIndex: 0,
            data: [6, 32, 70, 86, 68.7, 100.7, 125.6, 112.2, 78.7, 48.8, 36.0, 19.3]
          },
          {
            name: '温度',
            type: 'line',
            smooth: true,
            yAxisIndex: 1,
            data: [
              6.0,
              10.2,
              10.3,
              11.5,
              10.3,
              13.2,
              14.3,
              16.4,
              18.0,
              16.5,
              12.0,
              5.2
            ]
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
      this.tmp = '重新上传'
      // eslint-disable-next-line no-unused-vars
      let self = this
      let files = e.target.files
      let param = new FormData()
      let num = files.length
      this.testpage = []
      for (let i = 0; i < files.length; i++) {
        param.append('files' + i, files[i])
        var json = {
          id: i + 1,
          pic: files[i].name
        }
        this.testpage.push(json)
      }
      param.append('chunk', num + '') // 添加form表单中其他数据
      console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
      let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      axios.post('http://127.0.0.1:5000/med1', param, config)
        .then(res => {
          this.rurl = []
          for (let i = 0; i < files.length; i++) {
            this.rurl.push(res.data.ul[i])
          }
        })
    },
    run () {
      this.loading_bt = true
      this.dialogTableVisible = true
      let param = new FormData()
      param.append('ul', this.rurl)
      // eslint-disable-next-line no-unused-vars
      let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      axios.post('http://127.0.0.1:5000/med1run_fake', param, config)
        .then(res => {
          this.murl = []
          for (let i = 0; i < 5; i++) {
            this.murl.push(res.data.infol[i])
          }
          this.numl = res.data.numl
          this.probl = res.data.probl
          this.weightl = res.data.weightl
          this.flag = 1
          this.loading_bt = false
          this.diag2_visible = true
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.body2{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.body1{
  display: flex;
  flex-wrap: wrap;//允许换行排列
  flex-direction: row;
  justify-content: space-around;
}
.demo-image__preview {
  width: 130px;
  height: 130px;
  top: 120px;
  float: left;
}
.main{
  display: flex;
  flex-wrap: wrap;//允许换行排列
  flex-direction: column;
  justify-content: space-around;
}
.image_1 {
  width: 130px;
  height: 130px;
  background: #ffffff;
  top:40px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.09);
}
.info_1 {
  height: 30px;
  width: 130px;
  text-align: center;
  top: 180px;
  position: absolute;
  background-color: #ffffff;
  line-height: 30px;
}
.info_2 {
  height: 30px;
  width: 240px;
  text-align: center;
  top: 310px;
  position: absolute;
  background-color: #ffffff;
  line-height: 30px;
}
.dashboard {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC,
  Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial,
  sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  display: flex;
  flex-direction: row;
}
</style>
