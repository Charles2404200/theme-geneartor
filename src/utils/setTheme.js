import { generateShades } from "./colorShades";

export function setPrimary(hex) {
  const shades = generateShades(hex);
  const root = document.documentElement;

  Object.entries(shades).forEach(([key, val]) => {
    root.style.setProperty(`--primary-${key}`, val);
  });

  localStorage.setItem("primaryColor", hex);
}
