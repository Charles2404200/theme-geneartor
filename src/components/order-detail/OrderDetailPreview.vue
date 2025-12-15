<script setup lang="ts">
import { computed } from "vue"
import { DEVICE_CONFIG } from "@/constants/device-config"
import type { OrderDetailState, OrderDetailConfig, CSSVariables } from "@/types/order-detail"
import DeviceFrame from "./DeviceFrame.vue"
import TicketCard from "./TicketCard.vue"

interface Props {
  state?: OrderDetailState
}

const props = defineProps<Props>()

const config = computed<OrderDetailConfig>(() => {
  const isImage = props.state?.type === "image" && !!props.state?.backgroundImage

  return {
    bgStyle: isImage
      ? `url(${props.state!.backgroundImage})`
      : props.state?.backgroundColor ?? "#B7C9DA",
    bgIsImage: isImage,
    arrow: props.state?.arrowColor ?? "#B9804E",
    divider: props.state?.dividerColor ?? "#9FB2C9",
    border: "#D9D9D9",
  }
})

const cssVariables = computed<CSSVariables>(() => ({
  '--primary-500': props.state?.dividerColor ?? "#9FB2C9",
}))
</script>

<template>
  <div>
    <h3 class="text-lg font-medium mb-4">Preview</h3>

    <DeviceFrame :config="config" :css-variables="cssVariables">
      <!-- Ticket Card Container -->
      <div class="px-4 relative">
        <TicketCard :divider-color="config.divider" />

        <!-- LARGE NOTCHES -->
        <div
          :class="`absolute ${DEVICE_CONFIG.NOTCH_WIDTH} ${DEVICE_CONFIG.NOTCH_HEIGHT} -left-5 ${DEVICE_CONFIG.NOTCH_TOP} ${DEVICE_CONFIG.NOTCH_POSITION} rounded-r-full`"
          :style="{ background: config.bgStyle, backgroundSize: config.bgIsImage ? 'cover' : undefined, backgroundPosition: 'center', backgroundAttachment: 'fixed' }"
        />
        <div
          :class="`absolute ${DEVICE_CONFIG.NOTCH_WIDTH} ${DEVICE_CONFIG.NOTCH_HEIGHT} -right-5 ${DEVICE_CONFIG.NOTCH_TOP} ${DEVICE_CONFIG.NOTCH_POSITION} rounded-l-full`"
          :style="{ background: config.bgStyle, backgroundSize: config.bgIsImage ? 'cover' : undefined, backgroundPosition: 'center', backgroundAttachment: 'fixed' }"
        />
      </div>
    </DeviceFrame>
  </div>
</template>
