<template>
  <div class="page3">
    <el-row :gutter="40">
      <el-col>
        <p class="product-info__outline">糖尿病视网膜病变筛查与辅助诊断系统demo介绍</p>
        <p class="diag">本系统根据我国中华医学会眼底病学组制定的分级方法，将视网膜病变分为两种类型，一类叫做非增殖性视网膜病变，另外一类叫做增殖性视网膜病变。其中非增殖性视网膜病变可细分为（轻度、中度、重度）三级，不同的级别中各个病灶的类型与数量也会有所差异。</p>
        <p class="diag">主要功能：</p>
        <p class="diag">1.对输入的眼底图像进行分级</p>
        <p class="diag">2.对病灶(包括微血管瘤、出血、硬性渗出、棉絮斑)进行分割获得各个病灶的准确轮廓，并统计病灶个数与面积</p>
        <p class="diag">对眼底影像进行分级有助于对筛查人群是否存在糖尿病视网膜病变以及严重程度有更直观的了解，病灶定位与量化统计可为制定治疗方案提供数据支持。</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'page3',

}

</script>
<style lang="scss" scoped>
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
