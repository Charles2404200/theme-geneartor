<script setup>
defineProps({
  preview: String,
});
</script>

<template>
  <div>
    <div class="w-[360px] h-[260px] rounded-xl bg-[#9fb3c9] border border-gray-300 overflow-hidden" data-preview="banner">
      <img 
        v-if="preview" 
        :src="preview" 
        class="w-full h-full object-cover"
        data-preview="banner-img"
      >
    </div>
  </div>
</template>
