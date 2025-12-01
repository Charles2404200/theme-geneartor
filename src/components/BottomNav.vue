<script setup>
import { defineProps } from 'vue';

defineProps({
  shades: {
    type: Object,
    required: true
  },
  homeTab: String,
  orderTab: String,
  offerTab: String,
  otherTab: String,
  qrTab: String
});
</script>

<template>
  <div class="bottom-nav">
    <div class="nav-bg"></div>
    
    <!-- Floating QR button -->
    <div class="floating-btn">
      <img :src="qrTab" class="w-7 h-7" />
    </div>

    <!-- Navigation items -->
    <div class="nav-inner">
      <!-- Home -->
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
          <path
            d="M2.5 17.5h15V11c1-0.7 1.7-1.8 1.7-3.1 0-0.7-0.2-1.4-0.6-2L16.4 2.1c-0.2-0.3-0.5-0.4-0.8-0.4H4.3c-0.3 0-0.6 0.2-0.8 0.4L1.3 6c-0.4 0.6-0.6 1.3-0.6 2 0 1.3 0.7 2.4 1.7 3.1v6.5z"
          />
          <path
            :fill="shades[500]"
            d="M4.8 11.6h10.6v5.1H4.8z"
          />
        </svg>
        <span 
          class="mt-1 text-[12px] font-medium" :style="{ color: shades[500] }">Trang chủ</span>
      </div>

      <!-- Order -->
      <div class="flex flex-col items-center">
        <img :src="orderTab" class="w-6 h-6" />
        <span class="mt-1 text-[12px]">Đặt hàng</span>
      </div>

      <!-- Offer -->
      <div class="flex flex-col items-center text-gray-600">
        <img :src="offerTab" class="w-6 h-6 opacity-80" />
        <span class="mt-1 text-[12px]">Ưu đãi</span>
      </div>

      <!-- Other -->
      <div class="flex flex-col items-center text-gray-600">
        <img :src="otherTab" class="w-6 h-6 opacity-80" />
        <span class="mt-1 text-[12px]">Khác</span>
      </div>
    </div>

    <!-- Home indicator -->
    <div class="home-indicator"></div>
  </div>
</template>
