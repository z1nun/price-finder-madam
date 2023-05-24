<template>
  <article class="cardWrap">
    <h3>주변 착한가게</h3>
    <RecommendCard v-for="(recommendCard, i) in recommendCards" :key="i" :recommend-card="recommendCard" />
  </article>
</template>

<script setup lang="ts">
import RecommendCard from '~/components/index/search/RecommendCard.vue'
import { IRecommendCard } from '~/components/index/search/SearchArticles.vue'
import { useStore } from '~/store';

const { asyncStates: { storeCards }} = useStore()

const recommendCards = ref<IRecommendCard[]>([
  {
    title: '착한 가격의 가게',
    price: '금액',
    checked: false,
    address: '강남구 개포로22길 46 지하1층',
    pride: '자랑거리'
  },
  {
    title: '착한 가격의 가게',
    price: '금액',
    checked: false,
    address: '강남구 개포로22길 46 지하1층',
    pride: '자랑거리'
  },
  {
    title: '착한 가격의 가게',
    price: '금액',
    checked: false,
    address: '강남구 개포로22길 46 지하1층',
    pride: '자랑거리'
  },
  {
    title: '착한 가격의 가게',
    price: '금액',
    checked: false,
    address: '강남구 개포로22길 46 지하1층',
    pride: '자랑거리'
  },
  {
    title: '착한 가격의 가게',
    price: '금액',
    checked: false,
    address: '강남구 개포로22길 46 지하1층',
    pride: '자랑거리'
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
  transition: background-color 0.3s ease;
  
  &::-webkit-scrollbar {
    width: 8px;    
    height: 0px;            
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #C7C7C7;
    border-radius: 80px;
  }  

  &:hover {
    &::-webkit-scrollbar-thumb {
      background-color: #C7C7C7;  
    }
  }

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
