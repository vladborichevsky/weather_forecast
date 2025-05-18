<template>
  <div className="wrapper">
    <div className="current_date">
      {{ currentDate }} <span>{{ currentTime }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const currentDate = ref<string>('')
const currentTime = ref<string>('')

const curDateFunc = (): void => {
  const now = new Date()

  const year = now.getFullYear(),
    month = now.getMonth() + 1,
    day = now.getDate(),
    hours = now.getHours(),
    minutes = now.getMinutes()

  function getZero(num: number): string {
    if (num < 10) {
      return `0${num}`
    } else {
      return `${num}`
    }
  }

  currentDate.value = `${getZero(day)}.${getZero(month)}.${year}`
  currentTime.value = `${getZero(hours)}:${getZero(minutes)}`
}

onMounted(() => {
  // запускаем функцию обновления текущего времени, чтобы не было лага в 1 секунду
  curDateFunc()
  // запускаем функцию обновления текущего времени через сетИнтервал
  setInterval(() => {
    curDateFunc()
  }, 1000)
})
</script>

<style scoped lang="scss">
@use '@/assets/variables' as vars;

.wrapper {
  margin: 0 auto;
  margin-bottom: 5px;
  width: 220px;
  display: flex;
  justify-content: space-around;
}

.current_date {
  color: vars.$dark-blue;
  font-size: 20px;
  font-weight: 400;

  span {
    width: 100px;
    color: vars.$dark-blue;
    font-size: 20px;
    font-weight: 700;
  }
}
</style>
