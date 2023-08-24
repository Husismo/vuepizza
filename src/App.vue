<template>
  <div id="app">
    <div class="container">
      <headerComp />
      <router-view />
    </div>
  </div>
</template>

<script>
import headerComp from "./components/headerComp.vue";
export default {
  components: {
    headerComp,
  },
};
</script>

<style lang="scss">
@import "@/styles/main.scss";
</style>
