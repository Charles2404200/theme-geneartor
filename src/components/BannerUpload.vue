<script setup>
const props = defineProps({
  error: String,
});

const emit = defineEmits(['file-upload']);

const handleSelect = (e) => {
  const file = e.target.files[0];
  if (file) emit('file-upload', file);
};

const handleDrop = (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file) emit('file-upload', file);
};
</script>

<template>
  <div class="space-y-6">
    <!-- LABEL -->
    <p class="text-sm font-medium mb-2">
      Upload Image <span class="text-xs text-gray-400">(.webp, <1Mb)</span>
    </p>

    <!-- UPLOAD BOX -->
    <label
      class="border-2 border-dashed border-gray-300 rounded-xl min-h-[220px]
             flex flex-col items-center justify-center gap-4 bg-white cursor-pointer
             hover:bg-gray-50 transition"
      @dragover.prevent
      @drop="handleDrop"
    >
      <input
        type="file"
        accept=".webp"
        class="hidden"
        @change="handleSelect"
      />

      <div class="flex gap-6 text-2xl text-gray-500 pointer-events-none">
        <span>📤</span>
        <span>📁</span>
      </div>

      <p class="text-sm text-gray-400 pointer-events-none">
        Drag & Drop a File Here
      </p>
    </label>

    <!-- ERROR -->
    <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
  </div>
</template>
