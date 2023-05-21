<template>
  <ClientOnly>
    <section class="SearchLayoutWrapper">
      <article class="Title">주변의 착한소비를 찾아보세요</article>
      <SearchBar />
      <SearchArticles />
    </section>
  </ClientOnly>
</template>

<script setup lang="ts">
import SearchBar from '/components/index/search/SearchBar.vue'
import SearchArticles from '/components/index/search/SearchArticles.vue'
</script>

<style scoped lang="scss">
$borderTest: 1px solid black;
.SearchLayoutWrapper {
  font-family: 'Pretendard';
  display: flex;
  flex-direction: column;
  align-items: center;

  min-height: 847px;
  padding-bottom: 80px;

  background-color: #f9fafb;

  .Title {
    margin-top: 80px;
    font-size: 28px;
    font-weight: 700;
    line-height: 150%;
  }
}
</style>
