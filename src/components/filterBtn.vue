<template>
  <div class="filter">
    <label>
      <input type="checkbox" class="filter__input" :value="value" />
      <span class="filter__text">{{ text }}</span>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
    },
    value: {
      type: Array,
    },
  },
};
</script>

<style lang="scss" scoped>
.filter__input {
  display: none;
}
.filter__text {
  padding: 14px 18px;
  border-radius: 30px;
  background-color: $gray;
  border: none;
  cursor: pointer;
  font-weight: 700;
  font-size: 16px;
  color: $dark-gray;
  letter-spacing: 0.24px;
}
.filter__input:checked + .filter__text {
  background-color: $orange;
  color: $dark-gray;
}
</style>
