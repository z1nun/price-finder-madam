<template>
  <article class="SearchArticles">
    <!-- <RecommendCards /> -->
    <template v-if="!indexCards.loading">
      <RecommendCard v-for="(recommendCard, i) in recommendCards" :key="i" :recommend-card="recommendCard" />
      <RecommendMore @click="router.push('/search')" />
    </template>
  </article>
</template>

<script setup lang="ts">
import useDisplay from '~/utils/display'
import RecommendMore from '~/components/index/search/RecommendMore.vue'
import RecommendCard from '~/components/index/search/RecommendCard.vue'
import { useStore } from '~/store'
import { StoreCard } from '~/types/baseTypes'

const router = useRouter()
const { divice } = useDisplay()
const {
  asyncStates: { indexCards },
} = useStore()

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

const recommendCards = computed<StoreCard[]>(() => indexCards.data?.slice(0, displayCount.value))
</script>

<style scoped lang="scss">
.SearchArticles {
  margin-top: 40px;
  max-width: 1456px;

  gap: 40px 48px;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
