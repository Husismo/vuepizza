<template>
  <div class="item">
    <div class="item__info">
      <img :src="item.imageUrl" alt="pizza" class="item__img" />
      <div class="item__text">
        <div class="item__name">{{ item.title }}</div>
        <div class="item__about">{{ item.dough }}, {{ item.size }} см.</div>
      </div>
    </div>
    <div class="item__counter">
      <icon
        @click.native="minusQuantity"
        class="counter__btn"
        :iconName="`icon-minus`"
      />
      <p class="counter">{{ this.getItemCount }}</p>
      <icon
        @click.native="plusQuantity"
        class="counter__btn"
        :iconName="`icon-plus`"
      />
    </div>
    <div class="item__price">{{ item.price }}</div>
    <div class="item__btn">
      <icon @click.native="deleteFromCart" :iconName="`icon-delete`" />
    </div>
  </div>
</template>

<script>
import icon from "./icon.vue";
export default {
  components: {
    icon,
  },
  props: {
    item: {},
  },
  methods: {
    plusQuantity() {
      let item = {
        size: this.item.size,
        dough: this.item.dough,
        id: this.item.id,
      };
      this.$store.commit(`plusItemCount`, item);
    },
    minusQuantity() {
      let item = {
        size: this.item.size,
        dough: this.item.dough,
        id: this.item.id,
      };
      this.$store.commit(`minusItemCount`, item);
    },
    deleteFromCart() {
      let item = {
        size: this.item.size,
        dough: this.item.dough,
        id: this.item.id,
      };
      this.$store.commit(`deleteFromCart`, item);
    },
  },
  computed: {
    getItemCount() {
      let item = {
        size: this.item.size,
        dough: this.item.dough,
        id: this.item.id,
      };
      return this.$store.getters.getItemCount(item);
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 22px;
  color: $black;
  font-weight: 700;
  letter-spacing: 0.22px;
  padding: 44px 0 44px 0;
  border-top: 1px solid $gray;
  &__info {
    display: flex;
    align-items: center;
  }
  &__img {
    width: 80px;
    height: 80px;
    margin-right: 15px;
  }
  &__name {
    margin-bottom: 8px;
  }
  &__about {
    font-size: 18px;
    font-weight: 400;
    letter-spacing: 0.18px;
    color: $light-gray;
  }
  &__counter {
    display: flex;
    align-items: center;
    color: $orange;
    .counter {
      margin-left: 12px;
      margin-right: 12px;
      color: $black;
      &__btn {
        cursor: pointer;
      }
    }
  }
  &__btn {
    cursor: pointer;
    color: #d0d0d0;
    &:hover {
      color: #8f8f8f;
    }
  }
}
</style>
