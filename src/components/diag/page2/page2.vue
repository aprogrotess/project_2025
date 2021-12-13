<template>
  <div class="page2">
    <el-row :gutter="40">
      <el-col>
        <el-image class="product-info__image" :src="require('@/assets/images/dia_p.png')" >
        </el-image>
        <div class="right_body_text">
          <p class="product-info__outline">基于眼底彩照</p>
          <div>
            <span class="num">1</span>
            糖尿病视网膜病变分级和病灶检测
          </div>
          <div>
            <span class="num">2</span>
            青光眼识别
          </div>
          <div>
            <span class="num">3</span>
            黄斑中心定位和黄斑病变识别
          </div>
          <div>
            <span class="num">4</span>
            血管分割
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'page2'
}

</script>
<style lang="scss" scoped>
.num{
  display: inline-block;
  text-align: center;
  color: #fff;
  background-color: #ff9b00;
  margin-top: 6px;
  margin-right: 0.2rem;
  width: 30px;
  height: 20px;
  border-radius: 0.16rem;
  font-size: 15px;
  font-weight: 700;

}
.right_body_text{
  display: flex;
  align-items: flex-start;
  -webkit-box-align: start;
  flex-direction:column;
}
.diag{
  font-size: 20px;
  line-height: 1.6;
  text-align: justify;
  text-indent: 2em;
}
.product-info__image{
  background-repeat:no-repeat;
  background-position:top;
  text-align: left;
}
.product-info__outline{
  font-size: 30px;
  font-weight:400;
  color:#131313;
  margin-top:10px;
  margin-bottom:0.33333rem;
  text-align: left;
  font-weight:bolder;
}
.product-info__describe{
  font-size: 20px;
  text-align: left;
}
</style>
