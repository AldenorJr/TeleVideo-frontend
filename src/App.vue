<template>
  <div id="app">
    <Header />
    <router-view path="$router.key"/>
  </div>
</template>

<script>

import "./styles/styleGlobal.css";
import Header from "./components/Header.vue"

export default {
  name: 'App',
  components: {
    Header,
  }
}
</script>