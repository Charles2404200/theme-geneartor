<script setup>
import { ref } from "vue";

const file = ref(null);               
const preview = ref(null);            
const error = ref("");

const handleFile = (e) => {
  const f = e.target.files[0];
  processFile(f);
};

const processFile = (fileObj) => {
  if (!fileObj) return;

  if (!fileObj.type.includes("webp")) {
    error.value = "Only .webp images are allowed.";
    return;
  }
  if (fileObj.size > 1024 * 1024) {
    error.value = "File must be smaller than 1MB.";
    return;
  }

  error.value = "";
  file.value = fileObj;
  preview.value = URL.createObjectURL(fileObj);
};

// Handle drop
const handleDrop = (e) => {
  e.preventDefault();
  const f = e.dataTransfer.files[0];
  processFile(f);
};
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
      <div class="border-b border-gray-200 flex gap-6 text-sm">
        <RouterLink to="/color" class="pb-3 text-gray-400 hover:text-black">Color</RouterLink>
        <RouterLink to="/splash" class="pb-3 border-b-2 border-primary-500 text-primary-500 font-medium">
          Splash Screen
        </RouterLink>
        <RouterLink to="/background" class="pb-3 text-gray-400 hover:text-black">Background</RouterLink>
        <RouterLink to="/banner" class="pb-3 text-gray-400 hover:text-black">Home - Top Banner</RouterLink>
        <RouterLink to="/member" class="pb-3 text-gray-400 hover:text-black">Member Card</RouterLink>
      </div>
      <div class="grid grid-cols-2 gap-20 items-start pt-4">

        <!-- LEFT UPLOAD BOX -->
        <div>
          <p class="text-sm font-medium mb-3">Upload Image (.webp, &lt;1Mb)</p>

          <div
            class="border border-gray-300 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center bg-white hover:bg-gray-50 transition min-h-[220px] cursor-pointer"
            @dragover.prevent
            @drop="handleDrop"
            @click="$refs.fileInput.click()"
          >
            <!-- Icons -->
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
        <!-- RIGHT PREVIEW BOX -->
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
        />
      </div>

      <div class="device-stripe"></div>

    </div>

  </div>
</div>

      </div>
    </div>
  </div>
</template>
