import { DefaultComponent } from '@loadable/component'
export type PageFiles = Record<string, () => Promise<DefaultComponent<unknown>>>
export {}
