import { defineType } from "sanity";

export const colorPicker = defineType({
  name: 'colorPicker',
  title: 'Color Picker',
  type: 'color',
  options: {
    colorList: [
      '#283618', // light primary green
      '#151c0c', // dark primary green
      '#606c38', // light secondary green
      '#fefae0', // light secondary cream
      '#dda15e', // lisecondary peach
      '#bc6c25', // ligsecondary burnt orange
      '#e5e5e5', // dark primary gray
      '#ffffff', // dark secondary white
      '#000000', // dark secondary black
      '#fca311', // dark accent yellow
      '#14213d', // dark accent blue
      '#333333', // dark gray
      '#fca311', // dark accent yellow
    ],
  },
})