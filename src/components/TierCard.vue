<script setup>
import { ref, watch } from 'vue';
import notNhac from '@/assets/notNhac.svg';

const props = defineProps({
  tier: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  tierName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tierData: Object  // { file, preview }
});

const emit = defineEmits(['member-upload']);

const preview = ref(props.tierData?.preview || null);

// Sync preview when tierData changes
watch(() => props.tierData?.preview, (newPreview) => {
  if (newPreview) {
    preview.value = newPreview;
  }
});

const handleSelect = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  if (!file.type.includes('webp')) return;
  if (file.size > 1024 * 1024) return;

  const reader = new FileReader();
  reader.onload = (evt) => {
    const previewUrl = evt.target.result;
    preview.value = previewUrl;
    emit('member-upload', { file, preview: previewUrl });
  };
  reader.readAsDataURL(file);
};
</script>

<template>
  <div class="grid grid-cols-2 gap-10">
    
    <!-- Upload -->
    <div>
      <p class="text-sm font-semibold mb-2">{{ label }} (.webp, <1Mb)</p>

      <label
        class="border-2 border-dashed border-gray-300 rounded-2xl h-56 flex flex-col 
        items-center justify-center cursor-pointer bg-white hover:bg-gray-50 transition"
      >
        <input type="file" accept=".webp" class="hidden" @change="handleSelect" />

        <div class="flex gap-3 text-gray-500 text-2xl mb-2">
          <span>⬆️</span>
          <span>📁</span>
        </div>

        <p class="text-sm text-gray-400">Drag & Drop a File Here</p>
      </label>
    </div>

    <!-- Preview -->
    <div>
      <p class="text-sm font-semibold mb-2">Preview</p>

      <div class="relative w-[330px] h-[200px] rounded-xl shadow overflow-hidden">
        <div class="absolute inset-0">
          <img
            v-if="preview"
            :src="preview"
            class="w-full h-full object-cover brightness-[0.55]"
            :data-preview="`member-${tier}`"
          />

          <div v-else class="w-full h-full bg-[#91a9c5]"></div>

          <div class="absolute inset-0 bg-white/10 backdrop-blur-[1px]"></div>
        </div>

        <!-- CONTENT -->
        <div class="relative z-10 text-white p-5">
          
          <p class="mt-2 text-[14px] font-semibold">Duc Tran</p>

          <div
            class="mt-2 flex items-center gap-1 bg-[#B9804E] text-white w-fit px-2 py-[2px] 
            rounded-full text-[12px] font-semibold shadow-sm"
          >
            <img :src="notNhac" class="w-6 h-6 opacity-80" />
            <span>0</span>
          </div>

          <p class="mt-3 text-[18px] font-bold tracking-wide" style="color:#B9804E;">
            {{ tierName }}
          </p>

          <div class="w-full h-[1px] bg-white/40 mt-1"></div>

          <p class="mt-1 text-[12px] leading-tight opacity-90">
            {{ description }}<br>
            <span class="font-medium" style="color:#B9804E;">
              Tìm hiểu về các hạng thẻ thành viên →
            </span>
          </p>

        </div>
      </div>
    </div>

  </div>
</template>
