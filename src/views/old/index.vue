<template>
  <div id="Content">
    <!-- VUE弹窗 -->
    <div id="aside">
      <!-- 查看病人信息 -->
      <el-card class="box-card" style="width: 250px; height: 350px">
        <div slot="header" class="clearfix">
          <span>图像选择</span>
        </div>
        <div>
          <el-radio-group v-model="radio" size="small" type="vertical">
            <el-radio label="vessel_white">血管分割图</el-radio>
            <el-radio label="vessel_red">血管分叉点图</el-radio>
            <el-radio label="vessel_green">叠加图</el-radio>
            <el-radio label="vessel_centerline">血管中心线</el-radio>
            <el-radio label="vessel_Ater">动静脉图像</el-radio>
            <el-radio label="vessel">图像增强</el-radio>
            <el-radio label="vessel_sbsp">视杯视盘</el-radio>
            <el-radio label="vessel_tangwang">糖网分级</el-radio>
            <el-radio label="pie">患病概率图</el-radio>
          </el-radio-group>
        </div>
      </el-card>
      <!-- 步骤条：下载 上传 -->
      <el-card
        class="box-card"
        body-style="padding: 15px 5px 15px 10px"
        style="width: 250px; height: 500px; margin-top: 50px"
      >
        <div slot="header" class="clearfix" style="text-align: center">
          <span class="steps" style="letter-spacing: 7px">诊断测试步骤</span>
        </div>
      </el-card>
    </div>
    <!-- 上传返回信息部分：原CT图部分  标出眼疾的CT图像 图像特征-->
    <div id="CT">
      <!-- CT图像 -->
      <div id="CT_image">
        <!-- 原CT图 -->
        <el-card
          id="CT_image_1"
          class="box-card2"
          style="
            border-radius: 8px;
            width: 800px;
            height: 360px;
            margin-bottom: -30px;
          "
          :header-style="{
            height: '0px'
          }"
          :body-style="{ width: '800px',
            height: '290px',
            top:'0px',
            position:relative}"
        >
          <div class="demo-image__preview1">

            <el-image
                :src="url_1"
                class="image_1"
                style="border-radius: 3px 3px 0 0;
                "
                :preview-src-list = "[url_1]"
                @click.native="previewPic(url_1)"
              >
                <div slot="error">
                  <div slot="placeholder" class="error">
                     <el-button
                     v-show="showbutton"
                     type="primary"
                     icon="el-icon-upload"
                     class="download_bt"
                     v-on:click="true_upload"
                    >
                      上传CT文件
                      <input
                        ref="upload"
                        style="display: none"
                        name="file"
                        type="file"
                        @change="update"
                      />
                    </el-button>
                  </div>
                </div>
              </el-image>
            <!-- 原CT图文字 -->
            <div class="img_info_1" style="border-radius: 0 0 5px 5px">
              <span style="color: white; letter-spacing: 6px">眼底彩照原图</span>
            </div>
          </div>
          <!-- 标出眼疾的CT图像 -->
          <div class="demo-image__preview2">

            <el-image
              :src="pic_list[radio]"
              class="image_1"

              style="border-radius: 3px 3px 0 0"
              @click.native="previewPic(pic_list[radio])"
            >
              <div slot="error">
                <div slot="placeholder" class="error">{{ wait_return }}</div>
              </div>
            </el-image>

            <!-- 标出眼疾的CT图像文字 -->
            <div class="img_info_1" style="border-radius: 0 0 5px 5px">
              <span style="color: white; letter-spacing: 4px"
                >{{name_list[radio]}}</span
              >
            </div>
          </div>
        </el-card>
      </div>
      <div id="info_patient">
        <!-- 卡片放置表格 -->
        <el-card style="border-radius: 8px">
          <div slot="header" class="clearfix">
            <span>眼疾区域特征值</span>
          </div>
              <!-- 表格存放特征值 -->
          <el-table
            :data="feature_list"
            height="390"
            border
            style="width: 750px; text-align: center"
            v-loading="loading"
            element-loading-text="数据正在处理中，请耐心等待"
            element-loading-spinner="el-icon-loading"
            lazy
          >
            <el-table-column prop="1" label="Feature" width="250px">
              <template slot-scope="scope">
                <span>{{ scope.row[2] }}</span>
              </template>
            </el-table-column>
            <!-- 特征名 -->
            <el-table-column prop="2" label="特征名" width="250px">
              <template slot-scope="scope">
                <span>{{ scope.row[0] }}</span>
              </template>
            </el-table-column>

            <!-- 特征值 -->
            <el-table-column prop="3" label="特征值" width="250px">
              <template slot-scope="scope">
                <span>{{ scope.row[1] }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" :modal="false" title="预览" width="50%" v-if="previewpic!=''">
      <img :src="previewpic" alt=""  width="100%" />
      <span slot="footer" class="dialog-footer">
        </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Content',
  data () {
    return {
      radio: 'vessel_white',
      showbutton: true,
      feature_list: [],
      url_1: '',
      url_2: '',
      srcList: [],
      dialogVisible: false,
      previewpic: '',
      name_list: {
        'vessel_white': '血管分割图',
        'vessel_red': '血管分叉点图',
        'vessel_green': '血管分叉混合点图',
        'vessel_centerline': '血管中心线图',
        'vessel_Ater': '动静脉图',
        'vessel': '图像增强',
        'vessel_sbsp': '视杯视盘',
        'vessel_tangwang': '糖网分级',
        'pie': '患病概率图'
      },
      nl: ['vessel_white', 'vessel_red', 'vessel_green', 'vessel_centerline', 'vessel_Ater', 'vessel', 'vessel_sbsp', 'vessel_tangwang', 'pie'],
      pic_list: {},
      server_url: 'http://127.0.0.1:5000'
    }
  },
  created: function () {
    document.title = '眼疾辅助诊断系统'
  },
  mounted () {
    this.$http.get('/data.json').then((res) => {
      this.data = res.data
      this.data.forEach((item) => {
        this.srcList.push(item.pic)
      })
    })
  },
  methods: {
    previewPic (url) {
      this.previewpic = url
      this.dialogVisible = true
    },
    true_upload () {
      this.$refs.upload.click()
    },
    true_upload2 () {
      this.$refs.upload2.click()
    },
    update (e) {
      let self = this
      let file = e.target.files[0]
      let param = new FormData()
      param.append('file', file, file.name)
      console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
      let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      axios
        .post(this.server_url + '/uploads', param, config)
        .then(res => {
          this.showbutton = false
          this.url_1 = 'http://127.0.0.1:5000/tmp/' + res.data.path['raw']
          for (let i = 0; i < 9; i++) {
            this.pic_list[this.nl[i]] = 'http://127.0.0.1:5000/tmp/' + this.nl[i] + '.png'
          }
          this.feature_list = [['Feature_out_tor', res.data.info['Feature_out_tor'], '弯曲度特征'],
            ['Feature_out_VAD', res.data.info['Feature_out_VAD'], 'VAD特征'],
            ['Feature_out_VLD', res.data.info['Feature_out_VLD'], 'VLD特征'],
            ['Feature_out_FD', res.data.info['Feature_out_FD'], 'FD特征'],
            ['tangwang_res', res.data.info['tangwang_res'], '糖网检测结果']
          ]
        })
    }
  }

}
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
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
  width: 680px;
  height: 260px;
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
  padding: 0px auto;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04); */
  margin-right: 180px;
  margin-bottom: 0px;
  border-radius: 4px;
}

#CT_image {
  margin-bottom: 60px;
  margin-left: 30px;
  margin-top: 5px;
}

.image_1 {
  width: 275px;
  height: 260px;
  background: #ffffff;
  top:40px;
  position: absolute;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.09);
}

.img_info_1 {
  height: 30px;
  width: 275px;
  text-align: center;
  top: 300px;
  position: absolute;
  background-color: #21b3b9;
  line-height: 30px;
}

.demo-image__preview1 {
  width: 275px;
  height: 290px;
  margin-left: 60px;
  top: 20px;
  position: absolute;
  float: left;
}

.demo-image__preview2 {
  width: 275px;
  height: 290px;
  margin-left: 460px;
  top: 20px;
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

#aside {
  width: 25%;
  background-color: #ffffff;
  padding: 30px;
  margin-right: 80px;
  /* background-color: RGB(239, 249, 251); */
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04); */
  height: 800px;
}

.divider {
  background-color: #eaeaea !important;
  height: 2px !important;
  width: 100%;
  margin-bottom: 50px;
}

.divider_1 {
  background-color: #ffffff;
  height: 2px !important;
  width: 100%;
  margin-bottom: 20px;
  margin: 20px auto;
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

.step_1 {
  /*color: #303133 !important;*/
  margin: 20px 26px;
}

#info_patient {
  margin-top: 10px;
  margin-right: 160px;
}
</style>
