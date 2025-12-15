/**
 * Order Detail Device Configuration
 */

export const DEVICE_CONFIG = {
  // Device dimensions
  WIDTH: "280px",
  HEIGHT: "520px",
  ROUNDED: "rounded-3xl",

  // Ticket card
  TICKET_HEIGHT: "220px",
  TOP_SECTION_HEIGHT: "45%",
  DIVIDER_PY: "py-2",

  // Semi-circle (top)
  SEMI_CIRCLE_WIDTH: "w-16",
  SEMI_CIRCLE_HEIGHT: "h-16",
  SEMI_CIRCLE_TOP: "-top-5",

  // Side cuts (small)
  SIDE_CUT_WIDTH: "w-6",
  SIDE_CUT_HEIGHT: "h-6",
  SIDE_CUT_POSITION: "top-1/2",

  // Notches (large)
  NOTCH_WIDTH: "w-10",
  NOTCH_HEIGHT: "h-10",
  NOTCH_TOP: "top-[113px]",
  NOTCH_POSITION: "-translate-y-1/2",

  // Dot count in divider
  DOT_COUNT: 26,
  DOT_SIZE: "w-1.5 h-1.5",

  // Bottom card
  BOTTOM_HEIGHT: "h-[40%]",
  BOTTOM_TOP_SECTION: "h-8",
  BORDER_COLOR: "#D9D9D9",

  // Spacing
  PADDING: "p-4",
  SPACING_BOTTOM: "h-6",
} as const;
