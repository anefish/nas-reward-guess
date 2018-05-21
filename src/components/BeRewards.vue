<template>
 <div class="berewards">
   <div class="title" v-show="beRewardGuess.length > 0">
     最近10期
   </div>
    <el-card class="box-card bereward-item" v-for="beRewardGuessItem in beRewardGuess" :key="beRewardGuessItem.index">
      <div class="title">
        第{{beRewardGuessItem.index}}期
      </div>
      <div class="answers">
        <span class="label">竞猜数字</span>
        <el-button-group class="answer-options">
           <el-button disabled v-for="item in Number(beRewardGuessItem.rewardUnits)" :key="item">{{item}}</el-button>
         </el-button-group>
      </div>
      <div class="answers">
        <span>正确答案</span>
        <el-button-group class="answer-options">
           <el-button type="warning">{{beRewardGuessItem.rightNum}}</el-button>
         </el-button-group>
      </div>
      <div class="tip">
        获胜者 <span>{{beRewardGuessItem.winner}}</span> 赢得 <span class="amount">{{unit * Number(beRewardGuessItem.rewardUnits)}}NAS</span> 奖励
      </div>
      <div class="tip">
        发起者 <span>{{beRewardGuessItem.from}}</span> 赢得 <span class="amount">{{unit * guessUnits * Number(beRewardGuessItem.guessCount)}}NAS</span> 奖励
      </div>
     </el-card>
     <div class="nodata" v-show="beRewardGuess.length === 0">
       <div class="txt">
         暂无竞猜...
       </div>
       <el-button type="warning" @click="jump">我要发起</el-button>
     </div>
 </div>
</template>

<script>
export default {
  data () {
    return {
      unit: 0.01,
      guessUnits: 2,

      beRewardGuess: []
    }
  },
  mounted () {
    this.getBeRewardGuess()
  },
  methods: {
    jump () {
      this.$router.push('/createguess')
    },
    getBeRewardGuess () {
      const from = window.Account.NewAccount().getAddressString()
      const value = '0'
      const nonce = '0'
      const gasPrice = '1000000'
      const gasLimit = '2000000'
      const callFunction = 'getBeRewardGuess'
      const callArgs = '[10]' // in the form of ["args"]
      const contract = {
        'function': callFunction,
        'args': callArgs
      }

      window.neb.api.call(from, window.dappAddress, value, nonce, gasPrice, gasLimit, contract).then((resp) => {
        // console.log('getBeRewardGuess data result: ', JSON.parse(resp.result))
        this.beRewardGuess = JSON.parse(resp.result)
      }).catch(function (err) {
        console.log('error: ', err.message)
      })
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

.nodata {
  text-align: center;
}
.nodata .txt {
  margin-bottom: 20px;
}
</style>
