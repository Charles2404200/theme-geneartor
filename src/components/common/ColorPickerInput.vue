<script setup lang="ts">
import { useColorPicker } from "@/composables/useColorPicker"

interface Props {
  label: string
  modelValue: string
  defaultValue?: string
}

interface Emits {
  (e: "update:modelValue", value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  defaultValue: "#000000",
})

const emit = defineEmits<Emits>()

const { colorPickerRef, openColorPicker } = useColorPicker()

function handleColorChange(event: Event) {
  const target = event.target as HTMLInputElement
  emit("update:modelValue", target.value)
}

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit("update:modelValue", target.value)
}
</script>

<template>
  <section class="space-y-3">
    <label class="block text-base font-medium">
      {{ label }}
    </label>

    <div class="flex items-center gap-6">
      <!-- HEX INPUT -->
      <input
        class="px-3 py-2 border border-gray-300 rounded-lg
               text-sm font-mono w-32"
        :value="modelValue ?? defaultValue"
        @input="handleInput"
      />

      <!-- COLOR PICKER -->
      <div class="relative">
        <input
          ref="colorPickerRef"
          type="color"
          class="absolute inset-0 opacity-0 cursor-pointer"
          :value="modelValue ?? defaultValue"
          @input="handleColorChange"
        />
        <div
          class="h-10 w-64 rounded-lg border border-gray-200
                 shadow-inner cursor-pointer hover:opacity-80 transition"
          :style="{ background: modelValue ?? defaultValue }"
          @click="openColorPicker"
        />
      </div>
    </div>
  </section>
</template>
