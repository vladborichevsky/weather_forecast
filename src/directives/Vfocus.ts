
import type { DirectiveBinding } from 'vue';

export default {
  name: 'v-focus',

  mounted(el: HTMLElement, binding: DirectiveBinding) {
    el.focus()
  },
};