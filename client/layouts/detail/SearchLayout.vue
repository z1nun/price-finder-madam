<template>
  <section>
    <SearchHeader />
    <StoreLocation isSearchButton />
    <SearchItem />
  </section>
</template>

<script setup lang="ts">
import SearchHeader from '~/components/detail/search/SearchHeader.vue'
import StoreLocation from '~/components/detail/StoreLocation.vue'
import SearchItem from '~/components/detail/search/SearchItem.vue'
</script>

<style lang="scss" scoped>
section {
  width: 360px;
  background-color: #f9fafb;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
