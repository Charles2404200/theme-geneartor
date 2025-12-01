<script setup>
import { ref } from "vue";

import SplashUpload from "@/components/SplashUpload.vue";
import SplashPreview from "@/components/SplashPreview.vue";

const props = defineProps({
  onSplashChange: Function,
  splashPreview: String 
});

const file = ref(null);
const preview = ref(props.splashPreview || null);
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
    if (typeof props.onSplashChange === 'function') {
      props.onSplashChange({ file: fileObj, preview: previewUrl });
    }
  };
  reader.readAsDataURL(fileObj);
};
</script>

<template>
  <div class="page-splash">
    <div class="grid grid-cols-2 gap-20 items-start pt-4">

      <!-- UPLOAD SECTION -->
      <SplashUpload 
        :error="error"
        @file-upload="processFile"
      />

      <!-- PREVIEW SECTION -->
      <SplashPreview :preview="preview" />

    </div>
  </div>
</template>
