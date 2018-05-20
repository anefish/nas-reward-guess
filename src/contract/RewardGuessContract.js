"use strict";

var GuessItem = function (text) {
  if (text) {
    var obj = JSON.parse(text);
    this.index = obj.index; // 编号
    this.from = obj.from; // 发起者地址
    this.rewardUnits = obj.rewardUnits; //奖励总单位数/竞猜选项个数（5-10）
    this.rightNum = obj.rightNum; // 正确答案数字
    this.guessCount = obj.guessCount; // 猜测次数
    this.beReward = obj.beReward; //是否已付奖励(本轮结束)
    this.winner = obj.winner; // 赢家地址
  } else {
    this.index = "";
    this.from = "";
    this.rewardUnits = new BigNumber(0);
    this.rightNum = new BigNumber(0);
    this.guessCount = new BigNumber(0);
    this.beReward = false;
    this.winner = "";
  }
};

GuessItem.prototype = {
  toString: function () {
    return JSON.stringify(this);
  }
};


var RewardGuessContract = function () {
  LocalContractStorage.defineProperties(this, {
    owner: null,
    fee: null,
    unit: null, // 单位奖励（比如 0.01 nas）
    guessUnits: null, // 参与竞猜支付单位数
    size: null, // 竞猜项目总数
    beRewardSize: null // 已结束项目数
  });

  LocalContractStorage.defineMapProperty(this, "allGuessMap", {
    parse: function (text) {
      return new GuessItem(text);
    },
    stringify: function (o) {
      return o.toString();
    }
  });

  LocalContractStorage.defineMapProperties(this,{
    beRewardMap: null, // index: Index (index => beRewardSize)
    beRewardKeys: null // Index: true (Index => size)
  });
};

RewardGuessContract.prototype = {
  init: function () {
    this.owner = Blockchain.transaction.from;
    this.fee = new BigNumber(0.05);
    this.unit = new BigNumber(0.01);
    this.guessUnits = new BigNumber(2);
    this.size = new BigNumber(0);
    this.beRewardSize = new BigNumber(0);
  },

  _isOwner: function (address) {
    if (!(address === this.owner)) {
      throw new Error("Unauthorized operation!");
    }
  },

  _verifyAddress: function (address) {
    var valid = Blockchain.verifyAddress(address);
    if (!valid) {
      throw new Error("Invalid address!");
    }
  },

  setOwner: function (address) {
    this._verifyAddress(address);

    var from = Blockchain.transaction.from;
    this._isOwner(from);

    this.owner = address;
  },

  setFee: function (fee) {
    fee = new BigNumber(fee);
    var from = Blockchain.transaction.from;
    this._isOwner(from);

    this.fee = fee;
  },
  getFee: function () {
    return this.fee;
  },

  setUnit: function (unit) {
    unit = new BigNumber(unit);
    var from = Blockchain.transaction.from;
    this._isOwner(from);

    this.unit = unit;
  },
  getUnit: function () {
    return this.unit;
  },

  setGuessUnits: function (guessUnits) {
    guessUnits = new BigNumber(guessUnits)
    var from = Blockchain.transaction.from;
    this._isOwner(from);

    this.guessUnits = guessUnits;
  },
  getGuessUnits: function () {
    return this.guessUnits;
  },

  withdraw: function (address, value) {
    value = new BigNumber(value);

    this._verifyAddress(address);

    var from = Blockchain.transaction.from;
    this._isOwner(from);

    // 转账提款
    var result = Blockchain.transfer(address, value);
    if (!result) {
      throw new Error("transfer failed.");
    }
    Event.Trigger("RewardGuessContract", {
      Transfer: {
        from: Blockchain.transaction.to,
        to: address,
        value: value.toString()
      }
    });
  },

  // 发起竞猜
  createGuess: function (rewardUnits) {
    var from = Blockchain.transaction.from;
    var value = Blockchain.transaction.value;
    rewardUnits = new BigNumber(rewardUnits);

    // 奖励总额
    var rewardTotal = this.unit.times(rewardUnits);
    if (!value.eq(rewardTotal)) {
      throw new Error("Please pay" + rewardTotal + "NAS.");
    }

    // 正确数字
    var rightNum = parseInt(Math.random().times(rewardUnits)).plus(new BigNumber(1));

    var guessItem = new GuessItem();
    guessItem.index = this.size;
    guessItem.from = from;
    guessItem.rewardUnits = rewardUnits;
    guessItem.rightNum = rightNum;

    var index = this.size;
    this.allGuessMap.set(index, guessItem);
    this.size = this.size.plus(new BigNumber(1));
  },

  // 参与竞猜
  submitGuess: function (guessIndex, guessNum) {
    var from = Blockchain.transaction.from;
    var value = Blockchain.transaction.value;
    guessIndex = new BigNumber(guessIndex);
    guessNum = new BigNumber(guessNum);

    var guessItem = this.allGuessMap.get(guessIndex);
    if (guessItem.beReward) {
      throw new Error("The guessing is over.");
    }

    var guessTotal = this.unit.times(this.guessUnits);
    if (!value.eq(guessTotal)) {
      throw new Error("Please pay" + guessTotal + "NAS.");
    }

    guessItem.guessCount = guessItem.guessCount.plus(new BigNumber(1));

    if (guessNum.eq(guessItem.rightNum)) { // 猜中
      guessItem.beReward = true;
      guessItem.winner = from;

      var index = this.beRewardSize;
      this.beRewardMap.set(index, guessIndex);
      this.beRewardKeys.set(guessIndex, true);
      this.beRewardSize = this.beRewardSize.plus(new BigNumber(1));

      // 支付奖励
      var winner = from;
      var creater = guessItem.from;
      var winnerRewardAmount = this.unit.times(guessItem.rewardUnits);
      var createrRewardAmount = this.unit.times(this.guessUnits).times(guessItem.guessCount);
      // 手续费
      if (createrRewardAmount > winnerRewardAmount) {
        createrRewardAmount = createrRewardAmount.times(new BigNumber(0.95));
      }
      winnerRewardAmount = winnerRewardAmount.times(new BigNumber(0.95));

      // 支付发起者奖励
      var result1 = Blockchain.transfer(creater, createrRewardAmount);
      if (!result1) {
        throw new Error("transfer failed.");
      }
      Event.Trigger("RewardGuessContract", {
        Transfer: {
          from: Blockchain.transaction.to,
          to: creater,
          value: createrRewardAmount.toString()
        }
      });

      // 支付猜中者奖励
      var result2 = Blockchain.transfer(winner, winnerRewardAmount);
      if (!result2) {
        throw new Error("transfer failed.");
      }
      Event.Trigger("RewardGuessContract", {
        Transfer: {
          from: Blockchain.transaction.to,
          to: winner,
          value: winnerRewardAmount.toString()
        }
      });

    }

    this.allGuessMap.set(guessIndex, guessItem);
  },

  // 查询正在竞猜
  getUnRewardGuess: function () {
    var unRewardGuess = [];
    for (var i = 0; i < this.size; i++) {
      if (!this.beRewardKeys.get(i)) {
        var guessItem = this.allGuessMap.get(i);
        unRewardGuess.push(guessItem);
      }
    }

    return unRewardGuess.reverse();
  },

  // 查询往期竞猜
  getBeRewardGuess: function (len) {
    len = parseInt(new BigNumber(len));
    var beRewardGuess = [];
    for (var i = 0; i < len; i++) {
      var index = this.beRewardMap.get(this.beRewardSize - 1 - i);
      var guessItem = this.allGuessMap.get(index);
      beRewardGuess.push(guessItem);
    }

    return beRewardGuess;
  }
};

module.exports = RewardGuessContract;

// testnet: n1thjS2sF38Mk5FCfZt5phutEWBaCaRgDNs f7c6f9575de32aeee3697e1b76514984d93537e4941f60cdab53f7100d10903a
