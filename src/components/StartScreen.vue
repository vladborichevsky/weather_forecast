<template>
  <div class="slider">
    <img  
      v-for="(slide, index) in slides" 
      :key="index" 
      :src="slide"
      class="slider_item" 
      alt="image" 
      ref="slider"
      loading="lazy">
  </div>
</template>


<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue'

  let interval: number // для setInterval задаётся тип number, поскольку в среде браузера setInterval возвращает числовой идентификатор таймера

  const slides = [ 
    "/startScreenImg/1.webp", 
    "/startScreenImg/2.webp", 
    "/startScreenImg/3.webp",
    "/startScreenImg/4.webp",
    "/startScreenImg/5.webp",
    "/startScreenImg/6.webp",
    "/startScreenImg/7.webp",
    "/startScreenImg/8.webp"
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
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 1s;
    z-index: -1;
    object-fit: cover; 
  }

  @media (max-width: 800px) {
    .slider {
      width: 350px;
      height: 300px;
    }
  }

  @media (max-width: 400px) {
    .slider {
      width: 250px;
      height: 200px;
    }
  }
</style>