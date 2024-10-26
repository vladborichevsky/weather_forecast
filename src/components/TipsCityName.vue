<template>
  <div 
    class="tips_city_name_container"
    v-show="tipsCityName.length > 0">
      <ul class="wrapper">
        <button
          v-for="(city, index) in tipsCityName.slice(0, 5)"
          @click="setCityName(city.name)"
          @keyup.down.prevent="changeFocusDown(index)"
          @keyup.up.prevent="changeFocusUp(index)"
          @mouseenter="removeFocus()"
          class="city_tips" 
          :tabindex="index + 2"
          :key="index">
            <span>{{ city.name }}</span>, {{ city.country }}
        </button>
      </ul>
  </div>
</template>

<script>
  export default {
    props: {
      tipsCityName: {
        type: Array,
        required: false
      }
    },

    emits: {
      'setCityName': null
    },

    methods: {
      setCityName(value) {
        this.$emit('setCityName', value)
      },

      changeFocusDown(index) {
        if (index <= (document.querySelectorAll('.city_tips').length - 2)) {
          document.querySelectorAll('.city_tips')[index + 1].focus()
        }
      },

      changeFocusUp(index) {
        if (index === 0) {
          document.querySelector('.search_input').focus()
        } else {
          document.querySelectorAll('.city_tips')[index - 1].focus()
        }
      },
      
      removeFocus() {
        document.querySelectorAll('.city_tips')?.forEach(item => {
          item.blur()
        }) 
      }
      
    }
  }
</script>

<style scoped>
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
    background-color: var(--main-color-opacity);
    color: var(--deep-dark-blue);
    border: none;
    padding: 5px;
    cursor: pointer;
  }

  .city_tips:hover {
    background-color: var(--grey-color);
  }

  .city_tips:focus {
    background-color: var(--grey-color);
    outline: none;
  }

  .city_tips span {
    font-weight: 700;
    color: var(--deep-dark-blue);
  }  
</style>