import type { DirectiveBinding } from 'vue'

export default {
  name: 'v-focus',

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    el.focus()
  },
}
