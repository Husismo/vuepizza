<template>
  <div class="item">
    <div class="item__img">
      <img :src="item.imageUrl" alt="" />
    </div>
    <div class="item__name">{{ item.title }}</div>
    <div class="item__forms">
      <form class="item__dough-form">
        <label>
          <input
            v-model="dough"
            class="item__radio"
            name="dough"
            type="radio"
            value="традиционное"
          />
          <span class="form__text">традиционное</span>
        </label>
        <label>
          <input
            v-model="dough"
            class="item__radio"
            name="dough"
            type="radio"
            value="тонкое"
          />
          <span class="form__text">тонкое</span>
        </label>
      </form>
      <form class="item__size-form">
        <label>
          <input
            v-model="size"
            class="item__radio"
            type="radio"
            name="size"
            value="25"
          />
          <span class="form__text">25 см.</span>
        </label>
        <label>
          <input
            v-model="size"
            class="item__radio"
            type="radio"
            name="size"
            value="30"
          />
          <span class="form__text">30 см.</span>
        </label>
        <label>
          <input
            v-model="size"
            class="item__radio"
            type="radio"
            name="size"
            value="35"
          />
          <span class="form__text">35 см.</span>
        </label>
      </form>
    </div>
    <div class="item__info">
      <div class="item__price">
        <p v-show="!this.size">от</p>
        {{ this.changePrice }} ₽
      </div>
      <button
        v-bind:class="[
          this.checkAdded ? `item__added-btn` : `item__not-added-btn`,
        ]"
        :disabled="!isDisabled"
        class="item__add-btn"
        @click="addToCart()"
      >
        <icon class="icon-btn" :iconName="`icon-add-to-cart-plus`" />
        Добавить
        <div class="btn__counter" v-show="this.checkAdded">
          {{ this.getItemCount }}
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import icon from "./icon.vue";
export default {
  components: {
    icon,
  },
  data() {
    return {
      dough: "",
      size: "",
    };
  },
  props: {
    item: {},
  },
  methods: {
    addToCart() {
      if (this.checkAdded) {
        let item = {
          id: this.item.id,
          dough: this.dough,
          size: this.size,
        };
        this.$store.commit(`plusItemCount`, item);
      } else {
        let cartItem = {
          count: 1,
          dough: this.dough,
          size: this.size,
          id: this.item.id,
          imageUrl: this.item.imageUrl,
          title: this.item.title,
          price: this.changePrice,
        };
        this.$store.commit("addToCart", cartItem);
      }
    },
  },
  computed: {
    changePrice() {
      if (this.size <= 25) {
        return this.item.price;
      } else if (this.size == 30) {
        return Math.ceil(this.item.price * 1.3);
      } else if (this.size == 35) {
        return Math.ceil(this.item.price * 1.5);
      }
    },
    checkAdded() {
      let item = {
        dough: this.dough,
        size: this.size,
        id: this.item.id,
      };
      return this.$store.getters.isAdded(item);
    },
    getItemCount() {
      let item = {
        dough: this.dough,
        size: this.size,
        id: this.item.id,
      };
      return this.$store.getters.getItemCount(item);
    },
    isDisabled() {
      return this.dough.length > 0 && this.size.length > 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 280px;
  &__img {
    img {
      width: 260px;
      height: 260px;
    }
    margin-bottom: 11px;
  }
  &__name {
    color: $black;
    font-size: 20px;
    font-weight: 800;
    letter-spacing: 0.2px;
    margin-bottom: 22px;
  }
  &__forms {
    background-color: #f0f0f0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 8px 0px;
    height: 80px;
    border-radius: 10px;
    width: 100%;
    margin-bottom: 17px;
  }
  &__dough-form {
    margin-bottom: 7px;
  }
  &__radio {
    display: none;
    &:checked + .form__text {
      background-color: $white;
    }
  }
  &__price {
    color: $black;
    font-size: 22px;
    font-weight: 700;
    letter-spacing: 0.33px;
    display: flex;
    p {
      margin-right: 8px;
    }
  }
  &__add-btn {
    font-size: 16px;
    font-weight: 700;
    border-radius: 30px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border: 1px solid $orange;
    padding: 10px 18px;
    position: relative;

    .icon-btn {
      width: 12px;
      height: 12px;
      margin-right: 7px;
    }
    .btn__counter {
      position: absolute;
      right: 8px;
      top: 8px;
      font-size: 13px;
      font-weight: 700;
      padding: 3px 6px;
      background-color: $orange;
      border-radius: 50%;
      color: $white;
      margin-left: 10px;
    }
  }
  &__not-added-btn {
    color: $white;
    background-color: $orange;
    transition: 0.3s;
    &:hover {
      background-color: $light-orange;
    }
  }
  &__added-btn {
    color: $orange;
    background-color: $white;
    transition: 0.3s;
    padding: 10px 35px 10px 18px;

    &:hover {
      background-color: #ffe5da;
    }
  }
  &__info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
}
.form__text {
  padding: 10px 25px;
  cursor: pointer;
  color: $dark-gray;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.21px;
  border-radius: 5px;
  transition: 0.3s;
}
</style>
