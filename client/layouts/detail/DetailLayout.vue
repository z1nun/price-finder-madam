<template>
  <section>
    <DetailHeader/>
    <StoreCard/>
    <StoreInformCard/>
    <StoreLocationCard/>
  </section>
</template>

<script setup lang="ts">
import DetailHeader from "/components/detail/DetailHeader.vue";
import StoreCard from "/components/detail/StoreCard.vue";
import StoreInformCard from "/components/detail/StoreInformCard.vue"
import StoreLocationCard from "/components/detail/StoreLocationCard.vue";



</script>

<style scoped>
section {
  width: 360px;
  background-color : #F9FAFB;
  display: flex;
  flex-direction: column;
  gap : 8px;
}
</style>