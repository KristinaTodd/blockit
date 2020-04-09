import Vue from "vue";
import Router from "vue-router";
// @ts-ignore
import Home from "./views/Home.vue";
// @ts-ignore
import Dashboard from "./views/Dashboard.vue";
// @ts-ignore
import TileDetails from "./views/TileDetails.vue";
// @ts-ignore
import BlockDetails from "./views/BlockDetails.vue";
import { authGuard } from "@bcwdev/auth0-vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      beforeEnter: authGuard
    },
    {
      path: "/:keepId",
      name: "TileDetails",
      component: TileDetails
    },
    {
      path: "/:vaultId",
      name: "BlockDetails",
      component: BlockDetails,
      beforeEnter: authGuard
    }
  ]
});
