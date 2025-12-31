<template>
  <div class="rounded-2xl bg-white shadow-sm border border-gray-100 p-6">
    <!-- Header: Preview label -->
    <p class="text-sm font-medium text-gray-900 mb-6">Preview</p>

    <!-- Two columns: iOS and Android -->
    <div class="flex gap-8 justify-center">
      <!-- iOS Column -->
      <div class="space-y-3">
        <p class="text-sm font-medium text-gray-700 text-center">iOS</p>
        <div class="w-64 h-64 rounded-3xl overflow-hidden bg-gray-200 flex items-center justify-center shadow-inner">
          <img
            v-if="iosBackground.preview"
            :src="iosBackground.preview"
            alt="iOS Preview"
            class="w-full h-full object-cover"
          />
          <div v-else class="text-gray-400 text-sm text-center px-4">
            Upload iOS background
          </div>
        </div>
      </div>

      <!-- Android Column -->
      <div class="space-y-3">
        <p class="text-sm font-medium text-gray-700 text-center">Android</p>
        <div class="w-64 h-64 rounded-3xl overflow-hidden bg-gray-200 flex items-center justify-center shadow-inner relative">
          <!-- Background -->
          <img
            v-if="androidBackground.preview"
            :src="androidBackground.preview"
            alt="Android Background"
            class="absolute inset-0 w-full h-full object-cover"
          />
          
          <!-- Logo Overlay controlled by widget -->
          <img
            v-if="androidLogo.preview"
            :src="androidLogo.preview"
            alt="Logo"
            class="absolute w-24 h-24 object-contain"
            :style="logoStyle"
          />

          <div
            v-if="!androidBackground.preview && !androidLogo.preview"
            class="text-gray-400 text-sm text-center px-4 relative z-10"
          >
            Upload Android background &amp; logo
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  iosBackground: {
    type: Object,
    required: true
  },
  androidBackground: {
    type: Object,
    required: true
  },
  androidLogo: {
    type: Object,
    required: true
  },
  androidLogoTransform: {
    type: Object,
    default: () => ({ x: 0.5, y: 0.5, scale: 1 })
  }
});

const logoStyle = computed(() => {
  const x = (props.androidLogoTransform?.x ?? 0.5) * 100;
  const y = (props.androidLogoTransform?.y ?? 0.5) * 100;
  const scale = props.androidLogoTransform?.scale ?? 1;

  return {
    left: `${x}%`,
    top: `${y}%`,
    transform: `translate(-50%, -50%) scale(${scale})`,
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))'
  };
});
</script>
