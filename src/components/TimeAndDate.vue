
<template>
  <div className="wrapper">
    <!-- Время формата: "день:месяц:год" -->
    <div className="current_date">{{ currentDate }}</div>
    <!-- Время формата: "час:минуты:секунды" -->
    <div className="current_time">{{ currentTime }}</div>
  </div>
</template>



<script>
  export default {
    data() {
      return {
        currentDate: '',
        currentTime: '',
      }
    },
    mounted() {
      // запускаем функцию обновления текущего времени, чтобы не было лага в 1 секунду
      this.curDateFunc()
      // запускаем функцию обновления текущего времени через сетИнтервал
      setInterval( () => {
        this.curDateFunc()
      }, 1000)
    },
    methods: {
      curDateFunc() {
          const now = new Date();

          let year = now.getFullYear(),
              month = now.getMonth() + 1,
              day = now.getDate(),
              hours = now.getHours(),
              minutes = now.getMinutes()

          function getZero(num) {
            if (num < 10) {
              return `0${num}`;
            } else {
              return `${num}`;
            }
          };

          this.currentDate = `${getZero(day)}.${getZero(month)}.${year}`
          this.currentTime = `${getZero(hours)}:${getZero(minutes)}`
      }
    }
  }
</script>



<style scoped>
  .wrapper {
    margin: 0 auto;
    margin-bottom: 5px;
    width: 220px;
    display: flex;
    justify-content: space-around;
  }

  .current_date {
    color: var(--dark-blue);
    font-size: 20px;
    font-weight: 400;
  }

  .current_time {
    width: 100px;
    color: var(--dark-blue);
    font-size: 20px;
    font-weight: 700;
  }
</style>