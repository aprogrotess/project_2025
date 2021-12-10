<template>
  <div class="page1">
    <el-row :gutter="40" type="flex">
      <el-col>
        <el-card class="card">
          <el-image class="product-info__image" :src="require('@/assets/images/icon2.png')" >
          </el-image>
          <p class="product-info__outline">致盲眼病AI筛查与评估</p>
          <p class="product-info__describe">糖尿病视网膜病变、青光眼、黄斑变性等高致盲性疾病的快速筛查与智能评估</p>
        </el-card>
      </el-col>
      <el-col>
        <el-card class="card">
          <el-image class="product-info__image" :src="require('@/assets/images/icon1.png')" >
          </el-image>
          <p class="product-info__outline">智能影像管理</p>
          <p class="product-info__describe">可对接各类主流眼科设备，如眼底彩照、OCT、荧光造影等，实现眼科数据与影像的智能管理</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'page1'
}

</script>
<style lang="scss" scoped>
.card{
  display: flex;
  align-items: flex-start;
  -webkit-box-align: start;
  flex-direction:column;
  text-align:center;
}
.product-info__image{
  vertical-align:middle;

  display:inline-block
}
.product-info__outline{
  font-size: 20px;
  font-weight:400;
  color:#131313;
  margin-top:10px;
  margin-bottom:0.33333rem;
  text-align: center;
  font-weight:bolder;
}
.product-info__describe{
  text-align: center;
}
</style>
