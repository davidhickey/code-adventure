import { defineField } from "sanity";

import { defineType } from "sanity";

export const textElement = defineType({
  name: 'textElement',
  title: 'Text',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
    }),
    defineField({
      name: 'darkColor',
      title: 'Dark Color',
      type: 'colorPicker',
    }),
    defineField({
      name: 'lightColor',
      title: 'Light Color',
      type: 'colorPicker',
    }),
  ],
});
