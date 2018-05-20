<template>
 <div class="unrewards">
   <un-reward-item v-for="item in unRewardGuess" :key="item.index" :unRewardItem="item"></un-reward-item>
   <div class="nodata" v-show="unRewardGuess.length === 0">
     <div class="txt">
       暂无竞猜...
     </div>
     <el-button type="warning" @click="jump">我要发起</el-button>
   </div>
 </div>
</template>

<script>
import UnRewardItem from '@/components/UnRewardItem'

export default {
  data () {
    return {
      unRewardGuess: []
    }
  },
  mounted () {
    this.getUnRewardGuess()
  },
  methods: {
    jump () {
      this.$router.push('/createguess')
    },
    getUnRewardGuess () {
      const from = window.Account.NewAccount().getAddressString()
      const value = '0'
      const nonce = '0'
      const gasPrice = '1000000'
      const gasLimit = '2000000'
      const callFunction = 'getUnRewardGuess'
      const callArgs = '[]' // in the form of ["args"]
      const contract = {
        'function': callFunction,
        'args': callArgs
      }

      window.neb.api.call(from, window.dappAddress, value, nonce, gasPrice, gasLimit, contract).then((resp) => {
        console.log('getUnRewardGuess data result: ', JSON.parse(resp.result))
        this.unRewardGuess = JSON.parse(resp.result)
      }).catch(function (err) {
        console.log('error: ', err.message)
      })
    }
  },
  components: {
    UnRewardItem
  }
}
</script>

<style scoped>
.nodata {
  text-align: center;
}
.nodata .txt {
  margin-bottom: 20px;
}
</style>
