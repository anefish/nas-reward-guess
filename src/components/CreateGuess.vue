<template>
 <div class="create-guess">
   <div class="label">
     请选择本次竞猜选项个数
   </div>
   <el-radio-group v-model="rewardUnits" class="answer-options">
      <el-radio-button label="5"></el-radio-button>
      <el-radio-button label="6"></el-radio-button>
      <el-radio-button label="7"></el-radio-button>
      <el-radio-button label="8"></el-radio-button>
      <el-radio-button label="9"></el-radio-button>
      <el-radio-button label="10"></el-radio-button>
    </el-radio-group>

    <div class="tip">
      选项越多，猜中概率越小，发起人赢得更多奖励的机会越大
    </div>

    <div class="submit">
      <el-button type="warning" round icon="el-icon-edit">发起竞猜</el-button>
    </div>
 </div>
</template>

<script>
export default {
  data () {
    return {
      rewardUnits: '5'
    }
  }
}
</script>

<style scoped>
.create-guess {
  margin-bottom: 50px;
}

.label {
  margin-bottom: 15px;
  font-size: 18px;
}
.answer-options {
  margin-bottom: 10px;
}
.tip {
  font-style: italic;
  font-size: 15px;
  color: #34495e;
  margin-bottom: 30px;
}
.submit {
  text-align: center;
}
</style>
