<template>
  <p className="source_descr">Source: <span>www.openweathermap.org</span></p>
</template>

<style scoped lang="scss">
@use '@/assets/variables' as vars;

.source_descr {
  color: vars.$dark-blue;
  text-align: center;
  margin-top: 10px;
  font-size: 17px;
}

.source_descr span {
  font-weight: 600;
  color: vars.$dark-blue;
  font-size: 17px;
}
</style>
