<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'Image'
  },
  imageUrl: String,
  baseColor: String
});

const emit = defineEmits(['update:type', 'file-change', 'update:baseColor']);

const colorPicker = ref(null);
const currentType = ref(props.type);

// Sync local state with prop changes
watch(() => props.type, (newVal) => {
  currentType.value = newVal;
}, { immediate: true });

const onFileChange = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  emit('file-change', file);
};

const onDrop = (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (!file) return;
  emit('file-change', file);
};

const onDragOver = (e) => e.preventDefault();
</script>

<template>
  <section class="bg-white rounded-2xl border border-gray-200 shadow p-6 space-y-6">

    <!-- Type -->
    <div>
      <p class="text-sm font-medium mb-2">Type</p>
      <select 
        :value="currentType" 
        @input="(e) => { currentType = e.target.value; $emit('update:type', e.target.value); }"
        class="w-full border rounded-lg px-3 py-2 text-sm"
      >
        <option>Image</option>
        <option>Color</option>
        <option>Gradient</option>
      </select>
    </div>

    <!-- Image Upload -->
    <div v-if="currentType === 'Image'" class="space-y-2">
      <p class="text-sm font-medium mb-1">
        Upload Image <span class="text-gray-400 text-xs">(.webp, <1Mb)</span>
      </p>

      <label
        class="border-2 border-dashed border-gray-300 rounded-xl h-48 flex flex-col items-center justify-center gap-3 cursor-pointer bg-white hover:bg-gray-50 transition"
        @drop="onDrop"
        @dragover="onDragOver"
      >
        <input type="file" accept="image/*" class="hidden" @change="onFileChange" />

        <div class="flex gap-3 text-gray-500 text-xl">
          <span>⬆️</span>
          <span>📁</span>
        </div>

        <p class="text-sm text-gray-400">Drag & Drop a File Here</p>
      </label>
    </div>

    <!-- Color Picker -->
    <div v-if="currentType === 'Color'" class="space-y-3">
      <p class="text-sm font-medium mb-2">Color</p>

      <div class="flex items-center gap-4">
        <input
          :value="baseColor"
          @input="$emit('update:baseColor', $event.target.value)"
          class="px-3 py-2 border border-gray-300 rounded-lg text-sm w-32 font-mono"
        />
        <div class="relative">
          <input
            type="color"
            ref="colorPicker"
            class="absolute inset-0 opacity-0 cursor-pointer"
            :value="baseColor"
            @input="$emit('update:baseColor', $event.target.value)"
          />
          <div
            class="h-10 w-40 rounded-lg border shadow-inner cursor-pointer"
            :style="{ background: baseColor }"
            @click="colorPicker?.click()"
          ></div>
        </div>
      </div>
    </div>

  </section>
</template>
