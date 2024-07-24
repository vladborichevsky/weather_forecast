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



<script>
  export default {
    setup() {
      let interval;

      const slides = [ 
              "/startScreenImg/1.png", 
              "/startScreenImg/2.png", 
              "/startScreenImg/3.png",
              "/startScreenImg/4.png",
              "/startScreenImg/5.png",
              "/startScreenImg/6.png",
              "/startScreenImg/7.png",
              "/startScreenImg/8.png"
            ];

      return {
        interval, slides
      }
    },

    data() {
      return {
        currentIndex: 0
      } 
    },

    methods: {
      showNewSlide(newIndex = 0) {
        this.$refs.slider.forEach(item => item.style.opacity = 0)
        this.$refs.slider[newIndex].style.opacity = 1;
      },

      changeSlideNext() {
        if (this.currentIndex === this.slides.length - 1) {
          this.currentIndex = 0
        } else {
          this.currentIndex += 1
        }

        this.showNewSlide(this.currentIndex)
      }
    },

    mounted() {
      this.showNewSlide()

      this.interval = setInterval( this.changeSlideNext, 2500 );
    },

    beforeUnmount() {
      clearInterval(this.interval)
    }
  }

</script>

<style scoped>
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