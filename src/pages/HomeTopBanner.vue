<script setup>
import { ref } from "vue";
import BannerUpload from "@/components/BannerUpload.vue";
import BannerPreview from "@/components/BannerPreview.vue";

const props = defineProps({
  navigate: Function,
  onBannerChange: Function,
  bannerPreview: String  // preview URL from centralized state
});

const file = ref(null);
const preview = ref(props.bannerPreview || "");
const error = ref("");

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
  
  const reader = new FileReader();
  reader.onload = (e) => {
    const previewUrl = e.target.result;
    preview.value = previewUrl;
    // Pass both file and preview to store in state
    if (typeof props.onBannerChange === 'function') {
      props.onBannerChange({ file: fileObj, preview: previewUrl });
    }
  };
  reader.readAsDataURL(fileObj);
};

const goTo = (tab) => {
  if (props.navigate && typeof props.navigate === 'function') props.navigate(tab);
};
</script>

<template>
  <div class="page-banner">
    <div class="flex justify-end gap-3 mb-4">
    </div>

    <div class="grid grid-cols-2 gap-20 items-start pt-4">

      <!-- LEFT: CONFIG -->
      <BannerUpload 
        :error="error" 
        @file-upload="processFile"
      />

      <!-- RIGHT: PREVIEW -->
      <BannerPreview :preview="preview" />

    </div>
  </div>
</template>
