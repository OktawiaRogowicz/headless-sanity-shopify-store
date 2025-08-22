import {DocumentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {isUniqueOtherThanLanguage} from '../../lib/isUniqueOtherThanLanguage'
import {LANGUAGES, SINGLETONS} from '../../structure'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
    {
      name: 'settings',
      title: 'Settings',
    },
  ],
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      group: 'settings',
    }),
    defineField({
      name: 'name',
      title: 'Internal name',
      description: 'Used only in sanity to preview content',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
        isUnique: isUniqueOtherThanLanguage,
      },
      group: 'settings',
      validation: (Rule) =>
        Rule.required().custom((value, context) => {
          if (!value?.current) {
            const allowedIds = LANGUAGES.flatMap((language) =>
              SINGLETONS.map((singleton) => {
                return [`${singleton.id}-${language.id}`, `drafts.${singleton.id}-${language.id}`]
              }),
            )
            console.log('context.document._id: ', context.document._id, allowedIds)
            if (context?.document && allowedIds.includes(context.document._id)) {
              return true
            } else return 'Slug is required'
          }
          return true
        }),
      readOnly: ({document}) => {
        if (!document || !document?._id) return false
        const allowedIds = LANGUAGES.flatMap((language) =>
          SINGLETONS.map((singleton) => `${singleton.id}-${language.id}`),
        )
        return allowedIds.includes(document._id)
      },
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page builder',
      type: 'pageBuilder',
      group: 'content',
    }),
    defineField({
      name: 'meta_title',
      title: 'Meta Title',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'meta_description',
      title: 'Meta Description',
      type: 'text',
      group: 'seo',
    }),
    defineField({
      name: 'noindex',
      title: 'No Index',
      type: 'boolean',
      initialValue: false,
      group: 'seo',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image - [1200x630]',
      type: 'image',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      description: 'language',
      pageBuilder: 'pageBuilder',
    },
    prepare: ({title, description, pageBuilder}) => {
      const mediaSrc = pageBuilder?.[0]?._type
      return {
        title,
        subtitle: description?.toUpperCase() || '',
        media: () => (
          <img src={`/static/page-builder-thumbnails/${mediaSrc}.png`} alt="Preview of Page.tsx." />
        ),
      }
    },
  },
})
