<template>
  <ClientOnly>
    <section class="SearchLayoutWrapper">    
      <article class="Title"> 주변의 착한소비를 찾아보세요 </article>
      <SearchBar />
      <SerachArticles />
    </section>
  </ClientOnly>
</template>

<script setup lang="ts">
import SearchBar from '~/components/index/search/SearchBar.vue'
import SerachArticles from '~/components/index/search/SerachArticles.vue'

</script>

<style scoped lang="scss">



$borderTest: 1px solid black;
.SearchLayoutWrapper {

  font-family: 'Pretendard';
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 994px;

  background-color: #F9FAFB;
  
  .Title {           
    text-align: center;
    font-size: 28px;
    font-weight: 700;
    line-height: 150%;
    margin-top: 80px;
  } 
}
</style>