<template>
  <section>
    <SearchLayout />
    <MapLayout />
  </section>
</template>

<script setup lang="ts">
import SearchLayout from '~/layouts/detail/SearchLayout.vue'
import MapLayout from '~/layouts/detail/MapLayout.vue'
</script>

<style scoped lang="scss">
section {
  display: flex;
}
</style>
