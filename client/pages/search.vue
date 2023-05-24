<template>
  <section>
    <SearchLayout />    
    <MapLayout />
  </section>
</template>

<script setup lang="ts">
import SearchLayout from '~/layouts/search/SearchLayout.vue'
import MapLayout from '~/layouts/detail/MapLayout.vue'
import { useStore } from '~/store';

</script>

<style scoped lang="scss">
section {
  display: flex;
}
</style>
