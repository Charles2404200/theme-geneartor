<script setup lang="ts">
import ColorPickerInput from "@/components/common/ColorPickerInput.vue"

const props = defineProps<{
  logoColor?: string
  bgColor?: string
}>()

const emit = defineEmits<{
  (e: "change", payload: { logoColor?: string; bgColor?: string }): void
}>()
</script>

<template>
  <div class="w-[420px] space-y-8">
    <ColorPickerInput
      label="Logo Color"
      :model-value="logoColor ?? '#000000'"
      default-value="#000000"
      @update:model-value="emit('change', { logoColor: $event })"
    />

    <ColorPickerInput
      label="Background Color"
      :model-value="bgColor ?? '#B9804E'"
      default-value="#B9804E"
      @update:model-value="emit('change', { bgColor: $event })"
    />
  </div>
</template>
