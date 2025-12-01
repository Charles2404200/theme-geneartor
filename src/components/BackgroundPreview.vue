<script setup>
import { defineProps } from 'vue';

defineProps({
  type: {
    type: String,
    default: 'Image'
  },
  imageUrl: String,
  baseColor: String
});
</script>

<template>
  <section class="space-y-3">
    <div class="device">
      <div class="device-frame">
        <div class="device-header"></div>
        <div class="device-sensors"></div>

        <div class="device-content relative overflow-hidden">
          <div class="absolute top-4 left-4 right-4 h-20 bg-white rounded-xl shadow z-20"></div>

          <!-- Image Background -->
            <div v-if="type === 'Image' && imageUrl" data-preview="background" data-type="image" :data-value="imageUrl" class="absolute inset-0 z-10" :style="{ backgroundImage:`url(${imageUrl})`, backgroundSize:'cover', backgroundPosition:'center' }"></div>

          <!-- Color Background -->
          <div v-else-if="type === 'Color'" data-preview="background" data-type="color" :data-value="baseColor" class="absolute inset-0 z-10" :style="{ background: baseColor }"></div>

          <!-- Gradient Background -->
          <div v-else-if="type === 'Gradient'" data-preview="background" data-type="gradient" class="absolute inset-0 z-10 bg-gradient-to-br from-[#c28c51] to-[#f0d9b5]"></div>

          <!-- Default Background -->
          <div v-else data-preview="background" data-type="none" class="absolute inset-0 z-10 bg-gray-200"></div>
        </div>

        <div class="device-stripe"></div>
      </div>
    </div>
  </section>
</template>
