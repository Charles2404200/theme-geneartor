<script setup>
import { ref, onMounted } from "vue";
import { ColorPicker } from "vue-color-kit";
import "vue-color-kit/dist/vue-color-kit.css";
import { generateShades } from "../utils/colorShades";
import { setPrimary } from "../utils/setTheme";

const color = ref("#ad1010");
const shades = ref(generateShades(color.value));

const showPicker = ref(false);

const updateColor = (hex) => {
  color.value = hex;
  shades.value = generateShades(hex);
  setPrimary(hex);
  localStorage.setItem("primaryColor", hex);
};

onMounted(() => {
  const saved = localStorage.getItem("primaryColor");
  if (saved) updateColor(saved);
});
</script>

<template>
  <div class="p-6 bg-white rounded-2xl border shadow-sm space-y-5 relative">

    <div class="flex items-center gap-6">
      <!-- HEX input -->
      <div class="flex flex-col">
        <p class="text-sm font-medium mb-2">Primary Color</p>
        <input
          v-model="color"
          @input="updateColor(color)"
          class="px-3 py-2 border rounded-lg text-sm font-mono w-28"
        />
      </div>
      <div
        class="h-12 w-64 rounded-xl border cursor-pointer shadow-inner"
        :style="{ background: color }"
        @click="showPicker = !showPicker"
      ></div>
    </div>

    <!-- SHADES GRID -->
    <div class="space-y-2">
      <div class="grid grid-cols-6 text-center text-xs text-gray-600">
        <div>100</div><div>200</div><div>300</div><div>400</div><div>500</div><div>600</div>
      </div>

      <div class="grid grid-cols-6 gap-[1px] bg-gray-200 rounded-xl overflow-hidden">
        <div v-for="lvl in [100,200,300,400,500,600]"
             :key="lvl"
             class="h-12"
             :style="{ background: shades[lvl] }"
        ></div>
      </div>

      <div class="grid grid-cols-6 text-center text-[11px] text-gray-600 mt-1 font-mono">
        <div v-for="lvl in [100,200,300,400,500,600]"
             :key="lvl"
        >
          {{ shades[lvl].toUpperCase() }}
        </div>
      </div>
    </div>

    <!-- COLOR PICKER FLOATING -->
    <transition name="fade">
      <div
        v-if="showPicker"
        class="absolute top-20 left-40 z-50 bg-white shadow-xl border rounded-xl"
      >
        <ColorPicker
          v-model:pureColor="color"
          @pureColorChange="updateColor"
          format="hex"
        />
      </div>
    </transition>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
