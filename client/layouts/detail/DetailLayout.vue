<template>
    <div>  
      <DetailHeader/>
      <ItemCard/>
    </div>
</template>

<script setup lang="ts">
import DetailHeader from "/components/detail/DetailHeader.vue";
import ItemCard from "/components/detail/ItemCard.vue";


</script>

<style lang="scss" scoped>

div {
  width: 360px;
  height: 100vh;
  background-color : #F9FAFB;
}
</style>