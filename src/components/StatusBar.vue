<script setup>
import { defineProps } from 'vue';
import Wifi from '@/assets/Wifi.svg';
import mobileSignal from '@/assets/Mobile Signal.svg';
import statusBattery from '@/assets/_StatusBar-battery.svg';

defineProps({
  shades: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="flex justify-between px-4 pt-5 pb-2 text-[12px] text-gray-700">
    <span>10:02</span>
    <div class="flex items-center gap-1">
      <img :src="Wifi" class="w-6 h-6 opacity-80" />
      <img :src="mobileSignal" class="w-6 h-6 opacity-80" />
      <img :src="statusBattery" class="w-6 h-6 opacity-80" />
    </div>
  </div>

  <h1 class="px-4 text-[20px] font-semibold">Đặt hàng</h1>
</template>
