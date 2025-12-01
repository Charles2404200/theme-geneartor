import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import SplashScreen from '../pages/SplashScreen.vue';
import Background from "../pages/Background.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/color' },
    { path: '/color', component: Home },
    { path: '/splash', component: SplashScreen },
    { path: "/background", component: Background },
    { path: '/banner', name: 'banner', component: () => import('@/pages/HomeTopBanner.vue')},
    { path: "/member", name: "MemberCard", component: () => import("../pages/MemberCard.vue"),}
  ],
});


export default router;
