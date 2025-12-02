<script setup>
import { ref, computed } from 'vue';
import ConfigLayout from '@/components/ConfigLayout.vue';
import Home from './Home.vue';
import SplashScreen from './SplashScreen.vue';
import Background from './Background.vue';
import HomeTopBanner from './HomeTopBanner.vue';
import MemberCard from './MemberCard.vue';

const currentTab = ref('color');

const primaryColor = ref(null); 
const splash = ref({
  file: null,
  preview: null
});
const background = ref({
  type: null,
  fileKey: null,
  file: null,
  preview: null,
  baseColor: '#F1EADA',
  dividerColor: '#A2B6CD',
  textColor: '#B9804E',
  hotlineColor: '#101010'
});
const banner = ref({
  file: null,
  preview: null
});

const memberCard = ref({
  FOODBOOK: null,
  FA: null,
  SOL: null,
  LA: null,
  ITL: null,
  ITLPLUS: null
});

const currentComponent = computed(() => {
  switch (currentTab.value) {
    case 'color': return Home;
    case 'splash': return SplashScreen;
    case 'background': return Background;
    case 'banner': return HomeTopBanner;
    case 'member': return MemberCard;
    default: return Home;
  }
});

const handleNavigate = (tab) => currentTab.value = tab;


const onSplashChange = (value) => {
  splash.value = {
    ...splash.value,
    ...(typeof value === 'object' ? value : { file: value })
  };
};

const onBackgroundChange = (value) => {
  background.value = {
    ...background.value,
    ...value
  };
};

const onBannerChange = (value) => {
  banner.value = {
    ...banner.value,
    ...(typeof value === 'object' ? value : { file: value })
  };
};

const onMemberChange = (tier, value) => {
  const data = typeof value === 'object' ? value : { file: value };
  memberCard.value[tier] = data;
};

const handleImport = (importedData) => {
  console.log('[AllInOne] Import data:', importedData);

  // Update primary color
  if (importedData.primaryColor) {
    primaryColor.value = importedData.primaryColor;
  }

  // Update splash
  if (importedData.splash) {
    splash.value = importedData.splash;
  }

  // Update background
  if (importedData.background) {
    background.value = importedData.background;
  }

  // Update banner
  if (importedData.banner) {
    banner.value = importedData.banner;
  }

  // Update member card
  if (importedData.memberCard) {
    Object.entries(importedData.memberCard).forEach(([tier, data]) => {
      if (data) {
        memberCard.value[tier] = data;
      }
    });
  }

  // Switch to color tab to see the imported colors applied
  currentTab.value = 'color';
};
</script>

<template>
  <div class="min-h-screen bg-[#f7f7fa] text-[#111827]">

    <ConfigLayout 
      :activeTab="currentTab" 
      @navigate="handleNavigate"
      @import-schema="handleImport"
      :splash="splash"
      :background="background"
      :banner="banner"
      :member-card="memberCard"
    >

      <component 
        :is="currentComponent"
        :navigate="handleNavigate"
        :on-splash-change="onSplashChange"
        :on-background-change="onBackgroundChange"
        :on-banner-change="onBannerChange"
        :on-member-change="onMemberChange"
        :backgroundState="background"
        :splashPreview="splash.preview"
        :bannerPreview="banner.preview"
        :memberCardState="memberCard"
        :primaryColor="primaryColor"
      />

    </ConfigLayout>

  </div>
</template>
