<template>
  <header class="header">
    <router-link to="/">
      <div class="header__logo">
        <icon :iconName="`icon-pizza`" />
        <div class="logo__wrapper">
          <div class="title">VUE PIZZA</div>
          <div class="subtitle">самая вкусная пицца</div>
        </div>
      </div>
    </router-link>
    <router-link to="/cart">
      <div class="header__button">
        <p class="total-price">{{ this.getTotalPrice }} ₽</p>
        <icon :iconName="`icon-cart`" class="btn__cart" />
        <p class="total__count">{{ this.getCount }}</p>
      </div>
    </router-link>
  </header>
</template>

<script>
import icon from "@/components/icon.vue";
export default {
  components: {
    icon,
  },
  computed: {
    getTotalPrice() {
      return this.$store.getters.getTotalCost;
    },
    getCount() {
      return this.$store.getters.getCount;
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 40px;
  margin-bottom: 40px;
  border-bottom: 1px solid #f6f6f6;
  &__logo {
    display: flex;
    align-items: center;
    svg {
      margin-right: 15px;
      width: 38px;
      height: 38px;
    }
    .title {
      color: $dark-gray;
      font-weight: 800;
      font-size: 24px;
      letter-spacing: 0.24px;
      text-transform: uppercase;
    }
    .subtitle {
      color: $light-gray;
      font-size: 16px;
      font-weight: 400;
    }
  }
  &__button {
    display: flex;
    align-items: center;
    padding: 15px 23px;
    font-size: 16px;
    font-weight: 700;
    color: $white;
    background-color: $orange;
    border-radius: 30px;
    cursor: pointer;
    transition: 0.3s;
    .total-price {
      padding-right: 13px;
      border-right: 1px solid #ffffff40;
    }
    .btn__cart {
      width: 16px;
      height: 16px;
      margin-left: 13px;
      margin-right: 8px;
    }
    &:hover {
      background-color: $light-orange;
    }
  }
}
</style>
