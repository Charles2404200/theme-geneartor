<script setup>
import { ref, watch, onMounted } from "vue";
import { generateShades } from "../utils/colorShades";
import { setPrimary } from "../utils/setTheme";
import HomeTab from "../assets/home-tab.svg";
import OrderTab from "../assets/order-tab.svg";
import OfferTab from "@/assets/offer-tab-selected.svg";
import OtherTab from "../assets/other-tab.svg";
import QrTab from "@/assets/qr-tab.svg";

import PrimaryColorConfig from "@/components/PrimaryColorConfig.vue";
import StatusBar from "@/components/StatusBar.vue";
import CategoryTabs from "@/components/CategoryTabs.vue";
import OrderSummary from "@/components/OrderSummary.vue";
import BottomNav from "@/components/BottomNav.vue";

const props = defineProps({
  primaryColor: String
});

const baseColor = ref(props.primaryColor || "#B9804E");
const shades = ref(generateShades(baseColor.value));
const colorPicker = ref(null);

const applyColor = (hex) => {
  const valid = /^#([0-9a-fA-F]{6})$/.test(hex);
  if (!valid) return;
  shades.value = generateShades(hex);
  setPrimary(hex);
};

onMounted(() => {
  const saved = localStorage.getItem("primaryColor");
  if (saved && /^#([0-9a-fA-F]{6})$/.test(saved)) {
    baseColor.value = saved;
  }
  applyColor(baseColor.value);
});

watch(baseColor, (v) => applyColor(v));

// Sync when primaryColor prop changes (from import)
watch(() => props.primaryColor, (newColor) => {
  if (newColor && /^#([0-9a-fA-F]{6})$/.test(newColor)) {
    baseColor.value = newColor;
  }
}, { immediate: true });
</script>

<template>
  <div class="page-home">
    <div class="flex gap-5">
      <!-- CONFIG SECTION -->
      <div class="flex gap-10 items-start">
        <PrimaryColorConfig 
          :base-color="baseColor"
          :shades="shades"
          :color-picker="colorPicker"
          @update:baseColor="baseColor = $event"
          @apply-color="applyColor"
        />
        <div></div>
      </div>

      <!-- PHONE PREVIEW SECTION -->
      <section class="mt-10">
        <div class="device">
          <div class="device-frame">

            <div class="device-header"></div>
            <div class="device-sensors"></div>

            <div class="device-content bg-[#f7f7fa] overflow-y-auto pb-20">
              <StatusBar :shades="shades" />
              <CategoryTabs :shades="shades" />
              <OrderSummary :shades="shades" />
              <BottomNav :shades="shades" :home-tab="HomeTab" :order-tab="OrderTab" :offer-tab="OfferTab" :other-tab="OtherTab" :qr-tab="QrTab" />
            </div>

            <div class="device-btns"></div>
            <div class="device-power"></div>
            <div class="device-stripe"></div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>
