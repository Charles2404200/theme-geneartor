import { ref } from "vue"
export function useColorPicker() {
  const colorPickerRef = ref<HTMLInputElement | null>(null)

  function openColorPicker() {
    colorPickerRef.value?.click()
  }

  return {
    colorPickerRef,
    openColorPicker,
  }
}
