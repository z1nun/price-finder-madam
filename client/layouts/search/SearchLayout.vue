<template>
  <section>
    <SearchHeader />
    <StoreLocation isSearchButton />
    <SearchItem />
  </section>
</template>

<script setup lang="ts">
import SearchHeader from '~/components/search/SearchHeader.vue'
import StoreLocation from '~/components/StoreLocation.vue'
import SearchItem from '~/components/search/SearchItem.vue'
</script>

<style lang="scss" scoped>
section {  
  height: 100vh;
  max-width: 360px;
  background-color: #f9fafb;
  display: flex;
  overflow-x: hidden;
  flex-direction: column;
  gap: 8px;
  z-index: 3;
  @media (min-width: 768px) {
    position: static;
    width: 360px;
  }
}
</style>
