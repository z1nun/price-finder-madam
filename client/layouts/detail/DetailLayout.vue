<template>
  <section>
    <DetailHeader/>
    <StoreCard/>
    <StoreInformCard/>
  </section>
</template>

<script setup lang="ts">
import DetailHeader from "/components/detail/DetailHeader.vue";
import StoreCard from "/components/detail/StoreCard.vue";
import StoreInformCard from "/components/detail/StoreInformCard.vue"



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