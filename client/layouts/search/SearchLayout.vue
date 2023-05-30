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
  width: 80%;
  background-color: #f9fafb;
  display: flex;
  flex-direction: column;
  gap: 8px;
  @media (min-width: 768px) {
    width: 360px;
  }
}
</style>
