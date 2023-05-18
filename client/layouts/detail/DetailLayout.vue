<template>
  <section>
    <DetailHeader />
    <StoreCard />
    <StoreInformation />
    <StoreLocation />
    <StoreProducts />
  </section>
</template>

<script setup lang="ts">
import DetailHeader from '~/components/detail/detail/DetailHeader.vue'
import StoreCard from '~/components/detail/detail/StoreCard.vue'
import StoreInformation from '~/components/detail/detail/StoreInformation.vue'
import StoreLocation from '~/components/StoreLocation.vue'
import StoreProducts from '~/components/detail/detail/StoreProducts.vue'
</script>

<style scoped lang="scss">
section {
  width: 360px;
  background-color: #f9fafb;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
