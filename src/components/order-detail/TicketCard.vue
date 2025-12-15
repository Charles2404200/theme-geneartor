<script setup lang="ts">
import { DEVICE_CONFIG } from "@/constants/device-config"

interface Props {
  dividerColor: string
}

defineProps<Props>()
</script>

<template>
  <div class="relative bg-white rounded-2xl overflow-visible" :style="{ height: DEVICE_CONFIG.TICKET_HEIGHT }">

    <!-- TOP SEMI CIRCLE -->
    <div
      :class="`absolute ${DEVICE_CONFIG.SEMI_CIRCLE_TOP} left-1/2 -translate-x-1/2 ${DEVICE_CONFIG.SEMI_CIRCLE_WIDTH} ${DEVICE_CONFIG.SEMI_CIRCLE_HEIGHT} bg-white rounded-full`"
    />

    <!-- TOP SECTION -->
    <div :style="{ height: DEVICE_CONFIG.TOP_SECTION_HEIGHT }"></div>

    <!-- DOTTED DIVIDER -->
    <div class="flex justify-center gap-1" :class="DEVICE_CONFIG.DIVIDER_PY">
      <span
        v-for="i in DEVICE_CONFIG.DOT_COUNT"
        :key="i"
        :class="`${DEVICE_CONFIG.DOT_SIZE} rounded-full`"
        :style="{ background: dividerColor }"
      />
    </div>

    <!-- BOTTOM SECTION -->
    <div :style="{ height: DEVICE_CONFIG.TOP_SECTION_HEIGHT }"></div>

    <!-- SIDE CUTS (MASKED) -->
    <div
      :class="`absolute ${DEVICE_CONFIG.SIDE_CUT_WIDTH} ${DEVICE_CONFIG.SIDE_CUT_HEIGHT} -left-3 ${DEVICE_CONFIG.SIDE_CUT_POSITION} -translate-y-1/2 rounded-r-full`"
      style="background: transparent;"
    />
    <div
      :class="`absolute ${DEVICE_CONFIG.SIDE_CUT_WIDTH} ${DEVICE_CONFIG.SIDE_CUT_HEIGHT} -right-3 ${DEVICE_CONFIG.SIDE_CUT_POSITION} -translate-y-1/2 rounded-l-full`"
      style="background: transparent;"
    />
  </div>
</template>
