<script setup>
import { defineProps } from 'vue';

defineProps({
  shades: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div>
    <!-- Offer Section -->
    <h2 class="px-4 mt-5 text-[15px] font-semibold">
      Ưu đãi 💖
    </h2>

    <div class="mt-2 px-4 flex gap-4 overflow-x-auto no-scrollbar">
      <!-- Product 1 -->
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

      <!-- Product 2 -->
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
          <p class="text-[12px] font-semibold leading-tight">
            Matcha Coco Latte (có dừa khô)
          </p>

          <div class="mt-2 flex items-center justify-between">
            <span class="text-green-600 text-[12px] font-bold" :style="{ color: shades[500] }">50.000đ</span>

            <div class="flex items-center gap-1 text-[14px]">
              <button 
                class="w-7 h-7 flex items-center justify-center rounded-full"
                :style="{ background: shades[500], color: shades[100], border: `1px solid ${shades[400]}` }"
              >-</button>

              <span :style="{ color: shades[500] }">1</span>

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

    <!-- Syphon Section -->
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

    <!-- Order Summary -->
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
  </div>
</template>
