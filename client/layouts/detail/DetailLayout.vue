<template>
  <section>
    <DetailHeader />
    <div class="divWrap">
      <StoreCard />
      <StoreInformation />
      <StoreLocation />
      <StoreProducts />
    </div>
  </section>
</template>

<script setup lang="ts">
import DetailHeader from '~/components/detail/detail/DetailHeader.vue'
import StoreCard from '~/components/detail/detail/StoreCard.vue'
import StoreInformation from '~/components/detail/detail/StoreInformation.vue'
import StoreLocation from '~/components/detail/detail/StoreLocation.vue'
import StoreProducts from '~/components/detail/detail/StoreProducts.vue'

import { useStore } from '~/store'
const {
  asyncStates: { storeDetail },
} = useStore()
</script>

<style scoped lang="scss">
section {
  width: 100%;
  height: 100vh;
  background-color: #f9fafb;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 3;
  overflow-x: hidden;

  @media (min-width: 768px) {
    position: static;
    width: 360px;
  }
}

.divWrap {
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
}
</style>
