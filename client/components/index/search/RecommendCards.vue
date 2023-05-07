<template>
  <article class="RecommendCards">
    <RecommendCard
      v-for="(recommendCard, i) in recommendCards.slice(0, displayCount)"
      :key="i"
      :recommend-card="recommendCard"
    />
    <RecommendMore />
  </article>
</template>

<script setup lang="ts">
import useDisplay from '~/utils/display'
// import RecommendCard from '~/components/search/RecommendCard.vue'
// import RecommendMore from '~/components/search/RecommendMore.vue'
import RecommendCard from '~/components/index/search/RecommendCard.vue'
import RecommendMore from '~/components/index/search/RecommendMore.vue'

export interface IRecommendCard {
  img?: string
  title: string
  price: number | string
  checked: boolean
  address: string
}

const { divice } = useDisplay()

const displayCount = computed<number>(() => {
  switch (divice.value) {
    case 'xl':
      return 7
    case 'lg':
      return 7
    case 'md':
      return 5
    case 'sm':
      return 3
    case 'xs':
      return 4
  }
})

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

<style scoped lang="scss">
.RecommendCards {
  margin-top: 78px;
  gap: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
