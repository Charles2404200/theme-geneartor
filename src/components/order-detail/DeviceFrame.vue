<script setup lang="ts">
import { DEVICE_CONFIG } from "@/constants/device-config"
import type { OrderDetailConfig, CSSVariables } from "@/types/order-detail"

interface Props {
  config: OrderDetailConfig
  cssVariables: CSSVariables
}

defineProps<Props>()
</script>

<template>
  <div
    :class="`relative ${DEVICE_CONFIG.WIDTH} rounded-3xl overflow-hidden`"
    :style="{ height: DEVICE_CONFIG.HEIGHT, background: config.bgStyle, ...cssVariables }"
  >
    <!-- Header -->
    <div :class="DEVICE_CONFIG.PADDING">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        :style="{ stroke: config.arrow }"
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </div>

    <!-- Slot for content -->
    <slot />

    <!-- Spacing -->
    <div :class="DEVICE_CONFIG.SPACING_BOTTOM"></div>

    <!-- Bottom Card -->
    <div class="absolute bottom-0 left-0 right-0" :class="DEVICE_CONFIG.BOTTOM_HEIGHT">
      <div
        class="absolute top-0 left-0 right-0"
        :class="DEVICE_CONFIG.BOTTOM_TOP_SECTION"
        :style="{ background: config.bgStyle }"
      />

      <div
        class="relative w-full h-full bg-white border rounded-t-3xl"
        :style="{ borderColor: config.border }"
      />
    </div>
  </div>
</template>
