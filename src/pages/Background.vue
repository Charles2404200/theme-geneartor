<script setup>
import { ref, watch, onMounted } from "vue";
import { generateShades } from "../utils/colorShades";
import { setPrimary } from "../utils/setTheme";
import { RouterLink } from "vue-router";

/* --------------------------
   STATE
---------------------------*/
const type = ref("Image");

// IMAGE UPLOAD
const imageFile = ref(null);
const imageUrl = ref("");

// COLOR PICKER STATE
const baseColor = ref("#F1EADA"); // màu default theo hình bạn đưa
const shades = ref(generateShades(baseColor.value)); 
const colorPicker = ref(null);

/* --------------------------
   FUNCTIONS
---------------------------*/
const onFileChange = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  imageFile.value = file;
  imageUrl.value = URL.createObjectURL(file);
};

const onDrop = (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (!file) return;

  imageFile.value = file;
  imageUrl.value = URL.createObjectURL(file);
};

const onDragOver = (e) => e.preventDefault();

// Apply color (same as Color.vue)
const applyColor = (hex) => {
  const valid = /^#([0-9a-fA-F]{6})$/.test(hex);
  if (!valid) return;
  shades.value = generateShades(hex);
  setPrimary(hex);
};

watch(baseColor, (v) => applyColor(v));
</script>

<template>
  <div class="min-h-screen bg-[#f7f7fa] text-[#111827]">
    <div class="max-w-6xl mx-auto py-8 px-8 space-y-6">

      <!-- Header -->
      <div>
        <p class="text-xs text-gray-400">Campaigns</p>
        <h1 class="text-2xl font-semibold mt-1">Config Interface</h1>
      </div>

      <!-- Tabs -->
      <div class="border-b border-gray-200">
        <div class="flex gap-6 text-sm">
          <RouterLink to="/color" class="pb-3 text-gray-400 hover:text-black">Color</RouterLink>
          <RouterLink to="/splash" class="pb-3 text-gray-400 hover:text-black">Splash Screen</RouterLink>

          <button class="pb-3 border-b-2 border-[#c28c51] font-medium text-[#c28c51]">
            Background
          </button>

          <RouterLink to="/banner" class="pb-3 text-gray-400 hover:text-black">Home - Top Banner</RouterLink>
          <RouterLink to="/member" class="pb-3 text-gray-400 hover:text-black">Member Card</RouterLink>
        </div>
      </div>

      <!-- LAYOUT -->
      <div class="grid grid-cols-2 gap-10 items-start">

        <section class="bg-white rounded-2xl border border-gray-200 shadow p-6 space-y-6">

          <!-- Type -->
          <div>
            <p class="text-sm font-medium mb-2">Type</p>
            <select v-model="type" class="w-full border rounded-lg px-3 py-2 text-sm">
              <option>Image</option>
              <option>Color</option>
              <option>Gradient</option>
            </select>
          </div>

          <div v-if="type === 'Image'" class="space-y-2">
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
          <div v-if="type === 'Color'" class="space-y-3">
            <p class="text-sm font-medium mb-2">Color</p>

            <div class="flex items-center gap-4">
              <input
                v-model="baseColor"
                class="px-3 py-2 border border-gray-300 rounded-lg text-sm w-32 font-mono"
              />
              <div class="relative">
                <input
                  type="color"
                  ref="colorPicker"
                  class="absolute inset-0 opacity-0 cursor-pointer"
                  v-model="baseColor"
                />
                <div
                  class="h-10 w-40 rounded-lg border shadow-inner cursor-pointer"
                  :style="{ background: baseColor }"
                  @click="colorPicker.click()"
                ></div>
              </div>

            </div>
          </div>

        </section>

        <!-- RIGHT PREVIEW -->
        <section class="space-y-3">

          <div class="device">
            <div class="device-frame">
              <div class="device-header"></div>
              <div class="device-sensors"></div>

              <div class="device-content relative overflow-hidden">
                <div class="absolute top-4 left-4 right-4 h-20 bg-white rounded-xl shadow z-20"></div>
                <div
                  v-if="type === 'Image' && imageUrl"
                  class="absolute inset-0 z-10"
                  :style="{
                    backgroundImage:`url(${imageUrl})`,
                    backgroundSize:'cover',
                    backgroundPosition:'center'
                  }"
                ></div>

                <div
                  v-else-if="type === 'Color'"
                  class="absolute inset-0 z-10"
                  :style="{ background: baseColor }"
                ></div>

                <div
                  v-else-if="type === 'Gradient'"
                  class="absolute inset-0 z-10 bg-gradient-to-br from-[#c28c51] to-[#f0d9b5]"
                ></div>

                <div v-else class="absolute inset-0 z-10 bg-gray-200"></div>

              </div>

              <div class="device-stripe"></div>
            </div>
          </div>
        </section>

      </div>
    </div>
  </div>
</template>
