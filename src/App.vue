<template>
  <div id="app">
    <Header />
  </div>
</template>

<script>

import "./styles/styleGlobal.css";
import Header from "./components/Header.vue"

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>