<template>
  <div class="root">
    <div class="filter__wrapper">
      <div class="filter__buttons">
        <label>
          <input
            v-model="categories"
            type="checkbox"
            class="filter__input"
            value="1"
          />
          <span class="filter__text">Мясные</span>
        </label>
        <label>
          <input
            v-model="categories"
            type="checkbox"
            class="filter__input"
            value="2"
          />
          <span class="filter__text">Вегетарианская</span>
        </label>
        <label>
          <input
            v-model="categories"
            type="checkbox"
            class="filter__input"
            value="3"
          />
          <span class="filter__text">Острые</span>
        </label>
      </div>
    </div>
    <div class="main__content">
      <div class="title main__title">Все пиццы</div>
      <div class="main__items">
        <pizzaItem :item="item" v-for="item in filterData" :key="item.id" />
      </div>
      <div class="main__items" v-show="isFetching">
        <skeleton />
        <skeleton />
        <skeleton />
        <skeleton />
        <skeleton />
        <skeleton />
        <skeleton />
        <skeleton />
      </div>
    </div>
  </div>
</template>

<script>
import filterBtn from "@/components/filterBtn.vue";
import icon from "@/components/icon.vue";
import pizzaItem from "@/components/pizzaItem.vue";
import skeleton from "@/components/skeleton.vue";
export default {
  components: {
    filterBtn,
    icon,
    pizzaItem,
    skeleton,
  },
  data() {
    return {
      items: [],
      categories: [],
      isFetching: true,
    };
  },
  methods: {
    getItem() {
      this.$api.getItems
        .getItems({})
        .then(({ data }) => {
          this.items = data;
          this.isFetching = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  computed: {
    filterData() {
      let data = [];
      if (this.categories.length) {
        data = this.items.filter(
          (obj) => this.categories.indexOf(obj.types.toString()) != -1
        );
      } else {
        data = this.items;
      }
      return data;
    },
  },
  mounted() {
    this.getItem();
  },
};
</script>

<style lang="scss" scoped>
.filter__wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;

  .filter__buttons {
    display: flex;
    label + label {
      margin-left: 25px;
    }
  }
}
.main__title {
  margin-bottom: 35px;
}
.main__items {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 100px;
  column-gap: 32px;
}

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
  color: $white;
}
</style>
