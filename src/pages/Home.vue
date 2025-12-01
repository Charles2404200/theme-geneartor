<script setup>
import { ref, watch, onMounted } from "vue";
import { generateShades } from "../utils/colorShades";
import { setPrimary } from "../utils/setTheme";
import { RouterLink } from "vue-router";
import HomeTab from "../assets/home-tab.svg";
import OrderTab from "../assets/order-tab.svg";
import OfferTab from "@/assets/offer-tab-selected.svg";
import OtherTab from "../assets/other-tab.svg";
import QrTab from "@/assets/qr-tab.svg";
import Wifi from "@/assets/Wifi.svg";
import mobileSignal from "@/assets/Mobile Signal.svg";
import statusBattery from "@/assets/_StatusBar-battery.svg";


const baseColor = ref("#B9804E");
const levels = [100, 200, 300, 400, 500, 600];
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
</script>

<template>
  <div class="min-h-screen bg-[#f7f7fa] text-[#111827]">
    <div class="max-w-6xl mx-auto py-8 px-8 space-y-6">
      <!-- Header -->
      <div>
        <p class="text-xs text-gray-400">Campaigns</p>
        <h1 class="text-2xl font-semibold mt-1">Config Interface</h1>
      </div>

      <!-- Tabs -->
      <div class="border-b border-gray-200">
        <div class="flex gap-6 text-sm">
          <button
            class="pb-3 border-b-2 border-[#111827] font-medium text-[#111827]"
          >
            Color
          </button>
          <RouterLink to="/splash" class="pb-3 text-gray-400 hover:text-black">
            Splash Screen
          </RouterLink>
          <RouterLink
            to="/background"
            class="pb-3 text-gray-400 hover:text-black"
          >
            Background
          </RouterLink>
  <RouterLink
  to="/banner"
  class="pb-3 text-gray-400 hover:text-black"
>
  Home - Top Banner
</RouterLink>
          <RouterLink
            to="/member"
              class="pb-3 border-b-2 border-[#c28c51] font-medium text-[#c28c51]"
>
              Member Card
            </RouterLink>

        </div>
      </div>

      <div class="flex gap-5">
        <!-- CONFIG SECTION -->
      <div class="flex gap-10 items-start">
        <section
          class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6"
        >
          <div class="flex items-center gap-6">
            <div>
              <p class="text-sm font-medium mb-2">Primary Color</p>
              <input
                v-model="baseColor"
                class="px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono w-32"
              />
            </div>

            <div class="relative">
              <input
                type="color"
                ref="colorPicker"
                class="absolute inset-0 opacity-0 cursor-pointer"
                v-model="baseColor"
                @input="applyColor(baseColor)"
              />
              <div
                class="h-10 w-64 rounded-lg border border-gray-200 shadow-inner cursor-pointer"
                :style="{ background: shades[500] }"
                @click="colorPicker.click()"
              ></div>
            </div>
          </div>

          <!-- Shades -->
          <div class="space-y-2">
            <div class="grid grid-cols-6 text-center text-xs text-gray-500">
              <div v-for="lvl in levels" :key="lvl">{{ lvl }}</div>
            </div>

            <div
              class="grid grid-cols-6 gap-[1px] bg-gray-200 rounded-lg overflow-hidden"
            >
              <div
                v-for="lvl in levels"
                :key="lvl"
                class="h-12"
                :style="{ background: shades[lvl] }"
              ></div>
            </div>

            <div class="grid grid-cols-6 text-center text-[11px] text-gray-600">
              <div v-for="lvl in levels" :key="lvl" class="font-mono">
                {{ shades[lvl]?.toUpperCase() }}
              </div>
            </div>
          </div>
        </section>

        <div></div>
      </div>

<!-- PHONE PREVIEW SECTION -->
<section class="mt-10">
  <div class="device">
    <div class="device-frame">

      <div class="device-header"></div>
      <div class="device-sensors"></div>

      <div class="device-content bg-[#f7f7fa] overflow-y-auto pb-20">
        

        <!-- STATUS BAR -->
        <div class="flex justify-between px-4 pt-5 pb-2 text-[12px] text-gray-700">
          <span>10:02</span>
          <div class="flex items-center gap-1">
            <img :src="Wifi" class="w-6 h-6 opacity-80" />
            <img :src="mobileSignal" class="w-6 h-6 opacity-80" />
            <img :src="statusBattery" class="w-6 h-6 opacity-80" />
          </div>
        </div>

        <h1 class="px-4 text-[20px] font-semibold">Đặt hàng</h1>
        <div class="px-4 mt-3 flex gap-2 overflow-x-auto no-scrollbar pb-3 fade-divider">

  <!-- Active -->
  <button
    class="px-3 py-1.5 text-[12px] font-medium rounded-lg border shadow-sm"
    :style="{ 
      background: shades[500], 
      borderColor: shades[500], 
      color: '#fff'
    }"
  >
    Ưu đãi
  </button>

  <button
    class="px-3 py-1.5 text-[12px] rounded-lg border border-gray-200 bg-white text-gray-700 shadow-sm whitespace-nowrap"
  >
    Syphon
  </button>

  <button
    class="px-3 py-1.5 text-[12px] rounded-lg border border-gray-200 bg-white text-gray-700 shadow-sm whitespace-nowrap"
  >
    Moka Pot
  </button>

  <button
    class="px-3 py-1.5 text-[12px] rounded-lg border border-gray-200 bg-white text-gray-700 shadow-sm whitespace-nowrap"
  >
    Cà phê
  </button>

</div>


        <!-- STORE -->
        <div class="px-4 mt-3">
          <div class="px-3 py-2 bg-white border rounded-full text-[12px] flex items-center justify-between">
            <span>Phê La - Hồ Tùng Mậu</span>
          </div>
        </div>

        <h2 class="px-4 mt-5 text-[15px] font-semibold">
          Ưu đãi 💖
        </h2>

        <div class="mt-2 px-4 flex gap-4 overflow-x-auto no-scrollbar">

          <!-- Sản phẩm 1 -->
          <div class="w-[160px] bg-white rounded-xl shadow border overflow-hidden">
            <img src="https://fnbvietnam.vn/wp-content/uploads/2023/07/review-menu-phe-la-3.jpg" class="w-full h-36 object-cover" />

            <div class="px-3 py-2">
              <p class="text-[12px] font-semibold leading-tight">
                Si Mơ – Cold Brew Ổi Long Mơ Đào
              </p>

              <div class="mt-2 flex items-center justify-between">
                <span class="text-green-600 text-[12px] font-bold" :style="{ color: shades[500] }">50.000đ</span>

                <div class="flex items-center gap-1 text-[14px]">
                  <button class="w-7 h-7 flex items-center justify-center rounded-full" :style="{ background: shades[300], color: shades[100], border: `1px solid ${shades[200]}`}">+</button>
                </div>
              </div>
            </div>
          </div>

<!-- Sản phẩm 2 -->
<div 
  class="w-[160px] rounded-xl shadow border overflow-hidden h-[240px]"
  :style="{ 
    borderColor: shades[100], 
    background: shades[200]
  }"
>
  <img 
    src="https://ipos.vn/wp-content/uploads/2025/08/1-8-12.png" 
    class="w-full h-36 object-cover" 
  />

  <div class="px-3 py-2">
    <p 
      class="text-[12px] font-semibold leading-tight"
    >
      Matcha Coco Latte (có dừa khô)
    </p>

    <div class="mt-2 flex items-center justify-between">
      <span class="text-green-600 text-[12px] font-bold" :style="{ color: shades[500] }">50.000đ</span>

      <div class="flex items-center gap-1 text-[14px]">

        <!-- Button "-" -->
  <button 
  class="w-7 h-7 flex items-center justify-center rounded-full"
  :style="{ background: shades[500], color: shades[100], border: `1px solid ${shades[400]}` }"
> -
</button>

        <span :style="{ color: shades[500] }">1</span>

        <!-- Button "+" -->
        <button 
          class="w-7 h-7 flex items-center justify-center rounded-full"
          :style="{
            background: shades[500],
            color: shades[100],
            border: `1px solid ${shades[400]}`
          }"
        >+</button>

      </div>
    </div>
  </div>
</div>



        </div>

        <h2 class="px-4 mt-5 text-[15px] font-semibold">Syphon</h2>

        <div class="px-4 mt-2">
          <div class="bg-white rounded-xl border shadow p-3 flex items-center gap-3">
            <img src="https://phache.com.vn/upload/images/tra-oolong-sua-tra-oolong-lai-sua.jpg" class="w-16 h-16 object-cover rounded-lg" />
            <div>
              <p class="text-[13px] font-semibold">Ô Long Nhài Sữa</p>
              <p class="text-[12px] text-gray-700 mt-1">55,000đ</p>
            </div>
          </div>
        </div>
<div class="px-4 mt-4">
  <div class="bg-white rounded-xl shadow border p-4 flex items-center justify-between">

    <!-- Left: icon + text -->
    <div class="flex items-start gap-2">
      <span class="text-[16px]">🛒</span>
      <div class="leading-tight">
        <p class="text-[13px] font-medium text-gray-700">
          Giao hàng tận nơi
        </p>
        <p class="text-[15px] font-semibold text-gray-900">
          110,000đ
        </p>
      </div>
    </div>

    <!-- Right: Button -->
    <button
      class="px-5 py-2 rounded-xl text-white text-[13px] font-semibold"
      :style="{ background: shades[500] }"
    >
      ĐẶT HÀNG
    </button>

  </div>
</div>

<div class="bottom-nav">
  <div class="nav-bg"></div>
  <div class="floating-btn">
    <img :src="QrTab" class="w-7 h-7" />
  </div>

  <!-- Navigation items -->
  <div class="nav-inner">
<div class="flex flex-col items-center text-gray-600">
  <svg 
    class="w-6 h-6"
    viewBox="0 0 20 20"
    fill="none"
    :stroke="shades[500]"
    stroke-width="1.4"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <!-- Outline của icon -->
    <path
      d="M2.5 17.5h15V11c1-0.7 1.7-1.8 1.7-3.1 0-0.7-0.2-1.4-0.6-2L16.4 2.1c-0.2-0.3-0.5-0.4-0.8-0.4H4.3c-0.3 0-0.6 0.2-0.8 0.4L1.3 6c-0.4 0.6-0.6 1.3-0.6 2 0 1.3 0.7 2.4 1.7 3.1v6.5z"
    />

    <!-- Fill phần mái nhà -->
    <path
      :fill="shades[500]"
      d="M4.8 11.6h10.6v5.1H4.8z"
    />
  </svg>

  <span 
    class="mt-1 text-[12px] font-medium" :style="{ color: shades[500] }">Trang chủ</span>
</div>



    <div class="flex flex-col items-center">
      <img :src="OrderTab" class="w-6 h-6" />
      <span class="mt-1 text-[12px] ">Đặt hàng</span>
    </div>

    <div class="flex flex-col items-center text-gray-600">
      <img :src="OfferTab" class="w-6 h-6 opacity-80" />
      <span class="mt-1 text-[12px]">Ưu đãi</span>
    </div>

    <div class="flex flex-col items-center text-gray-600">
      <img :src="OtherTab" class="w-6 h-6 opacity-80" />
      <span class="mt-1 text-[12px]">Khác</span>
    </div>
  </div>
  <div class="home-indicator"></div>
</div>


      </div>

      <div class="device-btns"></div>
      <div class="device-power"></div>
      <div class="device-stripe"></div>
    </div>
  </div>
</section>

      </div>
    </div>
  </div>
</template>
