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
import { useStore } from '~/store'
const {
  asyncStates: { storeCards },
} = useStore()
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
