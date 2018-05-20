<template>
 <div class="help">
   <div class="rules">
     <div class="title">
       游戏规则
     </div>
     <div class="info">
       <p>1. 发起竞猜可以选择5-10个竞猜选项。比如：发起5个选项的竞猜，则竞猜选项包含1、2、3、4、5这几个数字，以此类推。</p>
       <p>2. 发起n个选项的竞猜，则发起人需支付0.01 * n 个NAS作为竞猜人的奖励。比如：发起5个选项的竞猜，则发起人需支付0.01 * 5 = 0.05 NAS,作为竞猜人的奖励。</p>
       <p>3. 竞猜人每次竞猜，需支付0.01 * 2 = 0.02个NAS作为发起人的奖励。</p>
       <p>4. 每期竞猜参与竞猜人次，直至有人猜中正确答案。</p>
       <p>5. 当有人猜中正确答案时，将同时发放竞猜赢家与竞猜发起人奖励。竞猜赢家获得的奖励为发起人支付的发起费用，比如第2条中的0.05NAS。
         竞猜发起人获得的奖励，为所有参与本期竞猜者所支付的费用，比如第20个人猜中答案，则竞猜发起人获得的奖励为0.01 * 2 * 20 = 0.4NAS 。</p>
     </div>
   </div>
   <div class="limit">
     <div class="title">
       免责条款
     </div>
     <div class="info">

     </div>
   </div>
 </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.rules {
  margin-bottom: 20px;
}
</style>
