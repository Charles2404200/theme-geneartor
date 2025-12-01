<script setup>
import { ref } from 'vue';

defineProps({
  error: String
});

const emit = defineEmits(['file-upload']);

const fileInput = ref(null);

const handleFile = (e) => {
  const file = e.target.files[0];
  if (file) {
    emit('file-upload', file);
  }
};

const handleDrop = (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file) {
    emit('file-upload', file);
  }
};
</script>

<template>
  <div>
    <p class="text-sm font-medium mb-3">Upload Image (.webp, <1Mb)</p>

    <div
      class="border border-gray-300 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center bg-white hover:bg-gray-50 transition min-h-[220px] cursor-pointer"
      @dragover.prevent
      @drop="handleDrop"
      @click="fileInput?.click()"
    >
      <div class="flex items-center gap-4 mb-4">
        <div class="text-gray-500 text-2xl">📤</div>
        <div class="text-gray-500 text-2xl">📁</div>
      </div>

      <p class="text-gray-500 text-sm">Drag & Drop a File Here</p>

      <input
        type="file"
        accept=".webp"
        ref="fileInput"
        class="hidden"
        @change="handleFile"
      />
    </div>

    <p v-if="error" class="text-red-500 mt-2 text-sm">{{ error }}</p>
  </div>
</template>
