<script setup>
import { defineProps } from 'vue';

defineProps({
  preview: String
});
</script>

<template>
  <div>
    <div class="device">
      <div class="device-frame">
        <!-- Notch -->
        <div class="device-header"></div>
        <div class="device-sensors"></div>

        <!-- Content -->
        <div class="device-content bg-black">
          <img 
            v-if="preview"
            :src="preview"
            class="w-full h-full object-cover"
            data-preview="splash"
          />
        </div>

        <div class="device-stripe"></div>
      </div>
    </div>
  </div>
</template>
