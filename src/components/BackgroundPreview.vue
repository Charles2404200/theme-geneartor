<script setup>
import { defineProps } from 'vue';

defineProps({
  type: { type: String, default: 'Image' },
  imageUrl: String,
  baseColor: String,
  dividerColor: { type: String, default: '#A2B6CD' },
  textColor: { type: String, default: '#B9804E' },
  hotlineColor: { type: String, default: '#101010' }
});
</script>

<template>
  <section class="space-y-3">
    <div class="device">
      <div class="device-frame">
        <div class="device-header"></div>
        <div class="device-sensors"></div>

        <div class="device-content relative overflow-hidden">

          <!-- Background -->
          <div 
            v-if="type === 'Image' && imageUrl"
            class="absolute inset-0 z-10"
            :style="{
              backgroundImage:`url(${imageUrl})`,
              backgroundSize:'cover',
              backgroundPosition:'center'
            }"
          ></div>

          <div 
            v-else-if="type === 'Color'"
            class="absolute inset-0 z-10"
            :style="{ background: baseColor }"
          ></div>

          <div 
            v-else-if="type === 'Gradient'"
            class="absolute inset-0 z-10 bg-gradient-to-br from-[#c28c51] to-[#f0d9b5]"
          ></div>

          <div 
            v-else 
            class="absolute inset-0 z-10"
            :style="{ background: dividerColor }"
          ></div>
          <div 
            class="absolute left-4 right-4 bg-white rounded-2xl shadow-lg z-20"
            style="
              top: 16px; 
              height: 760px;
              -webkit-mask-image: 
                radial-gradient(circle 8px at 0% 68.4%, transparent 0, transparent 8px, black 8.5px),
                radial-gradient(circle 4px at 3% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 6% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 9% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 12% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 15% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 18% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 21% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 24% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 27% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 30% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 33% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 36% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 39% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 42% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 45% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 48% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 51% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 54% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 57% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 60% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 63% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 66% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 69% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 72% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 75% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 78% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 81% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 84% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 87% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 90% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 93% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 96% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 8px at 100% 68.4%, transparent 0, transparent 8px, black 8.5px);
              -webkit-mask-composite: source-in;
              mask-image: 
                radial-gradient(circle 8px at 0% 68.4%, transparent 0, transparent 8px, black 8.5px),
                radial-gradient(circle 4px at 3% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 6% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 9% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 12% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 15% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 18% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 21% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 24% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 27% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 30% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 33% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 36% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 39% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 42% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 45% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 48% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 51% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 54% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 57% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 60% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 63% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 66% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 69% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 72% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 75% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 78% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 81% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 84% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 87% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 90% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 93% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 4px at 96% 68.4%, transparent 0, transparent 4px, black 4.5px),
                radial-gradient(circle 8px at 100% 68.4%, transparent 0, transparent 8px, black 8.5px);
              mask-composite: intersect;
            "
          >
            <div class="w-full" style="height: 520px;"></div>
            <div class="relative h-[2px]" :style="{ backgroundColor: dividerColor }"></div>
            <div class="w-full flex-1"></div>

          </div>
          <div class="absolute left-4 right-4 z-30 flex flex-col items-center gap-2" style="top: 790px;">
            <p 
              class="text-[11px] tracking-wide"
              :style="{ color: textColor }"
            >
              Bạn cần hỗ trợ hãy liên hệ hotline
            </p>

            <p 
              class="text-base font-semibold flex items-center gap-1.5"
              :style="{ color: hotlineColor }"
            >
              <span class="text-lg">📞</span>
              <span>1900 3013</span>
            </p>
          </div>

        </div>

        <div class="device-stripe"></div>
      </div>
    </div>
  </section>
</template>
