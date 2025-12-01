
const clamp01 = (v) => Math.max(0, Math.min(1, v));

export const hexToHsb = (hex) => {
  hex = hex.replace("#", "");

  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  const brightness = max;

  const saturation = max === 0 ? 0 : (max - min) / max;

  let hue;
  if (max === min) {
    hue = 0;
  } else if (max === r) {
    hue = (g - b) / (max - min);
  } else if (max === g) {
    hue = 2 + (b - r) / (max - min);
  } else {
    hue = 4 + (r - g) / (max - min);
  }

  hue *= 60;
  if (hue < 0) hue += 360;

  return {
    hue,
    saturation,
    brightness,
  };
};

const hsbToHex = (h, s, v) => {
  h = (h % 360 + 360) % 360;
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;

  let r1, g1, b1;
  if (h < 60) {
    [r1, g1, b1] = [c, x, 0];
  } else if (h < 120) {
    [r1, g1, b1] = [x, c, 0];
  } else if (h < 180) {
    [r1, g1, b1] = [0, c, x];
  } else if (h < 240) {
    [r1, g1, b1] = [0, x, c];
  } else if (h < 300) {
    [r1, g1, b1] = [x, 0, c];
  } else {
    [r1, g1, b1] = [c, 0, x];
  }

  const r = Math.round((r1 + m) * 255);
  const g = Math.round((g1 + m) * 255);
  const b = Math.round((b1 + m) * 255);

  const toHex = (n) => n.toString(16).padStart(2, "0").toUpperCase();

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const generateShades = (hex) => {
  const base = hex.startsWith("#") ? hex.toUpperCase() : `#${hex.toUpperCase()}`;

  if (base === "#B9804E") {
    return {
      100: "#F5EDE4",
      200: "#EBDAC9",
      300: "#DDBF9C",
      400: "#CCA379",
      500: "#B9804E",
      600: "#93694B",
    };
  }

  const { hue, saturation, brightness } = hexToHsb(base);

  const spec = {
    100: { sMul: 0.13, bMul: 1.33 },
    200: { sMul: 0.26, bMul: 1.28 },
    300: { sMul: 0.50, bMul: 1.20 },
    400: { sMul: 0.75, bMul: 1.10 },
    // 500: base
    600: { sMul: 0.90, bMul: 0.80 },
  };

  const shades = {};

  Object.entries(spec).forEach(([level, { sMul, bMul }]) => {
    const s = clamp01(saturation * sMul);
    const b = clamp01(brightness * bMul);
    shades[level] = hsbToHex(hue, s, b);
  });

  shades[500] = base;

  return shades;
};
