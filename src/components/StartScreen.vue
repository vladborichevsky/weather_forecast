<template>
  <div class="slider">
    <img  
      v-for="(slide, index) in slides" 
      :key="index" 
      :src="slide"
      class="slider_item" 
      alt="image" 
      ref="slider">
  </div>
</template>


<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue'

  let interval: number // для setInterval задаётся тип number, поскольку в среде браузера setInterval возвращает числовой идентификатор таймера

  const slides = [ 
    "/startScreenImg/1.png", 
    "/startScreenImg/2.png", 
    "/startScreenImg/3.png",
    "/startScreenImg/4.png",
    "/startScreenImg/5.png",
    "/startScreenImg/6.png",
    "/startScreenImg/7.png",
    "/startScreenImg/8.png"
  ]

  const slider = ref<HTMLElement[] | null>([]) 

  const currentIndex = ref(0)

  const showNewSlide = (newIndex = 0) => {
    if(slider.value !== null) {
      slider.value.forEach(item => item.style.opacity = '0')
      slider.value[newIndex].style.opacity = '1'
    }
  }

  const changeSlideNext = () => {
    if (currentIndex.value === slides.length - 1) {
      currentIndex.value = 0
    } else {
      currentIndex.value += 1
    }

    showNewSlide(currentIndex.value)
  }

  onMounted( () => {
    showNewSlide()
    interval = setInterval( changeSlideNext, 2500 );
  })

  onBeforeUnmount( () => {
    clearInterval(interval)
  })
</script>


<style scoped lang="scss">
  .slider {
    margin: 0 auto;
    position: relative;
    width: 500px;
    height: 400px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: start;
    z-index: 5;
  }

  .slider_item {
    position: absolute;
    left: 0;
    width: 500px;
    height: 400px;
    opacity: 0;
    transition: opacity 1s;
    z-index: -1;
    object-fit: cover; 
  }
</style>