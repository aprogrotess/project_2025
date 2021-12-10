<template>
  <div id="content">
    <el-dialog width="30%" :visible.sync="dialogVisible" :before-close="handleClose">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="1"
        style="text-align:center;"
        layout=" prev, pager, next"
        :total="3">
      </el-pagination>
      <page1 v-show="currentPage1===1"></page1>
      <page2 v-show="currentPage1===2"></page2>
      <page3 v-show="currentPage1===3"></page3>
    </el-dialog>
    <div id="base">
      <div>
        <el-card
          id="CT_image_1"
          class="box-card1"
          style="
          border-radius: 8px;
          width: 840px;
          height: 300px;
          margin-bottom: 30px;
        "
          :header-style="{
          height: '60px'
        }"
          :body-style="{ position:absolute,
          left:'91px',
          top:'29px',
          width:'812px',
          height:'225px'}"
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
          <div class="demo-image__preview1">
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
          <div class="demo-image__preview2">
            <el-image
              :src="rurl[1]"
              class="image_1"
              style="border-radius: 3px 3px 0 0;
                "
              :preview-src-list = "[rurl[1]]"
              @click="preview()"
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
          <div class="demo-image__preview3">
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
          <div class="demo-image__preview4">
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
          <div class="demo-image__preview5">
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
        </el-card>
      </div>
      <div>
        <el-card
          id="CT_image_2"
          class="box-card2"
          style="
          border-radius: 8px;
          width: 840px;
          height: 520px;
          margin-bottom: -30px;
        "
          :header-style="{
          height: '60px'
        }"
          :body-style="{ position:absolute,
          left:'91px',
          width:'812px',
          height:'300px'}"
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
          <div class="demo1">
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
          </div>
          <div class="st">
            <div id="prob" style="width: 420px;
             height: 200px;
             fontSize:25px;
             padding-left:5px" ></div>
          </div>
          <div class="num">
            <div id="num" :style="{width: '450px', height: '200px',fontSize:'25px'}" ></div>
          </div>
        </el-card>
      </div>
    </div>
    <div id="aside">
      <el-card class="box-card"
               :header-style="{
            height: '60px'
          }"
               style="{
          width:100px;
          left:900px;
          height: 830px;
          margin-top:0px;
          position:absolute;
          }">
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
    </div>
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

        },
        toolbox: {
          show: false,
          top: 10,
          right: 10,
          feature: {
            mark: { show: false },
            magicType: { show: false, type: ['line', 'bar'] },
            restore: { show: false },
            saveAsImage: { show: false }
          }
        },
        grid: { // 调整统计图上下左右边距
          top: 80,
          right: 70,
          bottom: 50,
          left: 75
        },
        legend: {
          show: 'true',
          top: 45, // 统计图两个方块到Title的距离
          data: ['病灶个数(个)', '病灶面积(像素点)']
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: ['微血管瘤', '硬性渗出', '出血', '棉绒斑'],
            axisPointer: {
              type: 'shadow'
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#666666'
              }
            },
            axisLine: { // X轴线的颜色
              lineStyle: {
                color: '#D5D5D5',
                width: 2
              }
            }
          }
        ],
        yAxis: [
          {

            splitLine: { // 控制刻度横线的显示
              show: false
            },
            type: 'value',
            // max: 20,
            max: function (value) {
              return value.max + 10
            },
            minInterval: 1,
            // name:"推\n送\n班\n级\n数",
            nameLocation: 'center',
            nameGap: 35,
            nameRotate: 0,
            nameTextStyle: {
              fontSize: 16
            },
            axisLabel: {
              formatter: '{value} ',
              show: true,
              textStyle: {
                color: '#666666'
              }
            },
            axisLine: { // Y轴线的颜色、和轴线的宽度
              lineStyle: {
                color: '#D5D5D5',
                width: 2
              }
            }
          },
          {
            splitLine: {
              show: false
            },
            type: 'value',
            max: function (value) {
              return value.max + 10
            },
            // name:"平\n均\n完\n成\n率",
            nameLocation: 'center',
            nameGap: 50,
            nameRotate: 0,
            minInterval: 1,
            nameTextStyle: {
              fontSize: 16
            },
            axisLabel: {
              formatter: '{value}',
              show: true,
              textStyle: {
                color: '#666666'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#D5D5D5',
                width: 2
              }
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
                formatter: '{c}像素'
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
      axios.post('http://127.0.0.1:5000/med1run', param, config)
        .then(res => {
          this.murl = []
          for (let i = 0; i < 5; i++) {
            this.murl.push(res.data.infol[i])
          }
          this.numl = res.data.numl
          this.probl = res.data.probl
          this.weightl = res.data.weightl
          this.flag = 1
        })
      this.dialogTableVisible = false
      this.loading_bt = false
    }
  }
}
</script>
<style lang="scss" scoped>

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.diag{
  font-size: 20px;
  line-height: 1.6;
  text-align: justify;
  text-indent: 2em;
}
#hello p {
  font-size: 15px !important;
  /*line-height: 25px;*/
}
.n1 .el-step__description {
  padding-right: 20%;
  font-size: 14px;
  line-height: 20px;
  /* font-weight: 400; */
}
.el-button {

  top: 120px;
  left: 70px;
  position: absolute;
}
.dialog_info {
  margin: 20px auto;
}
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.el-card__body{
  width: 680px;
  height: 260px;
  border-radius: 8px;
  margin-top: -20px;
}
.clearfix:after {
  clear: both;
}
.box-card {
  width: 180px;
  height: 300px;
  border-radius: 8px;
  margin-top: -20px;
}
.box-card2 {
  width: 800px;
  height: 360px;
  border-radius: 8px;
  margin-top: -20px;
}
.divider {
  width: 50%;
}
#CT {
  display: flex;
  height: 100%;
  width: 70%;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  margin-right: 0px;
  max-width: 1200px;
  /* background-color: RGB(239, 249, 251); */
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04); */
}
#CT_image_1 {
  width: 90%;
  height: 40%;
  /* background-color: RGB(239, 249, 251); */
  margin: 0px auto;
  padding: 0px;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04); */
  margin-right: 180px;
  margin-bottom: 0px;
  left:0px;
  border-radius: 4px;
}
#CT_image {
  margin-bottom: 60px;
  margin-left: 30px;
  margin-top: 5px;
}
.image_1 {
  width: 130px;
  height: 130px;
  background: #ffffff;
  top:40px;
  position: absolute;
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

.demo-image__preview1 {
  width: 130px;
  height: 130px;
  margin-left: 30px;
  top: 120px;
  position: absolute;
  float: left;
}
.demo-image__preview2 {
  width: 130px;
  height: 130px;
  margin-left: 180px;
  top: 120px;
  position: absolute;
  /* background-color: green; */
}
.demo-image__preview3 {
  width: 130px;
  height: 130px;
  margin-left: 330px;
  top: 120px;
  position: absolute;
  /* background-color: green; */
}
.demo-image__preview4 {
  width: 130px;
  height: 130px;
  margin-left: 480px;
  top: 120px;
  position: absolute;
  /* background-color: green; */
}
.demo-image__preview5 {
  width: 130px;
  height: 130px;
  margin-left: 630px;
  top: 120px;
  position: absolute;
  /* background-color: green; */
}
.demo1 {
  width: 240px;
  height: 300px;
  margin-left: 20px;
  margin-top: 0px;
  position: absolute;
  float: left;
}
.demo2 {
  width: 130px;
  height: 130px;
  margin-left: 180px;
  margin-top: 0px;
  position: absolute;
  /* background-color: green; */
}
.demo3 {
  width: 130px;
  height: 130px;
  margin-left: 330px;
  margin-top: 0px;
  position: absolute;
  /* background-color: green; */
}
.demo4 {
  width: 130px;
  height: 130px;
  margin-left: 480px;
  margin-top: 0px;
  position: absolute;
  /* background-color: green; */
}
.demo5 {
  width: 130px;
  height: 130px;
  margin-left: 630px;
  margin-top: 0px;
  position: absolute;
  /* background-color: green; */
}
.st {
  margin-left: 350px;
  margin-top: 0px;
  width:260px;
  position: absolute;
  float: left;
  background: #ffffff;
}
.num {
  margin-left: 330px;
  margin-top: 180px;
  position: absolute;
  float: left;
  background: #ffffff;
}
.st1 {
  width: 130px;
  height: 130px;
  margin-left: 30px;
  margin-top: 150px;
  position: absolute;
  float: left;
}
.st2 {
  width: 130px;
  height: 130px;
  margin-left: 180px;
  margin-top: 150px;
  position: absolute;
  /* background-color: green; */
}
.st3 {
  width: 130px;
  height: 130px;
  margin-left: 330px;
  margin-top: 150px;
  position: absolute;
  /* background-color: green; */
}
.st4 {
  width: 130px;
  height: 130px;
  margin-left: 480px;
  margin-top: 150px;
  position: absolute;
  /* background-color: green; */
}
.st5 {
  width: 130px;
  height: 130px;
  margin-left: 630px;
  margin-top:150px;
  position: absolute;
  /* background-color: green; */
}
.error {
  margin: 100px 50px auto;
  width: 50%;
  padding: 10px;
  text-align: center;
}
.block-sidebar {
  position: fixed;
  display: none;
  left: 50%;
  margin-left: 600px;
  top: 350px;
  width: 60px;
  z-index: 99;
}
.block-sidebar .block-sidebar-item {
  font-size: 50px;
  color: lightblue;
  text-align: center;
  line-height: 50px;
  margin-bottom: 20px;
  cursor: pointer;
  display: block;
}
div {
  display: block;
}
.block-sidebar .block-sidebar-item:hover {
  color: #187aab;
}
.download_bt {
  padding: 10px 16px !important;
}
#upfile {
  width: 104px;
  height: 45px;
  background-color: #187aab;
  color: #fff;
  text-align: center;
  line-height: 45px;
  border-radius: 3px;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.1), 0 2px 2px 0 rgba(0, 0, 0, 0.2);
  color: #fff;
  font-family: "Source Sans Pro", Verdana, sans-serif;
  font-size: 0.875rem;
}
.file {
  width: 200px;
  height: 130px;
  position: absolute;
  left: -20px;
  top: 0;
  z-index: 1;
  -moz-opacity: 0;
  -ms-opacity: 0;
  -webkit-opacity: 0;
  opacity: 0; /*css属性&mdash;&mdash;opcity不透明度，取值0-1*/
  filter: alpha(opacity=0);
  cursor: pointer;
}
#upload {
  position: relative;
  margin: 0px 0px;
}
#download {
  padding: 0px;
  margin: 0px 0px;
}
.patient {
  margin: 50px auto;
  margin-bottom: 100px;
  /* margin-right: 100px; */
  background-color: #187aab;
  border-radius: 5px;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.1), 0 2px 2px 0 rgba(0, 0, 0, 0.2);
  color: #fff;
  font-family: "Source Sans Pro", Verdana, sans-serif;
  font-size: 0.875rem;
  line-height: 1;
  padding: 0.75rem 1.5rem;
}
#Content {
  width: 85%;
  height: 800px;
  background-color: #ffffff;
  margin: 15px auto;
  display: flex;
  min-width: 1200px;
  /* border: 1px solid #e4e7ed; */
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04); */
}
#base {
  width: 80%;
  background-color: #ffffff;
  padding: 30px;
  margin-right: 80px;
  /* background-color: RGB(239, 249, 251); */
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04); */
  height: 900px;
  display: flex;
  flex-direction:column;
}
#aside {
  width: 20%;
  background-color: #ffffff;
  padding: 30px;
  margin-right: 80px;
  /* background-color: RGB(239, 249, 251); */
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04); */
  height: 900px;
}
#content {
  width: 85%;
  height: 800px;
  background-color: #ffffff;
  margin: 15px auto;
  display: flex;
  min-width: 1200px;
  /* border: 1px solid #e4e7ed; */
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04); */
}
.download_bt {
  padding: 10px 16px !important;
}
.steps {
  font-family: "lucida grande", "lucida sans unicode", lucida, helvetica,
  "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  color: #21b3b9;
  text-align: center;
  margin: 15px auto;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}
</style>
