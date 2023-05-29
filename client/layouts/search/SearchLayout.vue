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
import { CategorySearchRequestBody } from '~/types/apiTypes'
import { useStore } from '~/store'
import { onMounted } from 'vue'
const { loadCategorySearch } = useStore()
const {
  asyncStates: { currentDoro },
} = useStore()

onMounted(() => {
  const body: CategorySearchRequestBody = {
    storeType: '1', //default는 한식?
    address: currentDoro.data.address.split(' ')[0] === '서울특별시' ? currentDoro.data.address.split(' ')[2] : '다동',
    page: 0,
  }
  loadCategorySearch(body)
})
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
