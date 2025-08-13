import {defineField, defineType} from 'sanity'
import {BulbOutlineIcon} from '@sanity/icons'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'link',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'backgroundImages',
      title: 'Background Images',
      type: 'array',
      of: [
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'media',
            }),
          ],
        })
          ],
      validation: (Rule) => Rule.required(),
        }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const {title} = selection

      return {
        title: title || 'Untitled Hero Section',
        subtitle: 'Hero Section',
      }
    },
  },
})
