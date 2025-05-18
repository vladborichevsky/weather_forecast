<template>
  <div>
    <div className="info_item_error">
      {{ errorFetchMes }}
    </div>

    <div v-show="fetchFail">
      <img src="/fetchFail.webp" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  errorFetchMes: string
  fetchFail: boolean
}>()
</script>

<style scoped lang="scss">
@use '@/assets/variables' as vars;

.info_item_error {
  margin-top: 5px;
  color: vars.$red-color;
  font-size: 16px;
  min-height: 20px;
}
</style>
