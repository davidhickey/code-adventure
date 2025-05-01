import { ColorDefinition } from "@sanity/color-input";
import { ImageAsset } from "sanity";

export type SanityPage = {
  _createdAt: string;
  _updatedAt: string;
  _id: string;
  _type: string;
  title: string;
  slug: {
    _type: string;
    current: string;
  }
  name: string;
  isDynamicRoute: boolean;
  sections: Section[];
}

export type Section = HeroSection;

export type TextElement = {
  _type: string;
  text: string;
  darkColor: ColorPicker;
  lightColor: ColorPicker;
}

export type ColorPicker = {
  hex: string;
  rgb: string;
  hsl: string;
  hsv: string;
  alpha: number;
}

export type HeroSection = {
  _type: string;
  _key: string;
  [key: string]: any;
  title: TextElement;
  subtitle: TextElement;
  bgImage: ImageAsset;
}




