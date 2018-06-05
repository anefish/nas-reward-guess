<template>
  <el-card class="box-card unreward-item">
    <div class="title">
      第{{unRewardItem.index}}期
    </div>
    <div class="answers">
      <span class="label">竞猜数字</span>
      <el-radio-group v-model="guessNum" class="answer-options">
         <el-radio-button v-for="item in Number(unRewardItem.rewardUnits)" :label="item" :key="item"></el-radio-button>
       </el-radio-group>
    </div>
    <div class="tip">
      猜中答案你将获得 <span class="amount">{{unit * Number(unRewardItem.rewardUnits)}}NAS</span> 奖励
    </div>
    <div class="submit">
      <el-button type="warning" round icon="el-icon-time" @click="onSubmitGuess">我要竞猜</el-button>
    </div>
   </el-card>
</template>

<script>
export default {
  data () {
    return {
      unit: 0.01,
      guessUnits: 1,

      serialNumber: null,
      intervalQuery: null,

      guessNum: 1
    }
  },
  props: ['unRewardItem'],
  methods: {
    onSubmitGuess () {
      const guessTotal = this.unit * this.guessUnits

      this.$confirm('您选择的数字是' + this.guessNum + '，本次竞猜您需支付' + guessTotal + 'NAS。(因钱包交易为异步执行，支付成功后请手动刷新网页。)', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.submitGuess()
      }).catch(() => {
      })
    },
    submitGuess () {
      const guessTotal = this.unit * this.guessUnits

      const to = window.dappAddress
      const value = guessTotal
      const callFunction = 'submitGuess'
      const callArgs = JSON.stringify([this.unRewardItem.index, this.guessNum])

      // 使用nebpay的call接口去调用合约,
      this.serialNumber = window.nebPay.call(to, value, callFunction, callArgs, {
        callback: window.IS_TESTNET ? window.NebPay.config.testnetUrl : window.NebPay.config.mainnetUrl,

        // 设置listener, 处理交易返回信息
        listener: (resp) => {
          console.log('submitGuess callback data: ', resp)
        }
      })

      this.intervalQuery = setInterval(() => {
        this.funcIntervalQuery()
      }, 5000)
    },

    funcIntervalQuery () {
      // search transaction result from server (result upload to server by app)
      window.nebPay.queryPayInfo(this.serialNumber, {
        callback: window.IS_TESTNET ? window.NebPay.config.testnetUrl : window.NebPay.config.mainnetUrl
      })
        .then((resp) => {
          // resp is a JSON string
          console.log('tx result: ', resp)
          const respObject = JSON.parse(resp)
          if (respObject.code === 0) {
            console.log('succeed!!!!!!!!!!!!!!!!!!!!!!!!')
            clearInterval(this.intervalQuery)
            window.location.reload()
          }
        })
        .catch(function (err) {
          console.log(err)
        })
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
