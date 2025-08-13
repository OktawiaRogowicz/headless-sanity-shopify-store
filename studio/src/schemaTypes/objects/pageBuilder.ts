import {defineType} from 'sanity'

export const pageBuilder = defineType({
  name: 'pageBuilder',
  title: 'Page builder',
  type: 'array',
  of: [{type: 'heroSection'}],
  options: {
    insertMenu: {
      views: [
        {
          name: 'grid',
          previewImageUrl: (schemaTypeName) =>
            `/static/page-builder-thumbnails/${schemaTypeName}.webp`,
        },
      ],
    },
  },
})
