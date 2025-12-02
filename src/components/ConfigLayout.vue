<script setup>
import { ref } from 'vue';
import { setPrimary } from '@/utils/setTheme';

const props = defineProps({
  activeTab: {
    type: String,
    default: 'color'
  },
  splash: Object,
  background: Object,
  banner: Object,
  memberCard: Object
});

const backgroundState = ref({
  type: props.background?.type ?? "image",
  value: props.background?.value ?? null,
  fileKey: props.background?.fileKey ?? "background-main",
  file: props.background?.file ?? null,
  preview: props.background?.preview ?? null
});
const updateBackground = (payload) => {
  backgroundState.value = {
    ...backgroundState.value,
    ...payload
  };
};


const emit = defineEmits(['navigate', 'import-schema']);
const fileStore = ref({});
const isActive = (tab) => props.activeTab === tab;
const navigate = (tab) => emit('navigate', tab);

const exportCampaign = async () => {
  const root = document.documentElement;
  const primary = {};
  let primaryColor500 = '#B9804E';

  // Load primary colors
  [100,200,300,400,500,600].forEach(level => {
    const val = root.style.getPropertyValue(`--primary-${level}`)?.trim() || "";
    primary[level] = val;
    if (level === 500 && val) primaryColor500 = val;
  });

  const fileToBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  };

  let splashScreen = undefined;
  if (props.splash?.file) {
    splashScreen = await fileToBase64(props.splash.file);
  }

  let background = undefined;

  if (props.background && props.background.type) {
    const bg = props.background;

    if (bg.type === 'image') {
      if (bg.file) {
        background = {
          type: 'image',
          value: await fileToBase64(bg.file),
          baseColor: bg.baseColor,
          dividerColor: bg.dividerColor,
          textColor: bg.textColor,
          hotlineColor: bg.hotlineColor
        };
      }
    } else if (bg.type === 'color') {
      // Ensure we have a valid color value
      const colorValue = bg.value || primaryColor500;
      background = {
        type: 'color',
        value: colorValue,
        baseColor: bg.baseColor,
        dividerColor: bg.dividerColor,
        textColor: bg.textColor,
        hotlineColor: bg.hotlineColor
      };
    }
  }

  // Fallback to primary color if no background selected
  if (!background) {
    background = {
      type: 'color',
      value: primaryColor500
    };
  }


  let banner = undefined;
  if (props.banner?.file) {
    banner = await fileToBase64(props.banner.file);
  }


  let memberCard = undefined;

  if (props.memberCard && Object.keys(props.memberCard).length > 0) {
    const memberCardData = {};

    for (const [tier, data] of Object.entries(props.memberCard)) {
      if (data?.file) {
        memberCardData[tier] = await fileToBase64(data.file);
      }
    }

    if (Object.keys(memberCardData).length > 0) {
      memberCard = memberCardData;
    }
  }

  const campaign = {
    colors: { primary },
    splashScreen,
    background,
    home: {
      topBanner: banner
    },
    memberCard
  };
  if (!campaign.splashScreen) delete campaign.splashScreen;
  if (!campaign.home?.topBanner) delete campaign.home;
  if (!campaign.memberCard) delete campaign.memberCard;

  const blob = new Blob([JSON.stringify(campaign, null, 2)], {
    type: "application/json;charset=utf-8;"
  });

  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = "campaign.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  console.log(" CAMPAIGN EXPORTED:", campaign);
};


const importCampaign = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "application/json";

  input.onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const jsonText = await file.text();
      const schema = JSON.parse(jsonText);

      console.log(" IMPORTED SCHEMA:", schema);

      // Helper to convert base64 data URI to File
      const base64ToFile = async (dataUri, filename) => {
        const response = await fetch(dataUri);
        const blob = await response.blob();
        return new File([blob], filename, { type: blob.type });
      };
      let primaryColorValue = null;
      if (schema.colors?.primary) {
        // Use primary 500 to generate all shades via setPrimary
        const primary500 = schema.colors.primary[500];
        if (primary500) {
          primaryColorValue = primary500;
          setPrimary(primary500);
        }
      }

      const importedData = {
        splash: null,
        background: null,
        banner: null,
        memberCard: {},
        primaryColor: primaryColorValue
      };

      // Splash screen image
      if (schema.splashScreen) {
        importedData.splash = {
          file: await base64ToFile(schema.splashScreen, 'splash.webp'),
          preview: schema.splashScreen
        };
      }

      // Background
      if (schema.background) {
        if (schema.background.type === 'image' && schema.background.value) {
          importedData.background = {
            type: 'image',
            value: schema.background.value,
            file: await base64ToFile(schema.background.value, 'background.webp'),
            preview: schema.background.value,
            baseColor: schema.background.baseColor || '#F1EADA',
            dividerColor: schema.background.dividerColor || '#A2B6CD',
            textColor: schema.background.textColor || '#B9804E',
            hotlineColor: schema.background.hotlineColor || '#101010'
          };
        } else if (schema.background.type === 'color') {
          importedData.background = {
            type: 'color',
            value: schema.background.value,
            file: null,
            preview: null,
            baseColor: schema.background.baseColor || '#F1EADA',
            dividerColor: schema.background.dividerColor || '#A2B6CD',
            textColor: schema.background.textColor || '#B9804E',
            hotlineColor: schema.background.hotlineColor || '#101010'
          };
        }
      }

      // Top banner image
      if (schema.home?.topBanner) {
        importedData.banner = {
          file: await base64ToFile(schema.home.topBanner, 'banner.webp'),
          preview: schema.home.topBanner
        };
      }

      // Member card images
      if (schema.memberCard) {
        Object.entries(schema.memberCard).forEach(([tier, base64]) => {
          if (base64) {
            importedData.memberCard[tier] = {
              file: null, // Will set async
              preview: base64
            };
          }
        });

        // Convert member card base64 to files
        for (const [tier, base64] of Object.entries(schema.memberCard)) {
          if (base64) {
            importedData.memberCard[tier].file = await base64ToFile(base64, `${tier}.webp`);
          }
        }
      }

      // Emit imported data to parent
      emit("import-schema", importedData);
      console.log(" IMPORT COMPLETE:", importedData);
    } catch (error) {
      console.error(" IMPORT ERROR:", error);
      alert("Failed to import campaign. Invalid JSON file.");
    }
  };

  input.click();
};

</script>

<template>
  <div class="max-w-6xl mx-auto py-8 px-8 space-y-6">
    
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <p class="text-xs text-gray-400">Campaigns</p>
        <h1 class="text-2xl font-semibold mt-1">Config Interface</h1>
      </div>

      <!-- Buttons -->
      <div class="flex gap-2">
        
        <!-- IMPORT JSON BUTTON -->
        <button
          @click="importCampaign"
          class="px-3 py-1 rounded-md bg-gray-600 text-white text-sm hover:opacity-90"
        >
          Import JSON
        </button>

        <!-- EXPORT JSON BUTTON -->
        <button
          @click="exportCampaign"
          class="px-3 py-1 rounded-md bg-[#111827] text-white text-sm hover:opacity-90"
        >
          Export JSON
        </button>

      </div>
    </div>

    <!-- Tabs -->
    <div class="border-b border-gray-200">
      <div class="flex gap-6 text-sm">

        <button 
          @click="navigate('color')"
          :class="[
            'pb-3 transition',
            isActive('color')
              ? 'border-b-2 border-[#c28c51] font-medium text-[#c28c51]'
              : 'text-gray-400 hover:text-black'
          ]"
        >
          Color
        </button>

        <button 
          @click="navigate('splash')"
          :class="[
            'pb-3 transition',
            isActive('splash')
              ? 'border-b-2 border-[#c28c51] font-medium text-[#c28c51]'
              : 'text-gray-400 hover:text-black'
          ]"
        >
          Splash Screen
        </button>

        <button 
          @click="navigate('background')"
          :class="[
            'pb-3 transition',
            isActive('background')
              ? 'border-b-2 border-[#c28c51] font-medium text-[#c28c51]'
              : 'text-gray-400 hover:text-black'
          ]"
        >
          Background
        </button>

        <button 
          @click="navigate('banner')"
          :class="[
            'pb-3 transition',
            isActive('banner')
              ? 'border-b-2 border-[#c28c51] font-medium text-[#c28c51]'
              : 'text-gray-400 hover:text-black'
          ]"
        >
          Home - Top Banner
        </button>

        <button 
          @click="navigate('member')"
          :class="[
            'pb-3 transition',
            isActive('member')
              ? 'border-b-2 border-[#c28c51] font-medium text-[#c28c51]'
              : 'text-gray-400 hover:text-black'
          ]"
        >
          Member Card
        </button>

      </div>
    </div>

    <slot></slot>

  </div>
</template>
