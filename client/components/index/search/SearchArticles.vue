<template>
  <article class="SearchArticles">
    <SearchTags />    
    <RecommendCards />
  </article>
</template>

<script setup lang="ts">
import SearchTags from './SearchTags.vue'
import RecommendCards from './RecommendCards.vue'
</script>

<style scoped lang="scss">
.SearchArticles {
  margin-top: 40px;
  width: 100%;
  max-width: 1456px;
}
</style>
