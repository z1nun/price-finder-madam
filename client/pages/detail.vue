<template>
  <section>
    <DetailLaytout />
    <MapLayout />
  </section>
</template>

<script setup lang="ts">
import DetailLaytout from '~/layouts/detail/DetailLaytout.vue';
import MapLayout from '~/layouts/detail/MapLayout.vue';
</script>

<style scoped lang="scss">
section {
  display: flex;
}

</style>