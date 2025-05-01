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
    defineField({
      name: 'isDynamicRoute',
      title: 'Is Dynamic Route',
      type: 'boolean',
      description: 'If true, the page will be rendered as a dynamic route.',
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [{ type: 'hero' }],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      slug: 'slug.current',
      isDynamicRoute: 'isDynamicRoute',
    },
    prepare(selection) {
      const { title, slug, isDynamicRoute } = selection;
      return {
        title,
        subtitle: `/${isDynamicRoute ? 'pages/' : ''}` + slug,
      };
    },
  },
  initialValue: {
    isDynamicRoute: true,
  },
});

export default page;
