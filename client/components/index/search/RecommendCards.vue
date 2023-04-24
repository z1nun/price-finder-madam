<template>
  <article class="RecommendCards">
    <RecommendCard 
      v-for="(recommendCard, i) in recommendCards"
      :key="i"
      :recommendCard="recommendCard"
    />
    <article class="RecommendCard">
    </article>
  </article>
</template>

<script setup lang="ts">
import RecommendCard from './RecommendCard.vue'

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
    address: '강남구 개포로22길 46 지하1층'
  },
  {
    title: '착한 가격의 가게',
    price: '금액',
    checked: false,
    address: '강남구 개포로22길 46 지하1층'
  },
  {
    title: '착한 가격의 가게',
    price: '금액',
    checked: false,
    address: '강남구 개포로22길 46 지하1층'
  },
  {
    title: '착한 가격의 가게',
    price: '금액',
    checked: false,
    address: '강남구 개포로22길 46 지하1층'
  },
  {
    title: '착한 가격의 가게',
    price: '금액',
    checked: false,
    address: '강남구 개포로22길 46 지하1층'
  },
  {
    title: '착한 가격의 가게',
    price: '금액',
    checked: false,
    address: '강남구 개포로22길 46 지하1층'
  },
  {
    title: '착한 가격의 가게',
    price: '금액',
    checked: false,
    address: '강남구 개포로22길 46 지하1층'
  },
])

</script>

<style scoped lang="scss">
.RecommendCards {
  margin-top: 78px;
  gap: 40px;
  display: flex;  
  flex-wrap: wrap;  
  justify-content: space-around;
}
</style>