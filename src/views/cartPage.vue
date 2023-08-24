<template>
  <div class="cart">
    <div class="cart__stopper" v-show="cartItems.length <= 0">
      <div class="title cart__title">
        Корзина пустая
        <icon :iconName="`icon-emoji`" />
      </div>
      <div class="subtitle">
        Вы ничего не добавили в корзину. Для того, чтобы заказать пиццу, перейди
        на главную страницу.
      </div>
      <img src="@/assets/img/buyer.png" alt="" class="stopper__img" />
    </div>
    <div class="order__confirm" v-show="orderConfirm">
      <div class="title order__title">Заказ создан!</div>
      <div class="subtitle">В ближайшее время с Вами свяжется оператор!</div>
      <div class="order__wrapper">
        <icon :iconName="`icon-happyEmoji`" />
        <router-link to="/">
          <button class="goHome">Продолжить покупки</button>
        </router-link>
      </div>
    </div>
    <div class="cart__wrapper" v-show="!isFormActive && !cartItems.length <= 0">
      <div class="cart__header">
        <div class="title">
          <icon class="icon-cart" :iconName="`icon-cart`" />
          Корзина
        </div>
        <div @click="emptyTrash" class="cart-header__button">
          <icon :iconName="`icon-trash`" />
          Очистить корзину
        </div>
      </div>
      <div class="cart__content">
        <cartItem :item="item" v-for="item in cartItems" :key="item.id" />
      </div>
      <div class="cart__about">
        <div class="cart__total">
          <div class="total__items">
            Всего пицц: <span>{{ this.getCount }} шт.</span>
          </div>
          <div class="total__price">
            Сумма заказа: <span>{{ this.getTotalPrice }} ₽</span>
          </div>
        </div>
        <div class="cart__buttons">
          <router-link to="/">
            <div class="cart__btn button-back">
              <icon :iconName="`icon-back`" />
              Вернуться назад
            </div>
          </router-link>
          <div class="cart__btn button-checkout" @click="showForm">
            Оплатить сейчас
          </div>
        </div>
      </div>
    </div>
    <div class="cart__wrapper" v-show="isFormActive && !orderConfirm">
      <div @click="showForm" class="cart__btn button-back back">
        <icon :iconName="`icon-back`" />
        Вернуться назад
      </div>
      <div class="title form__title">Оформить заказ</div>

      <form id="order__form">
        <input
          :class="$v.form.adress.$error ? 'Invalid' : ''"
          v-model="form.phoneNumber"
          type="number"
          class="form__input"
          placeholder="Номер телефона"
        />
        <input
          :class="$v.form.adress.$error ? 'Invalid' : ''"
          v-model="form.email"
          type="email"
          class="form__input"
          placeholder="E-mail"
        />
        <input
          :class="$v.form.adress.$error ? 'Invalid' : ''"
          v-model="form.fullName"
          type="text"
          class="form__input"
          placeholder="Фамилия Имя Отчество"
        />
        <p class="form__subtitle">Адрес</p>

        <input
          :class="$v.form.adress.$error ? 'Invalid' : ''"
          v-model="form.adress"
          type="text"
          class="form__input"
          placeholder="Город, улица, дом, квартира"
        />
      </form>
      <button class="order__btn" @click="createOrder">Оформить заказ</button>
    </div>
  </div>
</template>

<script>
import icon from "@/components/icon.vue";
import cartItem from "@/components/cartItem.vue";
import { validationMixin } from "vuelidate";
import { required, minLength, email } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  components: {
    icon,
    cartItem,
  },
  data() {
    return {
      cartItems: [],
      isFormActive: false,
      orderConfirm: false,
      form: {
        phoneNumber: "",
        email: "",
        fullName: "",
        adress: "",
      },
    };
  },
  validations: {
    form: {
      phoneNumber: { required, minLength: minLength(11) },
      email: { required, email },
      fullName: { required, minLength: minLength(8) },
      adress: { required, minLength: minLength(10) },
    },
  },
  methods: {
    checkForm() {
      this.$v.form.$touch();
      if (!this.$v.form.$error) {
        return true;
      }
    },
    getCartItems() {
      this.cartItems = this.$store.getters.getCart;
    },
    emptyTrash() {
      this.$store.commit(`emptyTrash`);
      this.getCartItems();
    },
    showForm() {
      this.isFormActive = !this.isFormActive;
    },
    createOrder() {
      if (this.checkForm()) {
        this.orderConfirm = !this.orderConfirm;
        this.$store.commit(`emptyTrash`);
      }
    },
  },
  computed: {
    getTotalPrice() {
      return this.$store.getters.getTotalCost;
    },
    getCount() {
      return this.$store.getters.getCount;
    },
  },
  mounted() {
    this.getCartItems();
  },
};
</script>

<style lang="scss" scoped>
.cart {
  width: 820px;
  margin: 0 auto;
  &__wrapper {
    display: flex;
    flex-direction: column;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }
  &-header__button {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 400;
    color: #b6b6b6;
    cursor: pointer;
    svg {
      margin-right: 8px;
    }
    &:hover {
      color: #5e5e5e;
    }
  }
  &__content {
    margin-bottom: 40px;
  }
  &__total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 22px;
    font-weight: 400;
    letter-spacing: 0.22px;
    color: $black;
    margin-bottom: 40px;
    .total__items {
      span {
        font-weight: 700;
      }
    }
    .total__price {
      span {
        color: $orange;
        font-weight: 700;
      }
    }
  }
  .icon-cart {
    margin-right: 17px;
    width: 29px;
    height: 29px;
  }
  &__buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__btn {
    padding: 12px 12px;
    font-size: 16px;
    border-radius: 30px;
    border: 1px solid #000;
    cursor: pointer;
  }
  .button-back {
    display: flex;
    align-items: center;
    color: #b6b6b6;
    border-color: #b6b6b6;
    transition: 0.3s;
    &:hover {
      background-color: #e2e2e2;
    }
    svg {
      width: 6px;
      height: 12px;
      margin-right: 12px;
    }
  }
  .button-checkout {
    color: $white;
    border-color: $orange;
    background-color: $orange;
    font-weight: 700;
    transition: 0.3s;
    &:hover {
      background-color: #ff9165;
    }
  }
}
#order__form {
  display: flex;
  flex-direction: column;
}
.form__input {
  margin-bottom: 20px;
  padding: 15px 10px;
  border: 1px solid #e0e0e0;
  border-radius: 100px;
  outline: none;
  transition: 0.3s;
  &:hover {
    border-color: #d3d3d3;
  }
  &:focus {
    border-color: #a7a7a7;
  }
}
.form__title {
  margin-bottom: 20px;
}
.form__subtitle {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 15px;
}
.order__btn {
  display: inline;
  font-size: 16px;
  font-weight: 700;
  border-radius: 30px;
  cursor: pointer;
  border: 1px solid #fe5f1e;
  padding: 15px 10px;
  background-color: $orange;
  color: $white;
  transition: 0.3s;
  &:hover {
    background-color: #ff9165;
  }
}
.back {
  margin-bottom: 30px;
  width: 150px;
}
.Invalid {
  border-color: rgb(255, 74, 74);
  &::placeholder {
    color: rgb(255, 74, 74);
  }
  &:hover {
    border-color: rgb(255, 40, 40);
  }
  &:focus {
    border-color: rgb(255, 40, 40);
  }
}
.cart__stopper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cart__title {
  margin-bottom: 30px;
}
.subtitle {
  font-size: 20px;
  text-align: center;
  margin-bottom: 30px;
}
.stopper__img {
  width: 300px;
  height: 255px;
}
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.order__confirm {
  text-align: center;
  .order__title {
    margin-bottom: 25px;
  }
  svg {
    width: 100px;
    height: 100px;
    margin-bottom: 20px;
  }
}
.order__wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.goHome {
  padding: 15px 23px;
  border: 1px solid $orange;
  border-radius: 30px;
  background-color: $orange;
  color: $white;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  transition: 0.3s;
  &:hover {
    background-color: $light-orange;
  }
}
</style>
