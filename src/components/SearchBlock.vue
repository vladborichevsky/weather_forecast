<template>
  <div className="input_btn_wrapper">

    <search-input
      :modelValue="modelValue"
      v-focus
      tabindex="1"
      @keyup.enter="getWeatherEmit()"
      @keyup.down="focusOnTipsCityName()"
      @update:modelValue="updateModelValue"
      :placeholder="placeholder"
      :title="title"/>

    <search-button
      :disabled="modelValue.length < 2"
      @click="getWeatherEmit()"
      :title="title">
        <img class="icon" src="/icons/magnifying_glass_icon.webp" alt="">
    </search-button>

  </div> 
</template>


<script setup lang="ts">
  import SearchInput from "@/components/UI/SearchInput.vue"
  import SearchButton from "@/components/UI/SearchButton.vue"

  const title = "Minimum 3 characters"
  const placeholder = "Enter the name of the city"

  const props = defineProps<{
    modelValue: string,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: string): void;
    (event: 'getWeatherEmit'): void;
  }>()

  const updateModelValue = (value: string) => {
    emit('update:modelValue', value)
  }
  
  const getWeatherEmit = () => {
    emit('getWeatherEmit')
  }

  const focusOnTipsCityName = () => {
    const cityTips: Element | null = document.querySelector('.city_tips')

    if(cityTips !== null && cityTips instanceof HTMLButtonElement) {
      cityTips?.focus()
    }
  }
</script>


<style scoped lang="scss">
  .input_btn_wrapper {
    margin-top: 10px;
    width: 300px;
    display:  flex;
    justify-content: center;
  }

  .icon {
    width: 30px;
  }
</style>