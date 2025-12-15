<script setup lang="ts">
import { reactive } from "vue";
import QRColorConfig from "./QRColorConfig.vue";
import QRPreview from "./QRPreview.vue";

const qrCodeState = reactive({
  logoColor: "#000000",
  bgColor: "#B9804E"
});

const onQRCodeChange = (payload: Partial<typeof qrCodeState>) => {
  Object.assign(qrCodeState, payload);
};
</script>

<template>
  <div class="flex gap-24 items-start">

    <!-- LEFT -->
    <QRColorConfig
      :logoColor="qrCodeState.logoColor"
      :bgColor="qrCodeState.bgColor"
      @change="onQRCodeChange"
    />

    <!-- RIGHT -->
    <QRPreview :qrCodeState="qrCodeState" />

  </div>
</template>
