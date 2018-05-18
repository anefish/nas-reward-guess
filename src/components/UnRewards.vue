<template>
 <div class="unrewards">
   <el-card class="box-card unreward-item">
     <div class="title">
       第1期
     </div>
     <div class="answers">
       <span class="label">竞猜数字</span>
       <el-radio-group v-model="radio3" class="answer-options">
          <el-radio-button label="1"></el-radio-button>
          <el-radio-button label="2"></el-radio-button>
          <el-radio-button label="3"></el-radio-button>
          <el-radio-button label="4"></el-radio-button>
          <el-radio-button label="5"></el-radio-button>
          <el-radio-button label="6"></el-radio-button>
          <el-radio-button label="7"></el-radio-button>
          <el-radio-button label="8"></el-radio-button>
          <el-radio-button label="9"></el-radio-button>
          <el-radio-button label="10"></el-radio-button>
        </el-radio-group>
     </div>
     <div class="tip">
       猜中答案你将获得 <span class="amount">0.05NAS</span> 奖励
     </div>
     <div class="submit">
       <el-button type="warning" round icon="el-icon-time">我要竞猜</el-button>
     </div>
    </el-card>

    <el-card class="box-card unreward-item">
      <div class="title">
        第1期
      </div>
      <div class="answers">
        <span class="label">竞猜数字</span>
        <el-radio-group v-model="radio3" class="answer-options">
           <el-radio-button label="1"></el-radio-button>
           <el-radio-button label="2"></el-radio-button>
           <el-radio-button label="3"></el-radio-button>
           <el-radio-button label="4"></el-radio-button>
           <el-radio-button label="5"></el-radio-button>
         </el-radio-group>
      </div>
      <div class="tip">
        猜中答案你将获得 <span class="amount">0.05NAS</span> 奖励
      </div>
      <div class="submit">
        <el-button type="warning" round icon="el-icon-time">我要竞猜</el-button>
      </div>
     </el-card>
 </div>
</template>

<script>
export default {
  data () {
    return {
      radio3: '1'
    }
  }
}
</script>

<style scoped>
.unreward-item {
  margin-bottom: 50px;
}
.unreward-item .title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
}
.unreward-item .answers {
  margin-bottom: 10px;
}
.unreward-item .answer-options {
  margin-left: 10px;
}
.unreward-item .tip {
  font-style: italic;
  font-size: 15px;
  color: #34495e;
  margin-bottom: 20px;
}
.unreward-item .tip .amount {
  color: red;
}
.unreward-item .submit{
  text-align: center;
}
</style>
