<template>
  <div id="app">
    <div class="header">
      <my-nav></my-nav>
    </div>

    <el-alert class="extension-alert"
      title="温馨提示：使用本网站，请先安装 "
      type="warning"
      close-text="知道了">
      <a target="_blank" href="https://github.com/ChengOrangeJu/WebExtensionWallet">星云链官方钱包插件</a>
    </el-alert>

    <div class="main">
      <router-view/>
    </div>
    <div class="footer">
      <p>Powered by Nebulas</p>
      <br>
      <p>© 大玩家 Copyright by: Anefish</p>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav'

export default {
  name: 'App',
  components: {
    'my-nav': Nav
  }
}
</script>

<style>
.el-radio-button__orig-radio:checked+.el-radio-button__inner {
    color: #fff;
    background-color: rgb(221, 164, 80);
    border-color: rgb(221, 164, 80);
    -webkit-box-shadow: -1px 0 0 0 rgb(221, 164, 80);
    box-shadow: -1px 0 0 0 rgb(221, 164, 80);
}
.el-radio-button__inner:hover {
    color: rgb(221, 164, 80);
}

* {
  margin: 0;
  padding: 0;
}

html,body {
  /* height: 100%; */
  background-color: #f8f8f8;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}

.header, .footer {
  height: 120px;
}

.header {
  background-color: #fff;
  margin-bottom: 10px;
}

.main {
  background-color: #fff;
  display: flex;
  justify-content: center;
  padding: 30px;
}

.footer {
  border-top: 1px solid #ddd;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 14px;
  color: #34495e;
}

.extension-alert {
  margin-bottom: 10px;
}
.extension-alert a {
  color: #e6a23c;
}
</style>
