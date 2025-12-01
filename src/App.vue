<template>
  <div class="flex">
    <div class="w-72 border-r h-screen p-4 bg-white">
      <ThemeGenerator />
    </div>

    <div class="flex-1">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import ThemeGenerator from "./components/ThemeGenerator.vue";
</script>
