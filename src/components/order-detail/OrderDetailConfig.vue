<script setup lang="ts">
import { ref } from "vue"
import ColorPickerInput from "@/components/common/ColorPickerInput.vue"

defineProps<{
  state: {
    type: string
    backgroundImage: string
    backgroundColor: string
    dividerColor: string
    arrowColor: string
  }
}>()

const emit = defineEmits<{
  (e: "change", payload: Partial<any>): void
}>()

const fileInput = ref<HTMLInputElement | null>(null)

function handleFileInput(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (file) {
    handleImageFile(file)
  }
}

function handleImageFile(file: File) {
  const reader = new FileReader()
  reader.onload = () => {
    emit('change', { backgroundImage: reader.result as string, type: 'image' })
  }
  reader.readAsDataURL(file)
}

function handleDrop(event: DragEvent) {
  event.preventDefault()
  const file = event.dataTransfer?.files?.[0]
  if (file && file.type.startsWith('image/')) {
    handleImageFile(file)
  }
}

function handleDragOver(event: DragEvent) {
  event.preventDefault()
}
</script>

<template>
  <div class="w-[420px] space-y-8">

    <!-- TYPE -->
    <section>
      <label class="block text-base font-medium mb-2">Type</label>
      <select
        class="w-full h-11 border rounded-lg px-3"
        :value="state.type"
        @change="emit('change', { type: $event.target.value })"
      >
        <option value="image">Image</option>
        <option value="color">Color</option>
      </select>
    </section>

    <!-- IMAGE UPLOAD -->
    <section v-if="state.type === 'image'">
      <label class="block text-base font-medium mb-3">
        Upload Image (.webp, &lt;1Mb)
      </label>

      <div
        class="h-36 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50 transition"
        @drop="handleDrop"
        @dragover="handleDragOver"
        @click="fileInput?.click()"
      >
        <p class="text-sm">Drag & Drop a File Here</p>
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          class="hidden"
          @change="handleFileInput"
        />
      </div>
    </section>

    <!-- PERFORATED DIVIDER COLOR -->
    <ColorPickerInput
      label="Perforated Divider Color"
      :model-value="state.dividerColor"
      @update:model-value="emit('change', { dividerColor: $event })"
    />

    <!-- ARROW COLOR -->
    <ColorPickerInput
      label="Arrow Color"
      :model-value="state.arrowColor"
      @update:model-value="emit('change', { arrowColor: $event })"
    />
    <ColorPickerInput
      v-if="state.type === 'color'"
      label="Background Color"
      :model-value="state.backgroundColor"
      @update:model-value="emit('change', { backgroundColor: $event })"
    />

  </div>
</template>
