export default {
  state: {
    cart: [],
    totalCoast: 0,
    count: 0,
  },

  getters: {
    getCart(state) {
      return state.cart;
    },

    getTotalCost(state) {
      return state.totalCoast;
    },

    getCount(state) {
      return state.count;
    },

    getItemCount: (state) => (item) => {
      let count = 0;
      state.cart.findIndex((obj) => {
        if (
          obj.id === item.id &&
          item.dough == obj.dough &&
          item.size == obj.size
        ) {
          count = obj.count;
        }
      });
      return count;
    },

    isAdded: (state) => (item) => {
      let index = state.cart.findIndex(
        (obj) =>
          obj.id === item.id && obj.size == item.size && obj.dough == item.dough
      );
      if (index >= 0) {
        return true;
      }
    },
  },

  mutations: {
    addToCart(state, item) {
      state.cart.push(item);
      this.commit(`changeTotal`);
      this.commit(`changeCount`);
    },

    deleteFromCart(state, item) {
      let index = state.cart.findIndex(
        (obj) =>
          obj.id === item.id && obj.size == item.size && obj.dough == item.dough
      );
      if (index >= 0) {
        state.cart.splice(index, 1);
        this.commit(`changeCount`);
        this.commit(`changeTotal`);
      }
    },

    plusItemCount(state, item) {
      state.cart.findIndex((obj) => {
        if (
          obj.id === item.id &&
          obj.size == item.size &&
          obj.dough == item.dough &&
          obj.count < 10
        ) {
          obj.count++;
        }
      });
      this.commit(`changeCount`);
      this.commit(`changeTotal`);
    },

    minusItemCount(state, item) {
      state.cart.findIndex((obj) => {
        if (
          obj.id === item.id &&
          obj.size == item.size &&
          obj.dough == item.dough &&
          obj.count > 1
        ) {
          obj.count--;
        }
      });
      this.commit(`changeCount`);
      this.commit(`changeTotal`);
    },

    changeTotal(state) {
      let total = 0;
      for (let item of state.cart) {
        total += item.price * item.count;
      }
      state.totalCoast = total;
    },

    changeCount(state) {
      let count = 0;
      for (let item of state.cart) {
        count += item.count;
      }
      state.count = count;
    },

    emptyTrash(state) {
      state.cart = [];
      this.commit(`changeCount`);
      this.commit(`changeTotal`);
    },
  },
};
