<template>
  <section>
    <DetailHeader/>
    <ItemCard/>
  </section>
</template>

<script setup lang="ts">
import DetailHeader from "/components/detail/DetailHeader.vue";
import ItemCard from "/components/detail/ItemCard.vue";

</script>

<style scoped>
section {
  width: 360px;
  background-color : #F9FAFB;
}
</style>