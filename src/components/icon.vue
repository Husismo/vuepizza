<template>
  <svg class="icon">
    <use v-bind:xlink:href="`#` + iconName" />
  </svg>
</template>

<script>
export default {
  name: `icon`,
  props: {
    iconName: {
      type: String,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.icon {
  padding: 0;
  width: 24px;
  height: 24px;
  transition: 0.3s;
}
</style>
