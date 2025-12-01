<script setup>
import { ref, watch, computed } from "vue";
import { generateShades } from "../utils/colorShades";
import { setPrimary } from "../utils/setTheme";

import BackgroundConfig from "@/components/BackgroundConfig.vue";
import BackgroundPreview from "@/components/BackgroundPreview.vue";

const props = defineProps({
  onBackgroundChange: Function,
  backgroundState: Object  // { type, fileKey, file, preview }
});

// Initialize from backgroundState first, then fallback to defaults
const type = ref(props.backgroundState?.type?.charAt(0).toUpperCase() + props.backgroundState?.type?.slice(1).toLowerCase() || "Image");
const imageUrl = ref(props.backgroundState?.preview || "");   // preview only (blob URL)
const imageFile = ref(props.backgroundState?.file || null);
const baseColor = ref("#F1EADA");
const shades = ref(generateShades(baseColor.value));

// Khi user upload file
const onFileChange = (file) => {
  if (!file) return;

  imageFile.value = file;

  // chỉ preview — KHÔNG gửi blob cho schema
  const blobUrl = URL.createObjectURL(file);
  imageUrl.value = blobUrl;

  notifyChange();
};

// Gửi schema lên parent
const notifyChange = () => {
  if (typeof props.onBackgroundChange !== 'function') return;

  const key = "background-main";
  props.onBackgroundChange({
    type: type.value.toLowerCase(),
    fileKey: key,
    preview: imageUrl.value,
    file: imageFile.value,
  });
};

// Color change
const applyColor = (hex) => {
  const valid = /^#([0-9a-fA-F]{6})$/.test(hex);
  if (!valid) return;
  shades.value = generateShades(hex);
  setPrimary(hex);

  props.onBackgroundChange({
    type: "color",
    value: hex,
    fileKey: null,
    file: null
  });
};

watch(baseColor, (v) => applyColor(v));
watch(type, () => notifyChange());
watch(() => props.backgroundState?.type, (newType) => {
  if (newType) {
    type.value = newType.charAt(0).toUpperCase() + newType.slice(1).toLowerCase();
  }
}, { deep: true });
</script>

<template>
  <div class="page-background">
    <div class="grid grid-cols-2 gap-10 items-start">

      <!-- CONFIG SECTION -->
      <BackgroundConfig 
        :type="type"
        :image-url="imageUrl"
        :base-color="baseColor"
        @update:type="type = $event"
        @file-change="onFileChange"
        @update:baseColor="baseColor = $event"
      />
      <BackgroundPreview
        :type="type"
        :image-url="imageUrl"
        :base-color="baseColor"
      />

    </div>
  </div>
</template>
