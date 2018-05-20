<template>
 <div class="create-guess">
   <div class="label">
     请选择本期竞猜选项个数
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
      <el-button type="warning" round icon="el-icon-edit" @click="onCreateGuess">发起竞猜</el-button>
    </div>
 </div>
</template>

<script>
export default {
  data () {
    return {
      unit: 0.01,
      rewardUnits: '5',

      serialNumber: null,
      intervalQuery: null
    }
  },
  methods: {
    onCreateGuess () {
      const rewardTotal = this.unit * Number(this.rewardUnits)

      this.$confirm('本次发起竞猜，您需支付' + rewardTotal + 'NAS.', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.createGuess()
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // })
      })
    },

    createGuess () {
      const rewardTotal = this.unit * Number(this.rewardUnits)

      const to = window.dappAddress
      const value = rewardTotal
      const callFunction = 'createGuess'
      const callArgs = JSON.stringify([this.rewardUnits])

      // 使用nebpay的call接口去调用合约,
      this.serialNumber = window.nebPay.call(to, value, callFunction, callArgs, {
        callback: window.IS_TESTNET ? window.NebPay.config.testnetUrl : window.NebPay.config.mainnetUrl,

        // 设置listener, 处理交易返回信息
        listener: (resp) => {
          console.log('createGuess callback data: ', resp)
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
