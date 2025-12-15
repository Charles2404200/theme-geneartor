/**
 * Order Detail Types
 */

export interface OrderDetailState {
  type: "image" | "color"
  backgroundImage: string
  backgroundColor: string
  dividerColor: string
  arrowColor: string
}

export interface OrderDetailConfig {
  bgStyle: string
  bgIsImage: boolean
  arrow: string
  divider: string
  border: string
}

export interface CSSVariables {
  '--primary-500': string
}
