<template>
  <article>
    <h3>매장 정보</h3>
    <ul>
      <li v-for="(item, index) in inform" :key="index">{{ item }}</li>
    </ul>
  </article>
</template>

<script setup lang="ts">
const inform: string[] = ['영업시간 :07:30~20:00 휴무 :수', '남성역 1번 출구에서182m', '02-775-0038']
</script>

<style lang="scss" scoped>
@import '~/assets/style/StoreCard.scss';
</style>
