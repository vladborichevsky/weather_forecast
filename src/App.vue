<template>
  <!-- background video -->
  <div class="intro_media">
    <video 
      ref="videoRef" 
      class="intro__media-video" 
      autoplay loop muted playsinline preload="yes" 
      src="/background_video.mp4" 
      type="video/mp4"/>
  </div>
  <!-- background video -->

  <div class="main_info_window">
    <time-and-date/>
    <main-window/>
    <source-descr/>
  </div>

</template>


<script setup>
import { onMounted, ref } from 'vue';

  import TimeAndDate from "@/components/TimeAndDate.vue"
  import MainWindow from "@/components/MainWindow.vue"
  import SourceDescr from "@/components/SourceDescr.vue"

  const videoRef = ref(null) // ref-ссылка на видео

  onMounted(() => {
    if (videoRef.value) {
      videoRef.value.playbackRate = 0.6 // уменьшаем скорость воспроизведения видео
    }
  })
</script>


<style scoped>
  .intro_media {
    z-index: 1;
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  .intro__media-video {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    transform: translate(-50%, -50%);
    object-fit: cover
  }

  .main_info_window {
    z-index: 10;
    position: absolute;
    top: 50%;
    left: 50%;
    transform:  translate(-50%, -50%);
  }
</style>
