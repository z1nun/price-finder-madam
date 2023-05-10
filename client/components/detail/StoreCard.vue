<template>
  <article>
    <h3><img src="~/assets/img/detail/VerifiedCheck.svg" />{{ storeCards.title }}</h3>
    <ul>
      <li v-for="(item, index) in storeCards.description" :key="index">{{ item }}</li>
    </ul>
  </article>
</template>

<script setup lang="ts">
interface IStoreCard {
  title: string
  description: string[]
}

const storeCards = <IStoreCard>{
  title: '착한 가게',
  description: ['한식', '저렴한 가격, 깨끗한 위생'],
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/StoreCardStyle.scss';

li {
  font-size: 1rem;
  font-weight: 600;
}
</style>
