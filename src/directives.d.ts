import type { ObjectDirective } from 'vue'

export {}

declare module 'vue' {
  export interface GlobalDirectives {
    vPermission: ObjectDirective<HTMLElement, string[] | string>
  }
}
