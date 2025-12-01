<script setup>
import { ref } from 'vue';
import TierCard from '@/components/TierCard.vue';

const props = defineProps({
  onMemberChange: Function,
  memberCardState: Object 
});

const tiers = [
  {
    key: 'e',
    label: 'Hạng E-Member',
    tierName: 'HẠNG E-MEMBER',
    description: '10 điểm mức ưu đãi bạn sẽ thăng lên Hạng E'
  },
  {
    key: 'pha',
    label: 'Hạng Pha',
    tierName: 'HẠNG PHA',
    description: '10 điểm mức ưu đãi bạn sẽ thăng lên Hạng Pha'
  },
  {
    key: 'sol',
    label: 'Hạng Sol',
    tierName: 'HẠNG SOL',
    description: '10 điểm mức ưu đãi bạn sẽ thăng lên Hạng Sol'
  },
  {
    key: 'la',
    label: 'Hạng La',
    tierName: 'HẠNG LA',
    description: '10 điểm mức ưu đãi bạn sẽ thăng lên Hạng La'
  },
  {
    key: 'internal',
    label: 'Hạng Internal',
    tierName: 'HẠNG INTERNAL',
    description: '10 điểm mức ưu đãi bạn sẽ thăng lên Hạng Internal'
  },
  {
    key: 'internalPlus',
    label: 'Hạng Internal Plus',
    tierName: 'HẠNG INTERNAL PLUS',
    description: '10 điểm mức ưu đãi bạn sẽ thăng lên Hạng Internal Plus'
  }
];

const handleMemberUpload = (tier, imageUrl) => {
  const tierKeyMap = {
    'e': 'FOODBOOK',
    'pha': 'FA',
    'sol': 'SOL',
    'la': 'LA',
    'internal': 'ITL',
    'internalPlus': 'ITLPLUS'
  };
  const mappedKey = tierKeyMap[tier];
  if (typeof props.onMemberChange === 'function') {
    props.onMemberChange(mappedKey, imageUrl);
  }
};

// Expose tierKeyMap for template
const tierKeyMap = {
  'e': 'FOODBOOK',
  'pha': 'FA',
  'sol': 'SOL',
  'la': 'LA',
  'internal': 'ITL',
  'internalPlus': 'ITLPLUS'
};</script>

<template>
  <div class="page-member space-y-10">
    <div>
      <TierCard
        v-for="tier in tiers"
        :key="tier.key"
        :tier="tier.key"
        :label="tier.label"
        :tier-name="tier.tierName"
        :description="tier.description"
        :tier-data="props.memberCardState?.[tierKeyMap[tier.key]]"
        @member-upload="(imageUrl) => handleMemberUpload(tier.key, imageUrl)"
      />
    </div>
  </div>
</template>
