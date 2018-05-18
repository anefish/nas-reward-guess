<template>
 <div class="berewards">
   <div class="title">
     最近10期
   </div>
    <el-card class="box-card bereward-item">
      <div class="title">
        第1期
      </div>
      <div class="answers">
        <span class="label">竞猜数字</span>
        <el-button-group class="answer-options">
           <el-button disabled>1</el-button>
           <el-button disabled>2</el-button>
           <el-button disabled>3</el-button>
           <el-button disabled>4</el-button>
           <el-button disabled>5</el-button>
         </el-button-group>
      </div>
      <div class="answers">
        <span>正确答案</span>
        <el-button-group class="answer-options">
           <el-button type="warning" disabled>1</el-button>
         </el-button-group>
      </div>
      <div class="tip">
        获胜者 <span>n1MUJXb6imRmTgKeiBYVkU9pYNT2Avhnt7Q</span> 赢得 <span class="amount">0.05NAS</span> 奖励
      </div>
      <div class="tip">
        发起者 <span>n1MUJXb6imRmTgKeiBYVkU9pYNT2Avhnt7Q</span> 赢得 <span class="amount">0.05NAS</span> 奖励
      </div>
      <!-- <div class="submit">
        <el-button type="warning" round>我要竞猜</el-button>
      </div> -->
     </el-card>
 </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 20px;
  margin-bottom: 30px;
}

.bereward-item {
  margin-bottom: 50px;
}
.bereward-item .title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
}
.bereward-item .answers {
  margin-bottom: 10px;
}
.bereward-item .answer-options {
  margin-left: 10px;
}
.bereward-item .answer-options .right-number {
  background-color: rgb(221, 164, 80);
}
.bereward-item .tip {
  font-style: italic;
  font-size: 15px;
  color: #34495e;
  margin-bottom: 10px;
}
.bereward-item .tip .amount {
  color: red;
}
.bereward-item .submit{
  text-align: center;
}
</style>
