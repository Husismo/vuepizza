import Vue from "vue";
import VueRouter from "vue-router";
import homePage from "@/views/homePage.vue";
import cartPage from "@/views/cartPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "homePage",
    component: homePage,
  },
  {
    path: "/cart",
    name: "cartPage",
    component: cartPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
