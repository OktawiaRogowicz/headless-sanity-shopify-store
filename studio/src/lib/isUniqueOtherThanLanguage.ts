// Note: this assumes that every document that has a slug field
// have it on the `slug` field at the root

import {SlugValidationContext} from 'sanity'

export async function isUniqueOtherThanLanguage(slug: string, context: SlugValidationContext) {
  const {document, getClient} = context
  if (!document?.language) {
    return true
  }
  const client = getClient({apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-28'})
  const id = document._id.replace(/^drafts\./, '')
  const params = {
    id,
    language: document.language,
    slug,
  }
  const query = `!defined(*[
    !(sanity::versionOf($id)) &&
    slug.current == $slug &&
    language == $language
  ][0]._id)`
  return await client.fetch(query, params)
}
