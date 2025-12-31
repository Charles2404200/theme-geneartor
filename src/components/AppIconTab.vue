<template>
  <AppIcon
    :app-icon-state="appIconState"
    :on-app-icon-change="onAppIconChange"
  />
</template>

<script setup>
import AppIcon from '@/pages/AppIcon.vue';

defineProps({
  appIconState: {
    type: Object,
    required: true
  },
  onAppIconChange: {
    type: Function,
    required: true
  }
});
</script>
