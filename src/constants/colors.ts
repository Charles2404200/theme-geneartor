/**
 * Default color values across the app
 */

export const DEFAULT_COLORS = {
  // Primary colors
  PRIMARY_500: "#9FB2C9",
  
  // QR Code
  QR_LOGO_COLOR: "#000000",
  QR_BG_COLOR: "#B9804E",
  
  // Order Detail
  ORDER_BG_COLOR: "#B7C9DA",
  ORDER_DIVIDER_COLOR: "#A2B6CD",
  ORDER_ARROW_COLOR: "#B9804E",
  
  // Background/Theme
  BACKGROUND_PRIMARY: "#B7C9DA",
  BORDER_COLOR: "#D9D9D9",
  DIVIDER_COLOR: "#A2B6CD",
  ARROW_COLOR: "#B9804E",
} as const;

export type ColorKey = keyof typeof DEFAULT_COLORS;
