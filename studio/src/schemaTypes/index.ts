import {page} from './documents/page'
import {settings} from './singletons/settings'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import {heroSection} from './sections/heroSection'
import {media} from './objects/media'
import {footer} from './objects/footer'
import {header} from './objects/header'
import {pageBuilder} from './objects/pageBuilder'

const singletons = [settings]
const documents = [page, header, footer]
const objects = [blockContent, link, media, pageBuilder]

const sections = [heroSection]

export const schemaTypes = [...singletons, ...documents, ...objects, ...sections]
