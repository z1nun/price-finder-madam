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
import DetailHeader from '~/components/detail/DetailHeader.vue'
import StoreCard from '~/components/detail/StoreCard.vue'
import StoreInformation from '~/components/detail/StoreInformation.vue'
import StoreLocation from '~/components/detail/StoreLocation.vue'
import StoreProducts from '~/components/detail/StoreProducts.vue'
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
