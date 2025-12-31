<template>
  <div class="bg-white rounded-lg p-6 shadow-sm">
    <h3 class="text-base font-semibold text-gray-900 mb-6">{{ title }}</h3>

    <!-- Upload Area -->
    <div class="space-y-6">
      <!-- Background Upload -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Background (1024x1024px, .png, <1Mb)
        </label>
        <div
          @dragover.prevent="isDraggingBg = true"
          @dragleave.prevent="isDraggingBg = false"
          @drop.prevent="handleDropBg"
          :class="[
            'border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer',
            isDraggingBg ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50 hover:border-gray-400'
          ]"
          @click="backgroundInputRef?.click()"
        >
          <input
            ref="backgroundInputRef"
            type="file"
            accept="image/png"
            class="hidden"
            @change="handleBackgroundChange"
          />
          <div class="flex flex-col items-center gap-2">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7m-6 4h2m0 0h2" />
            </svg>
            <p class="text-gray-500 text-sm">Drag & Drop a File Here</p>
          </div>
          <p v-if="background.file" class="text-xs text-green-600 mt-2">✓ {{ background.file.name }}</p>
        </div>
      </div>

      <!-- Logo Upload (Android only) -->
      <div v-if="platform === 'android'">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Logo (1024x1024px, .png, <1Mb)
        </label>
        <div
          @dragover.prevent="isDraggingLogo = true"
          @dragleave.prevent="isDraggingLogo = false"
          @drop.prevent="handleDropLogo"
          :class="[
            'border-2 border-dashed rounded-lg p-4 text-center transition-colors cursor-pointer flex flex-col items-center justify-center bg-gray-50 gap-3',
            isDraggingLogo ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          ]"
          @click="logoInputRef?.click()"
        >
          <input
            ref="logoInputRef"
            type="file"
            accept="image/png"
            class="hidden"
            @change="handleLogoChange"
          />

          <div v-if="logo.preview" class="flex justify-center">
            <img
              :src="logo.preview"
              alt="Logo preview"
              class="w-16 h-16 object-contain"
            />
          </div>

          <div v-else class="text-gray-500 text-sm">Drag &amp; Drop a Logo</div>

          <p class="text-xs text-gray-500">Click to upload or drop a file</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  platform: {
    type: String,
    enum: ['ios', 'android'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  background: {
    type: Object,
    required: true
  },
  logo: {
    type: Object,
    default: () => ({ file: null, preview: null })
  }
});

const emit = defineEmits(['update:background', 'update:logo']);

const backgroundInputRef = ref(null);
const logoInputRef = ref(null);
const isDraggingBg = ref(false);
const isDraggingLogo = ref(false);

const handleBackgroundChange = (e) => {
  const file = e.target.files?.[0];
  if (file) {
    validateAndUpdateBackground(file);
  }
};

const handleDropBg = (e) => {
  isDraggingBg.value = false;
  const file = e.dataTransfer.files?.[0];
  if (file) {
    validateAndUpdateBackground(file);
  }
};

const handleLogoChange = (e) => {
  const file = e.target.files?.[0];
  if (file) {
    validateAndUpdateLogo(file);
  }
};

const handleDropLogo = (e) => {
  isDraggingLogo.value = false;
  const file = e.dataTransfer.files?.[0];
  if (file) {
    validateAndUpdateLogo(file);
  }
};

const validateAndUpdateBackground = (file) => {
  if (file.type !== 'image/png') {
    alert('Please upload a PNG file');
    return;
  }

  if (file.size > 1024 * 1024) {
    alert('File size must be less than 1MB');
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    emit('update:background', {
      file,
      preview: e.target.result
    });
  };
  reader.readAsDataURL(file);
};

const validateAndUpdateLogo = (file) => {
  if (file.type !== 'image/png') {
    alert('Please upload a PNG file');
    return;
  }

  if (file.size > 1024 * 1024) {
    alert('File size must be less than 1MB');
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    emit('update:logo', {
      file,
      preview: e.target.result
    });
  };
  reader.readAsDataURL(file);
};
</script>
