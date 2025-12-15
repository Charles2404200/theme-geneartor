import { computed, type ComputedRef } from "vue";

export interface QRCodeState {
  logoColor?: string;
  bgColor?: string;
}

export function useQRCode(
  state: ComputedRef<QRCodeState>
) {
  return computed(() => ({
    logoColor: state.value?.logoColor ?? "#d60404ff",
    bgColor: state.value?.bgColor ?? "#B9804E"
  }));
}
