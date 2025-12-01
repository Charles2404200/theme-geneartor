<script setup>
import { defineProps } from 'vue';

defineProps({
  baseColor: {
    type: String,
    required: true
  },
  shades: {
    type: Object,
    required: true
  },
  colorPicker: {
    type: Object,
    default: null
  }
});

defineEmits(['update:baseColor', 'apply-color']);

const levels = [100, 200, 300, 400, 500, 600];
</script>

<template>
  <section class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">
    <div class="flex items-center gap-6">
      <div>
        <p class="text-sm font-medium mb-2">Primary Color</p>
        <input
          :value="baseColor"
          @input="$emit('update:baseColor', $event.target.value)"
          class="px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono w-32"
        />
      </div>

      <div class="relative">
        <input
          type="color"
          ref="colorPicker"
          class="absolute inset-0 opacity-0 cursor-pointer"
          :value="baseColor"
          @input="(e) => {
            $emit('update:baseColor', e.target.value);
            $emit('apply-color', e.target.value);
          }"
        />
        <div
          class="h-10 w-64 rounded-lg border border-gray-200 shadow-inner cursor-pointer pb-[61px]"
          :style="{ background: shades[500] }"
          @click="$refs.colorPicker?.click()"
        ></div>
      </div>
    </div>

    <!-- Shades -->
    <div class="space-y-2">
      <div class="grid grid-cols-6 text-center text-xs text-gray-500">
        <div v-for="lvl in levels" :key="lvl">{{ lvl }}</div>
      </div>

      <div class="grid grid-cols-6 gap-[1px] bg-gray-200 rounded-lg overflow-hidden">
        <div
          v-for="lvl in levels"
          :key="lvl"
          class="h-12"
          :style="{ background: shades[lvl] }"
        ></div>
      </div>

      <div class="grid grid-cols-6 text-center text-[11px] text-gray-600">
        <div v-for="lvl in levels" :key="lvl" class="font-mono">
          {{ shades[lvl]?.toUpperCase() }}
        </div>
      </div>
    </div>
  </section>
</template>
