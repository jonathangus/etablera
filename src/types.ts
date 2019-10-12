import SmoothItem from './utils/scroll/SmoothItem'

export interface ISettingsContext {
  (str: string, withHtml?: boolean): string
  url: (str: string) => string
  translate: () => string
  isSwedish: boolean
  currentLanguage: 'sv-SE' | 'en-US'
}

type MarkdownText = {
  childMarkdownRemark: {
    html: string
  }
}

export type ContentfulNode = {
  node_locale: string
}

export type ContentfulEdge = {
  node: ContentfulNode
}

type CaseSection = {
  __typename: string
}

export type IMediaElement = {
  image?: IImage
  video?: string
  file: {
    url: string
    contentType: string
  }
}

export type ICaseTextSection = {
  title: string
  body: MarkdownText
  media: IMediaElement
  type: 'center' | 'left' | 'right'
}

export type ICase = {
  mainImage: IGatsbyImage
  name: string
  client?: string
  weight: number
  node_locale: string
  videoUrlDesktop: string
  videoUrlMobile: string
  sections: Array<CaseSection>
  id: string
}

export type IImage = any

export type IGatsbyImage = {
  fluid?: IImage
  fixed?: IImage
  title?: string
}

export interface IThemeContext {
  toggleTheme: () => void
  selected: 'light' | 'dark'
}

export interface ICasePageContext {
  idle: boolean
  title: boolean
  content: boolean
  titleComplete: () => void
  showContent: () => void
  contentHideCss: any
  contentShowCss: any
}

export interface IUiContext {
  showHeader: () => void
  animateContent: boolean
  hideHeader: () => void
  headerShown: boolean
  mounted: boolean
  frontpageLoaded: boolean
  setFrontpageLoaded: (value: boolean) => void
  setMounted: () => void
  pageTransitionActive: boolean
  setPageTransitionActive: (active: boolean) => void
  setEtableraSmooth: (smooth: SmoothItem) => void
  etableraSmooth: SmoothItem
  showTitleCanvas: boolean
  ignoreDefaultHeaderAnimation: () => void
}

export type ISectionFullVideo = {
  vimeoId: string
  poster: IImage
}

export type ISectionSectionOutro = {
  title?: string
  buttonText?: string
  websiteLink?: string
  text?: MarkdownText
}

export type IService = {
  name: string
  body: MarkdownText
}
