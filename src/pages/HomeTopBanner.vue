<script setup>
import { ref } from "vue";

const bannerFile = ref(null);
const bannerPreview = ref("");
const error = ref("");

const handleSelect = (e) => {
  const f = e.target.files[0];
  process(f);
};

const process = (file) => {
  if (!file) return;

  if (!file.type.includes("webp")) {
    error.value = "Only .webp images are allowed.";
    return;
  }

  if (file.size > 1024 * 1024) {
    error.value = "File must be < 1MB.";
    return;
  }

  error.value = "";
  bannerFile.value = file;
  bannerPreview.value = URL.createObjectURL(file);
};

const handleDrop = (e) => {
  e.preventDefault();
  const f = e.dataTransfer.files[0];
  process(f);
};
</script>

<template>
  <div class="min-h-screen bg-[#f7f7fa] text-[#111827]">

    <div class="max-w-6xl mx-auto py-8 px-8 space-y-6">

      <!-- TABS -->
      <div class="border-b border-gray-200 flex gap-6 text-sm">
        <RouterLink to="/color" class="pb-3 hover:text-black text-gray-400">Color</RouterLink>
        <RouterLink to="/splash" class="pb-3 hover:text-black text-gray-400">Splash Screen</RouterLink>
        <RouterLink to="/background" class="pb-3 hover:text-black text-gray-400">Background</RouterLink>

        <button class="pb-3 border-b-2 border-[#c28c51] text-[#c28c51] font-medium">
          Home - Top Banner
        </button>

        <RouterLink to="/member" class="pb-3 hover:text-black text-gray-400">Member Card</RouterLink>
      </div>

      <div class="grid grid-cols-2 gap-14 pt-4">
        
        <!-- LEFT SECTION -->
        <div>
          <p class="text-sm font-medium mb-2">Upload Image (.webp, <1Mb)</p>
          <label
            class="border-2 border-dashed border-gray-300 rounded-xl min-h-[220px]
                   flex flex-col items-center justify-center gap-4 bg-white cursor-pointer
                   hover:bg-gray-50 transition"
            @dragover.prevent
            @drop="handleDrop"
          >

            <input
              type="file"
              class="hidden"
              accept=".webp"
              @change="handleSelect"
            />

            <div class="flex gap-6 text-2xl text-gray-500 pointer-events-none">
              <span>📤</span>
              <span>📁</span>
            </div>

            <p class="text-sm text-gray-400 pointer-events-none">Drag & Drop a File Here</p>

          </label>

          <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>
        </div>

        <!-- PREVIEW -->
        <div>
          <div
            class="w-[360px] h-[260px] rounded-xl bg-[#9fb3c9] border border-gray-300 overflow-hidden"
          >
            <img
              v-if="bannerPreview"
              :src="bannerPreview"
              class="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

