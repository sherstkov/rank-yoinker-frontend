import { createRouter, createWebHistory } from "vue-router";
import NotFound from "@/views/NotFound.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import MatchStats from "@/views/MatchStats.vue";
import DemoReplay from "@/views/DemoReplay.vue";

import type { RouteRecordRaw } from "vue-router";
import { MATCH_STATS_ROUTE, DEMO_REPLAY_ROUTE } from "@/constants";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: DefaultLayout,
    redirect: MATCH_STATS_ROUTE,
    children: [
      {
        path: "/match-stats",
        component: MatchStats,
        name: MATCH_STATS_ROUTE,
      },
      {
        path: "/demo-replay",
        component: DemoReplay,
        name: DEMO_REPLAY_ROUTE,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
