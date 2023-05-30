<template>
  <article class="cardWrap" >
    <h3 ref="scrollTarget">주변 착한가게</h3>
    <template v-if="storeCards.data.length > 0">
      <RecommendCard v-for="(cardData, i) in storeCards.data" :key="i" :recommend-card="cardData" />
      <div ref="triggerDiv"></div>
    </template>
    <template v-else>      
      <div class="imgWrap">
        <img src="~/assets/img/detail/search-fail.svg"/>
        <div class="text">
          찾신 검색결과가 없어요 <br />
          다른 가게를 찾아보실래요?
        </div>
      </div>
    </template>    
  </article>  
</template>

<script setup lang="ts">
import RecommendCard from '~/components/index/search/RecommendCard.vue'
import { useStore } from '~/store';

const { 
  asyncStates: { storeCards }, 
  states,
  scrollSearch
} = useStore()
const observer = ref<IntersectionObserver | null>(null)
const triggerDiv = ref<Element | null>(null)
const scrollTarget = ref<Element | null>(null)


const handleIntersect = (target: IntersectionObserverEntry) => {
  if (target.isIntersecting) triggerIntersect()
}

const options: IntersectionObserverInit  = {
  root: null,
  threshold: 1
}

const triggerIntersect = () => scrollSearch()


onMounted(() => {
  observer.value = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
    handleIntersect(entries[0])
  }, options)
  observer.value.observe(triggerDiv.value!)
  states.scrollTarget = scrollTarget.value
})

</script>

<style lang="scss" scoped>
.cardWrap {
  background-color: #ffffff;
  position: relative;
  width: 320px;  
  height: 100%;
  display: flex;
  max-height: 590px;
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

.imgWrap {
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
  z-index: 2;

  img {
    margin-left: 30px;
  }

  .text {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 140%;
    margin-top: 20px;
    text-align: center;
    color: #C7C7C7;
  }
}
</style>
