import { defineField, defineType } from "sanity";

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'textElement',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'textElement',
    }),
    defineField({
      name: 'bgImage',
      title: 'Background Image',
      type: 'image',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      type: 'hero',
    },
    prepare(selection) {
      const { title, type } = selection;
      return {
        title: title.text,
        subtitle: type,
      };
    },
  },
});

