<template>
  <div class="mt-4 space-y-4">
    <p class="text-sm font-medium text-gray-700">Logo position &amp; size</p>

    <!-- Touchpad area -->
    <div
      ref="padRef"
      class="relative w-40 h-40 bg-gray-50 border border-dashed border-gray-300 rounded-lg cursor-pointer select-none"
      @mousedown="onPadMouseDown"
    >
      <div
        class="absolute w-4 h-4 rounded-full bg-amber-500 shadow cursor-move border border-white"
        :style="handleStyle"
      ></div>
    </div>

    <!-- Size slider -->
    <div class="flex items-center gap-3">
      <span class="text-xs text-gray-500 w-16">Size</span>
      <input
        type="range"
        min="0.5"
        max="1.5"
        step="0.05"
        v-model.number="localScale"
        @input="emitChange"
        class="flex-1 accent-amber-500"
      />
      <span class="text-xs text-gray-500 w-10 text-right">{{ Math.round(localScale * 100) }}%</span>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({ x: 0.5, y: 0.5, scale: 1 })
  }
});

const emit = defineEmits(['update:modelValue']);

const padRef = ref(null);
const isDragging = ref(false);

const localScale = ref(props.modelValue.scale ?? 1);

watch(
  () => props.modelValue.scale,
  (val) => {
    if (typeof val === 'number') {
      localScale.value = val;
    }
  }
);

const handleStyle = computed(() => {
  const x = (props.modelValue.x ?? 0.5) * 100;
  const y = (props.modelValue.y ?? 0.5) * 100;

  return {
    left: `${x}%`,
    top: `${y}%`,
    transform: 'translate(-50%, -50%)'
  };
});

const updatePosition = (event) => {
  if (!padRef.value) return;
  const rect = padRef.value.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width;
  const y = (event.clientY - rect.top) / rect.height;

  const clampedX = Math.min(1, Math.max(0, x));
  const clampedY = Math.min(1, Math.max(0, y));

  emit('update:modelValue', {
    x: clampedX,
    y: clampedY,
    scale: localScale.value
  });
};

const onMouseMove = (event) => {
  if (!isDragging.value) return;
  updatePosition(event);
};

const onMouseUp = () => {
  isDragging.value = false;
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);
};

const onPadMouseDown = (event) => {
  isDragging.value = true;
  updatePosition(event);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
};

const emitChange = () => {
  emit('update:modelValue', {
    x: props.modelValue.x ?? 0.5,
    y: props.modelValue.y ?? 0.5,
    scale: localScale.value
  });
};

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);
});
</script>
