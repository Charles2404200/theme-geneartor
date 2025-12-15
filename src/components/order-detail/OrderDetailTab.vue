<script setup lang="ts">
import { reactive, watch, onMounted } from "vue"
import OrderDetailConfig from "./OrderDetailConfig.vue"
import OrderDetailPreview from "./OrderDetailPreview.vue"

const STORAGE_KEY = "order-detail-config"

const orderDetailState = reactive({
  type: "image", // image | color
  backgroundImage: "",
  backgroundColor: "#B7C9DA",
  dividerColor: "#A2B6CD",
  arrowColor: "#B9804E",
})

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    try {
      Object.assign(orderDetailState, JSON.parse(saved))
    } catch (e) {
      console.warn("Invalid order detail storage")
    }
  }
})

watch(
  orderDetailState,
  (val) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
  },
  { deep: true }
)

/**
 * ✅ HANDLE IMAGE UPLOAD
 */
function handleImageUpload(file: File) {
  const reader = new FileReader()
  reader.onload = () => {
    orderDetailState.backgroundImage = reader.result as string
    orderDetailState.type = "image"
  }
  reader.readAsDataURL(file)
}
</script>

<template>
  <div class="flex gap-12">

    <!-- LEFT -->
    <OrderDetailConfig
      :state="orderDetailState"
      @change="Object.assign(orderDetailState, $event)"
      @image-upload="handleImageUpload"
    />

    <!-- RIGHT -->
    <OrderDetailPreview :state="orderDetailState" />

  </div>
</template>
