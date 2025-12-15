<script setup lang="ts">
import { computed } from "vue";
import { useQRCode } from "./useQRCode";
import qrCodeSvg from "@/assets/qrCode.svg";

const props = defineProps<{
  qrCodeState: {
    logoColor?: string;
    bgColor?: string;
  };
}>();

const qr = useQRCode(
  computed(() => props.qrCodeState)
);

// CSS variables for color classes
const cssVariables = computed(() => ({
  '--primary-500': props.qrCodeState?.logoColor ?? "#000000",
}))
</script>

<template>
  <div>
    <h3 class="text-lg font-medium mb-4">Preview</h3>

    <div class="relative w-72 h-72 bg-white border flex items-center justify-center" :style="cssVariables">

      <!-- QR SVG -->
      <img
        :src="qrCodeSvg"
        alt="QR Code"
        class="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)]"
      />

      <!-- LOGO TRÒN -->
<div
  class="relative z-10 w-16 h-16 rounded-full border-4 border-white flex items-center justify-center"
  :style="{ backgroundColor: qr.bgColor }"
>
  <svg
    viewBox="0 0 260 260"
    class="w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M130.7 136.922C132.229 135.557 133.959 134.006 133.959 130.949H132.267C132.267 133.194 131.029 134.299 129.597 135.579C129.073 136.048 128.527 136.538 128.03 137.108V124.48C128.452 124.667 128.938 124.768 129.484 124.768C132.208 124.768 135.666 121.751 135.666 118.361C135.666 116.354 134.38 115 132.472 115C131.175 115 129.635 115.699 128.457 116.827C127.09 118.141 126.333 119.85 126.333 121.644V147C126.884 147 127.468 147 128.025 147V146.131C127.987 144.344 129.543 143.25 130.694 142.223C132.224 140.858 133.953 139.307 133.953 136.251H132.262C132.262 138.495 131.024 139.601 129.592 140.881C129.068 141.349 128.522 141.84 128.025 142.409V141.552C128.025 139.307 129.262 138.202 130.694 136.922Z"
      :fill="qr.logoColor"
      style="
        transform: scale(3.4);
        transform-origin: center;
      "
    />
  </svg>
</div>
    </div>
  </div>
</template>
