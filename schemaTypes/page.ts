import { defineType } from "sanity";

import { defineField } from "sanity";

const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'For internal reference only.',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The title of the page.',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: 'The URL path of the page.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      slug: 'slug.current',
    },
    prepare(selection) {
      const { title, slug } = selection;
      return {
        title,
        subtitle: '/' + slug,
      };
    },
  },
});

export default page;
