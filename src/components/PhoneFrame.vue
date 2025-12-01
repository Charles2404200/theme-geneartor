<script setup>
import { ref, watch, onMounted, computed } from "vue";
import { generateShades } from "@/utils/colorShades";
import { setPrimary } from "@/utils/setTheme";

import StatusBar from "@/components/StatusBar.vue";
import NavBar from "@/components/NavBar.vue";

import HomeView from "@/views/HomeView.vue";
import OrderView from "@/views/OrderView.vue";
import OfferView from "@/views/OfferView.vue";
import OtherView from "@/views/OtherView.vue";

const baseColor = ref("#B9804E");
const levels = [100, 200, 300, 400, 500, 600];
const shades = ref(generateShades(baseColor.value));

const applyColor = (hex) => {
  if (!/^#([0-9a-fA-F]{6})$/.test(hex)) return;
  shades.value = generateShades(hex);
  setPrimary(hex);
};

// Load saved color
onMounted(() => {
  const saved = localStorage.getItem("primaryColor");
  if (saved) baseColor.value = saved;
  applyColor(baseColor.value);
});

watch(baseColor, (v) => applyColor(v));

const currentPage = ref("home");

const currentView = computed(() => {
  return {
    home: HomeView,
    order: OrderView,
    offer: OfferView,
    other: OtherView,
  }[currentPage.value];
});
</script>

<template>
  <div class="device">
    <div class="device-frame">
      <div class="device-header"></div>
      <div class="device-sensors"></div>

      <!-- CONTENT -->
      <div class="device-content bg-[#f7f7fa] overflow-y-auto pb-20">
        <StatusBar :shades="shades" />
        <component :is="currentView" :shades="shades" />

      </div>
      <NavBar
        :shades="shades"
        :currentPage="currentPage"
        @changePage="(p) => (currentPage.value = p)"
      />

      <div class="home-indicator"></div>
    </div>

    <div class="device-btns"></div>
    <div class="device-power"></div>
    <div class="device-stripe"></div>
  </div>
</template>
