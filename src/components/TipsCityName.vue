<template>
  <div class="tips_city_name_container" v-show="tipsCityName.length > 0">
    <ul class="wrapper">
      <button
        v-for="(city, index) in tipsCityName.slice(0, 5)"
        @click="setCityName(city.name)"
        @keyup.down.prevent="changeFocusDown(index)"
        @keyup.up.prevent="changeFocusUp(index)"
        @mouseenter="removeFocus()"
        class="city_tips"
        :tabindex="index + 2"
        :key="index"
      >
        <span>{{ city.name }}</span
        >, {{ city.country }}
      </button>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface TipsCityNameObj {
  name: string
  country: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  tipsCityName: TipsCityNameObj[]
}>()

const emit = defineEmits<{
  (event: 'setCityName', value: string): void
}>()

const setCityName = (value: string) => {
  emit('setCityName', value)
}

const changeFocusDown = (index: number) => {
  const cityTipsArr = document.querySelectorAll<HTMLElement>('.city_tips')

  if (
    cityTipsArr !== null &&
    cityTipsArr[index] instanceof HTMLButtonElement &&
    index <= cityTipsArr.length - 2
  ) {
    cityTipsArr[index + 1].focus()
  }
}

const changeFocusUp = (index: number) => {
  const searchInput: Element | null = document.querySelector('.search_input')
  const cityTipsArr = document.querySelectorAll<HTMLElement>('.city_tips')

  if (
    searchInput !== null &&
    searchInput instanceof HTMLInputElement &&
    index === 0
  ) {
    searchInput?.focus()
  } else {
    cityTipsArr[index - 1].focus()
  }
}

const removeFocus = () => {
  const cityTipsArr = document.querySelectorAll<HTMLElement>('.city_tips')

  cityTipsArr.forEach(item => {
    item.blur()
  })
}
</script>

<style scoped lang="scss">
@use '@/assets/variables' as vars;

.tips_city_name_container {
  position: relative;
  width: 300px;
}

.wrapper {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 15;
  width: 100%;
}

.city_tips {
  width: 100%;
  list-style-type: none;
  background-color: vars.$main-color-opacity;
  color: vars.$deep-dark-blue;
  border: none;
  padding: 5px;
  cursor: pointer;
}

.city_tips:hover {
  background-color: vars.$grey-color;
}

.city_tips:focus {
  background-color: vars.$grey-color;
  outline: none;
}

.city_tips span {
  font-weight: 700;
  color: vars.$deep-dark-blue;
}

@media (max-width: 500px) {
  .tips_city_name_container {
    width: 250px;
  }
}
</style>
