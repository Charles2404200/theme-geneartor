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
import QRPreview from "@/components/qrcode/QRPreview.vue";
import OrderDetailPreview from "@/components/order-detail/OrderDetailPreview.vue";

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

watch(
  () => props.primaryColor,
  (newColor) => {
    if (newColor && /^#([0-9a-fA-F]{6})$/.test(newColor)) {
      baseColor.value = newColor;
    }
  },
  { immediate: true }
);


const page = ref(0); // 0 = Home, 1 = Order Detail, 2 = QR
const qrCodeState = ref({
  value: "https://your-domain.com",
  logo: "/qrCode.svg",
  logoColor: "#000000",
  bgColor: "#FFFFFF"
});
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
      </div>

      <!-- PHONE PREVIEW SECTION -->
      <section class="mt-10">
        <div class="device">
          <div class="device-frame">

            <div class="device-header"></div>
            <div class="device-sensors"></div>

            <div class="device-content bg-[#f7f7fa] overflow-y-auto pb-20">
              <StatusBar :shades="shades" />

              <!-- PAGE 0: HOME -->
              <div v-show="page === 0">
                <CategoryTabs :shades="shades" />
                <OrderSummary :shades="shades" />
              </div>

              <!-- PAGE 1: ORDER DETAIL -->
              <div v-show="page === 1">
                <OrderDetailPreview :shades="shades" />
              </div>

              <!-- PAGE 2: QR CODE -->
              <div
                v-show="page === 2"
                class="flex flex-col items-center justify-center py-10 gap-4"
              >
                <div class="text-lg font-semibold">
                  Scan QR Code
                </div>

                <QRPreview
                  :value="qrCodeState.value"
                  :logo="qrCodeState.logo"
                  :logoColor="qrCodeState.logoColor"
                  :bgColor="qrCodeState.bgColor"
                />
              </div>

              <!-- PAGINATION DOTS -->
              <div class="flex justify-center gap-2 my-4">
                <span
                  class="w-2 h-2 rounded-full cursor-pointer"
                  :class="page === 0 ? 'bg-black' : 'bg-gray-300'"
                  @click="page = 0"
                />
                <span
                  class="w-2 h-2 rounded-full cursor-pointer"
                  :class="page === 1 ? 'bg-black' : 'bg-gray-300'"
                  @click="page = 1"
                />
                <span
                  class="w-2 h-2 rounded-full cursor-pointer"
                  :class="page === 2 ? 'bg-black' : 'bg-gray-300'"
                  @click="page = 2"
                />
              </div>

              <!-- BOTTOM NAV -->
              <BottomNav
                :shades="shades"
                :home-tab="HomeTab"
                :order-tab="OrderTab"
                :offer-tab="OfferTab"
                :other-tab="OtherTab"
                :qr-tab="QrTab"
              />
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
