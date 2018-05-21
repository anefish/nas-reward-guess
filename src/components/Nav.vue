<template>
  <div class="my-nav">
    <!-- <div class="logo">
    </div> -->
    <img src="../assets/logo.jpg" alt="" class="logo">
    <el-menu router :default-active="activeIndex" class="my-menu" mode="horizontal" @select="handleSelect">
      <el-menu-item index="/unrewards">正在竞猜</el-menu-item>
      <el-menu-item index="/berewards">往期竞猜</el-menu-item>
      <el-menu-item index="/createguess">发起竞猜</el-menu-item>
      <el-menu-item index="/help">帮助</el-menu-item>
    </el-menu>
  </div>
</template>

<script scoped>
export default {
  data () {
    return {
    }
  },
  computed: {
    activeIndex () {
      return '/' + this.$route.path.split('/')[1]
    }
  },
  watch: {
    '$route' (to, from) {
      return '/' + to.path.split('/')[1]
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      // console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
.my-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
}

.logo {
  width: 160px;
  height: 120px;
  /* background-image: url(../assets/logo.jpg);
  background-size: 100% 100%; */
}

.my-menu {
  border-bottom: none;
  font-size: 30px;
}

.el-menu-item {
  font-size: 18px;
}

.el-menu--horizontal>.el-menu-item {
  border-bottom: none;
}

.el-menu--horizontal>.el-menu-item.is-active {
  border-bottom: none;
  color: #303133;
}
</style>
