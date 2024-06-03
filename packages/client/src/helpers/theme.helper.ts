import { generateColor } from 'antd/es/color-picker/util';

export const getTextColor = (hex: string, initialColor: string) => {
  const hsb = generateColor(hex).toHsb();
  hsb.s *= 0.5;
  hsb.b = generateColor(initialColor).toHsb().b > 0.7 ? 60 : 80;
  return generateColor(hsb).toHexString();
};
export const getContainerColor = (hex: string, initialColor: string) => {
  const hsb = generateColor(hex).toHsb();
  hsb.s *= 0.7;
  hsb.b = generateColor(initialColor).toHsb().b < 0.7 ? hsb.b * 0.7 : hsb.b;
  return generateColor(hsb).toHexString();
};
