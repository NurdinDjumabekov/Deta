/// если цвет очень яркий

export const getBrightness = (color) => {
  let r, g, b;

  if (color.charAt(0) === "#") {
    color = color.substring(1);
    if (color.length === 3) {
      r = parseInt(color.charAt(0) + color.charAt(0), 16);
      g = parseInt(color.charAt(1) + color.charAt(1), 16);
      b = parseInt(color.charAt(2) + color.charAt(2), 16);
    } else {
      r = parseInt(color.substring(0, 2), 16);
      g = parseInt(color.substring(2, 4), 16);
      b = parseInt(color.substring(4, 6), 16);
    }
  } else if (color.startsWith("rgb")) {
    const rgb = color.match(/\d+/g);
    r = parseInt(rgb[0]);
    g = parseInt(rgb[1]);
    b = parseInt(rgb[2]);
  }

  return (r * 299 + g * 587 + b * 114) / 1000;
};

export const getTextColor = (backgroundColor) => {
  const brightness = getBrightness(backgroundColor);
  return brightness > 128 ? "black" : "white";
};
