<template>
  <article class="cardWrap">
    <h3>주변 착한가게</h3>
    <RecommendCard v-for="(recommendCard, i) in recommendCards" :key="i" :recommend-card="recommendCard" />
  </article>
</template>

<script setup lang="ts">
import RecommendCard from '~/components/index/search/RecommendCard.vue'

export interface IRecommendCard {
  img?: string
  title: string
  price: number | string
  checked: boolean
  address: string
}
const recommendCards = ref<IRecommendCard[]>([
  {
    title: '착한 가격의 가게',
    price: '금액',
    checked: false,
    address: '강남구 개포로22길 46 지하1층',
  },
  {
    title: '착한 가격의 가게',
    price: '금액',
    checked: false,
    address: '강남구 개포로22길 46 지하1층',
  },
  {
    title: '착한 가격의 가게',
    price: '금액',
    checked: false,
    address: '강남구 개포로22길 46 지하1층',
  },
  {
    title: '착한 가격의 가게',
    price: '금액',
    checked: false,
    address: '강남구 개포로22길 46 지하1층',
  },
  {
    title: '착한 가격의 가게',
    price: '금액',
    checked: false,
    address: '강남구 개포로22길 46 지하1층',
  },
])
</script>

<style lang="scss" scoped>
.cardWrap {
  background-color: #ffffff;
  width: 320px;
  max-height: 610px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 20px;
  gap: 24px;
  overflow-y: auto;

  h3 {
    width: inherit;
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 1.125rem;
    line-height: 140%;
    color: #343e4c;
    margin: 0;
  }
}
</style>
