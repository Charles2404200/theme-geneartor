<template>
  <div class="bg-white rounded-2xl shadow-sm p-8 space-y-8">
    <!-- Header: breadcrumb + title + actions -->
    <div class="flex items-start justify-between">
      <div>
        <p class="text-xs text-gray-400">Config App Icon</p>
        <h1 class="text-2xl font-semibold text-gray-900 mt-1">Add New App Icon</h1>
      </div>

      <div class="flex items-center gap-3">
        <button
          type="button"
          class="px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-700 bg-white hover:bg-gray-50"
        >
          Save
        </button>
        <button
          type="button"
          class="px-4 py-2 rounded-full bg-amber-500 text-sm text-white font-medium shadow hover:bg-amber-600"
        >
          Save &amp; Publish
        </button>
      </div>
    </div>

    <!-- Title Input (full width) -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
      <input
        v-model="form.title"
        @input="emitChange"
        type="text"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
        placeholder="Enter app icon title"
      />
    </div>

    <!-- Main content: form left, preview right -->
    <div class="grid grid-cols-[3fr_2fr] gap-12 items-start">
      <!-- LEFT COLUMN: tabs + upload form -->
      <div class="space-y-6">
        <!-- iOS / Android tabs -->
        <div class="border-b border-gray-200">
          <div class="flex gap-8 text-sm">
            <button
              @click="activeTab = 'ios'"
              :class="[
                'pb-3 px-1 font-medium transition-colors',
                activeTab === 'ios'
                  ? 'border-b-2 border-amber-600 text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              ]"
            >
              iOS
            </button>
            <button
              @click="activeTab = 'android'"
              :class="[
                'pb-3 px-1 font-medium transition-colors',
                activeTab === 'android'
                  ? 'border-b-2 border-amber-600 text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              ]"
            >
              Android
            </button>
          </div>
        </div>

        <!-- iOS Section -->
        <div v-if="activeTab === 'ios'">
          <IconUploadForm
            platform="ios"
            title="iOS"
            :background="iosData.background"
            @update:background="updateIosBackground"
          />
        </div>

        <!-- Android Section -->
        <div v-if="activeTab === 'android'">
          <IconUploadForm
            platform="android"
            title="Android"
            :background="androidData.background"
            :logo="androidData.logo"
            @update:background="updateAndroidBackground"
            @update:logo="updateAndroidLogo"
          />
        </div>
      </div>

      <!-- RIGHT COLUMN: Preview + logo position widget -->
      <div class="flex flex-col items-end mt-8">
        <IconPreview
          :ios-background="iosData.background"
          :android-background="androidData.background"
          :android-logo="androidData.logo"
          :android-logo-transform="androidLogoTransform"
        />

        <LogoPositionControl
          v-model="androidLogoTransform"
          class="mt-4"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import IconUploadForm from '@/components/app-icon/IconUploadForm.vue';
import IconPreview from '@/components/app-icon/IconPreview.vue';
import LogoPositionControl from '@/components/app-icon/LogoPositionControl.vue';

const props = defineProps({
  appIconState: {
    type: Object,
    default: () => ({
      title: '',
      ios: { background: { file: null, preview: null } },
      android: { background: { file: null, preview: null }, logo: { file: null, preview: null } }
    })
  },
  onAppIconChange: {
    type: Function,
    required: true
  }
});

const activeTab = ref('ios');

const form = ref({
  title: props.appIconState?.title || ''
});

const iosData = ref({
  background: {
    file: props.appIconState?.ios?.background?.file || null,
    preview: props.appIconState?.ios?.background?.preview || null
  }
});

const androidData = ref({
  background: {
    file: props.appIconState?.android?.background?.file || null,
    preview: props.appIconState?.android?.background?.preview || null
  },
  logo: {
    file: props.appIconState?.android?.logo?.file || null,
    preview: props.appIconState?.android?.logo?.preview || null
  }
});

const androidLogoTransform = ref({ x: 0.5, y: 0.5, scale: 1 });

const updateIosBackground = (data) => {
  iosData.value.background = { ...iosData.value.background, ...data };
  emitChange();
};

const updateAndroidBackground = (data) => {
  androidData.value.background = { ...androidData.value.background, ...data };
  emitChange();
};

const updateAndroidLogo = (data) => {
  androidData.value.logo = { ...androidData.value.logo, ...data };
  emitChange();
};

const emitChange = () => {
  props.onAppIconChange({
    title: form.value.title,
    ios: {
      background: iosData.value.background
    },
    android: {
      background: androidData.value.background,
      logo: androidData.value.logo,
      logoTransform: androidLogoTransform.value
    }
  });
};

// Emit when title changes (v-model already calls emitChange via @input)
</script>
