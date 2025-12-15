<script setup>
import { ref, computed } from 'vue';
import ConfigLayout from '@/components/ConfigLayout.vue';

import Home from './Home.vue';
import SplashScreen from './SplashScreen.vue';
import Background from './Background.vue';
import HomeTopBanner from './HomeTopBanner.vue';
import MemberCard from './MemberCard.vue';
import QRCodeTab from '@/components/qrcode/QRCodeTab.vue';
import OrderDetailTab from '@/components/order-detail/OrderDetailTab.vue';

/* =======================
   TAB STATE
======================= */
const currentTab = ref('color');

/* =======================
   COLOR
======================= */
const primaryColor = ref(null);

/* =======================
   SPLASH
======================= */
const splash = ref({
  file: null,
  preview: null
});

/* =======================
   BACKGROUND
======================= */
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

/* =======================
   BANNER
======================= */
const banner = ref({
  file: null,
  preview: null
});

/* =======================
   QR CODE
======================= */
const qrCode = ref({
  value: 'https://your-domain.com',
  logo: '/qrCode.svg',
  logoColor: '#000000',
  bgColor: '#B9804E'
});

/* =======================
   MEMBER CARD
======================= */
const memberCard = ref({
  FOODBOOK: null,
  FA: null,
  SOL: null,
  LA: null,
  ITL: null,
  ITLPLUS: null
});

/* =======================
   TAB -> COMPONENT
======================= */
const currentComponent = computed(() => {
  switch (currentTab.value) {
    case 'color': return Home;
    case 'splash': return SplashScreen;
    case 'background': return Background;
    case 'banner': return HomeTopBanner;
    case 'member': return MemberCard;
    case 'order': return OrderDetailTab;
    case 'qrcode': return QRCodeTab;
    default: return Home;
  }
});

/* =======================
   NAVIGATION
======================= */
const handleNavigate = (tab) => {
  currentTab.value = tab;
};

/* =======================
   HANDLERS
======================= */
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

const onQRCodeChange = (value) => {
  qrCode.value = {
    ...qrCode.value,
    ...value
  };
};

/* =======================
   IMPORT SCHEMA
======================= */
const handleImport = (importedData) => {
  console.log('[AllInOne] Import data:', importedData);

  if (importedData.primaryColor) {
    primaryColor.value = importedData.primaryColor;
  }

  if (importedData.splash) {
    splash.value = importedData.splash;
  }

  if (importedData.background) {
    background.value = importedData.background;
  }

  if (importedData.banner) {
    banner.value = importedData.banner;
  }

  if (importedData.qrcode) {
    qrCode.value = importedData.qrcode;
  }

  if (importedData.memberCard) {
    Object.entries(importedData.memberCard).forEach(([tier, data]) => {
      if (data) {
        memberCard.value[tier] = data;
      }
    });
  }

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
      :qrcode="qrCode"
    >

      <component
        :is="currentComponent"
        :navigate="handleNavigate"

        :on-splash-change="onSplashChange"
        :on-background-change="onBackgroundChange"
        :on-banner-change="onBannerChange"
        :on-member-change="onMemberChange"
        :on-qrcode-change="onQRCodeChange"

        :backgroundState="background"
        :splashPreview="splash.preview"
        :bannerPreview="banner.preview"
        :memberCardState="memberCard"
        :primaryColor="primaryColor"
        :qrCodeState="qrCode"
      />

    </ConfigLayout>

  </div>
</template>
