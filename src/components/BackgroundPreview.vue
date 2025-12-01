<script setup>
import { defineProps } from 'vue';

defineProps({
  type: { type: String, default: 'Image' },
  imageUrl: String,
  baseColor: String,
  dividerColor: { type: String, default: '#A2B6CD' },
  textColor: { type: String, default: '#B9804E' },
  hotlineColor: { type: String, default: '#101010' }
});
</script>

<template>
  <section class="space-y-3">
    <div class="device">
      <div class="device-frame">
        <div class="device-header"></div>
        <div class="device-sensors"></div>

        <div class="device-content relative overflow-hidden">

          <!-- Background -->
          <div 
            v-if="type === 'Image' && imageUrl"
            class="absolute inset-0 z-10"
            :style="{
              backgroundImage:`url(${imageUrl})`,
              backgroundSize:'cover',
              backgroundPosition:'center'
            }"
          ></div>

          <div 
            v-else-if="type === 'Color'"
            class="absolute inset-0 z-10"
            :style="{ background: baseColor }"
          ></div>

          <div 
            v-else-if="type === 'Gradient'"
            class="absolute inset-0 z-10 bg-gradient-to-br from-[#c28c51] to-[#f0d9b5]"
          ></div>

          <div 
            v-else 
            class="absolute inset-0 z-10"
            :style="{ background: dividerColor }"
          ></div>


          <div 
            class="absolute left-4 right-4 bg-white rounded-2xl shadow-lg z-20 overflow-hidden"
            style="top: 16px; bottom: 16px;"
          >
            <!-- Top white image placeholder (≈68% height) -->
            <div class="w-full" style="height: 68%;"></div>

            <!-- Divider -->
            <div class="relative h-[2px]" :style="{ backgroundColor: dividerColor }">

              <!-- Perforation left -->
              <div
                class="absolute rounded-full"
                :style="{
                  width: '12px',
                  height: '12px',
                  left: '-6px',
                  top: '-5px',
                  backgroundColor: dividerColor,
                  border: `2px solid ${dividerColor}`
                }"
              ></div>

              <!-- Perforation right -->
              <div
                class="absolute rounded-full"
                :style="{
                  width: '12px',
                  height: '12px',
                  right: '-6px',
                  top: '-5px',
                  backgroundColor: dividerColor,
                  border: `2px solid ${dividerColor}`
                }"
              ></div>

              <!-- Serrated edge -->
              <div class="absolute inset-0 flex items-center justify-center gap-[3px] px-3">
                <div
                  v-for="i in 40"
                  :key="i"
                  class="rounded-full"
                  :style="{ 
                    width: '6px', 
                    height: '6px',
                    backgroundColor: dividerColor
                  }"
                ></div>
              </div>
            </div>

            <!-- Bottom text zone -->
            <div class="flex flex-col items-center justify-center py-6 px-4">
              <p 
                class="text-[11px] mb-2 tracking-wide"
                :style="{ color: textColor }"
              >
                Bạn cần hỗ trợ hãy liên hệ hotline
              </p>

              <p 
                class="text-base font-semibold flex items-center gap-1.5"
                :style="{ color: hotlineColor }"
              >
                <span class="text-lg">📞</span>
                <span>1900 3013</span>
              </p>
            </div>

          </div>
        </div>

        <div class="device-stripe"></div>
      </div>
    </div>
  </section>
</template>
