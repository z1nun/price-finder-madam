<template>
  <article>
    <h3>위치정보</h3>
    <ul>
      <li>{{ location }}</li>
    </ul>
  </article>
</template>

<script setup lang="ts">
const location: string = '서울특별시 광진구 자양번영로 13'
</script>

<style lang="scss" scoped>
@import '~/assets/style/StoreCardStyle.scss';
</style>
