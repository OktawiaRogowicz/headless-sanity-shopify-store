import {
  CogIcon,
  DocumentIcon,
  DocumentsIcon,
  HomeIcon,
  InfoOutlineIcon,
  InsertAboveIcon,
  InsertBelowIcon,
} from '@sanity/icons'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'

import {i18n} from '../../languages'
import {ForwardRefExoticComponent, PropsWithoutRef, RefAttributes, SVGProps} from 'react'

interface SingletonProps {
  id: string
  _type: string
  title: string
  icon?: ForwardRefExoticComponent<
    PropsWithoutRef<React.SVGProps<SVGSVGElement>> & RefAttributes<SVGSVGElement>
  >
}

export const SINGLETONS: SingletonProps[] = [
  {id: 'home', _type: 'page', title: 'Home', icon: HomeIcon},
]
export const SITE_CONFIGURATION_SINGLETONS: SingletonProps[] = [
  {id: 'header', _type: 'header', title: 'Header', icon: InsertAboveIcon},
  {id: 'footer', _type: 'footer', title: 'Footer', icon: InsertBelowIcon},
  {id: 'settings', _type: 'settings', title: 'Settings', icon: CogIcon},
]
export const LANGUAGES = i18n.languages

const DISABLED_TYPES = ['settings', 'assist.instruction.context']

const singletonInternationalizedListItem = (S: StructureBuilder, singleton: SingletonProps) => {
  return S.listItem()
    .title(singleton.title)
    .id(singleton.id)
    .icon(singleton.icon)
    .child(
      S.list()
        .title(singleton.title)
        .id(singleton.id)
        .items(
          LANGUAGES.map((language) =>
            S.documentListItem()
              .schemaType(singleton._type)
              .id(`${singleton.id}-${language.id}`)
              .title(`${singleton.title} (${language.id.toLocaleUpperCase()})`),
          ),
        )
        .canHandleIntent(
          (intentName, params) => intentName === 'edit' && params.id.startsWith(singleton.id),
        ),
    )
}

const internationalizedListItem = (
  S: StructureBuilder,
  documentName: string,
  documentPluralLabel: string,
  language: (typeof LANGUAGES)[number],
  icon: ForwardRefExoticComponent<
    PropsWithoutRef<SVGProps<SVGSVGElement>> & RefAttributes<SVGSVGElement>
  >,
) => {
  return S.listItem()
    .title(`${documentPluralLabel} (${language.id.toLocaleUpperCase()})`)
    .schemaType(documentName)
    .icon(icon)
    .child(
      S.documentList()
        .id(language.id)
        .title(`${language.title} ${documentPluralLabel}`)
        .schemaType(documentName)
        .filter(`_type == "${documentName}" && language == $language`)
        .params({language: language.id})
        .initialValueTemplates([
          S.initialValueTemplateItem(`${documentName}-${language.id}`, {
            id: `${documentName}-${language.id}`,
            language: language.id,
          }),
        ])
        .canHandleIntent((intentName, params) => {
          // TODO: Handle **existing** documents (like search results when clicked)
          // to return `true` on the correct language list!
          if (intentName === 'edit') {
            // return params?.language === language.id
            return false
          }

          if (!params.template) {
            return true
          }

          const languageValue = params?.template?.split(`-`).pop()

          return languageValue === language.id
        }),
    )
}

const allInternationalizedListItems = (
  S: StructureBuilder,
  documentName: string,
  documentPluralName: string,
  documentPluralLabel: string,
  icon: ForwardRefExoticComponent<
    PropsWithoutRef<SVGProps<SVGSVGElement>> & RefAttributes<SVGSVGElement>
  >,
) => {
  return S.listItem()
    .title(`All ${documentPluralLabel}`)
    .schemaType(documentName)
    .icon(icon)
    .child(
      S.documentList()
        .id(`all-${documentPluralName}`)
        .title(`All ${documentPluralLabel}`)
        .schemaType(documentName)
        .filter(`_type == "${documentName}"`)
        .canHandleIntent(
          (intentName, params) => intentName === 'edit' || params.template === `${documentName}`,
        ),
    )
}

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Website Content')
    .items([
      ...S.documentTypeListItems()
        // Remove the "assist.instruction.context" and "settings" content  from the list of content types
        .filter((listItem: any) => !DISABLED_TYPES.includes(listItem.getId()))
        // Pluralize the title of each document type.  This is not required but just an option to consider.
        .map((listItem) => {
          return listItem.title(pluralize(listItem.getTitle() as string))
        }),
      // Settings Singleton in order to view/edit the one particular document for Settings.  Learn more about Singletons: https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
      S.listItem()
        .title('Pages')
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title('Pages')
            .items([
              ...SINGLETONS.map((singleton) => singletonInternationalizedListItem(S, singleton)),
              ...LANGUAGES.map((language) =>
                internationalizedListItem(S, 'page', 'Pages', language, DocumentIcon),
              ),
              S.divider(),
              allInternationalizedListItems(S, 'page', 'pages', 'Pages', DocumentsIcon),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title('Site Settings')
        .child(
          S.list()
            .title('Site Settings Documents')
            .items([
              ...SITE_CONFIGURATION_SINGLETONS.map((singleton) =>
                singletonInternationalizedListItem(S, singleton),
              ),
            ]),
        )
        .icon(CogIcon),
    ])
