<template>
  <section>
    <DetailLayout />
    <MapLayout />
  </section>
</template>

<script setup lang="ts">
import { useStore } from '~/store';
import DetailLayout from '/layouts/detail/DetailLayout.vue';
import MapLayout from '/layouts/detail/MapLayout.vue';

const route = useRoute()
const { 
  loadStoreDetail,  
 } = useStore()

onMounted(() => { 
  const id = route.params.id as string
  loadStoreDetail(id)
})

</script>

<style scoped lang="scss">
section {
  display: flex;
}

</style>