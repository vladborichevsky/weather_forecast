<template>
  <div className="input_btn_wrapper">

    <search-input
      :modelValue="modelValue"
      v-focus
      tabindex="1"
      @keyup.enter="getWeatherEmit()"
      @keyup.down="focusOnTipsCityName()"
      @update:modelValue="UpdateModelValue"
      :placeholder="placeholder"
      :title="title"/>

    <search-button
      :disabled="modelValue.length < 2"
      @click="getWeatherEmit()"
      :title="title">
        <img class="icon" src="/icons/magnifying_glass_icon.png" alt="">
    </search-button>

  </div> 
</template>

<script>
  export default {
    setup() {
      const title = "Minimum 3 characters"
      const placeholder = "Enter the name of the city"

      return { title, placeholder }
    },

    props: {
      modelValue: {
        type: String,
        required: true
      }
    },

    emits: {
      'update:modelValue': null,
      'getWeatherEmit': null
    },

    methods: {
      UpdateModelValue(value) {
        this.$emit('update:modelValue', value)
      },
      
      getWeatherEmit() {
        this.$emit('getWeatherEmit')
      },

      focusOnTipsCityName() {
        document.querySelector('.city_tips')?.focus()
      }
    }
  }
</script>

<style scoped>
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