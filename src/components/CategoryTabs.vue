<script setup>
import { ref, defineProps } from 'vue';

defineProps({
  shades: {
    type: Object,
    required: true
  }
});

const tabs = ['Ưu đãi', 'Syphon', 'Moka Pot', 'Cà phê'];
const activeTab = ref(0);
</script>

<template>
  <div>
    <!-- Tabs -->
    <div class="px-4 mt-3 flex gap-2 overflow-x-auto no-scrollbar pb-3 fade-divider">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        @click="activeTab = index"
        :class="[
          'px-3 py-1.5 text-[12px] font-medium rounded-lg border shadow-sm whitespace-nowrap transition',
          index === activeTab
            ? 'text-white'
            : 'border-gray-200 bg-white text-gray-700'
        ]"
        :style="
          index === activeTab
            ? {
                background: shades[500],
                borderColor: shades[500],
                color: '#fff'
              }
            : {}
        "
      >
        {{ tab }}
      </button>
    </div>

    <!-- STORE -->
    <div class="px-4 mt-3">
      <div class="px-3 py-2 bg-white border rounded-full text-[12px] flex items-center justify-between">
        <span>Phê La - Hồ Tùng Mậu</span>
      </div>
    </div>
  </div>
</template>
