<template>
  <article>
    <h3>매장 정보</h3>
    <ul>
      <li
        v-for="(item, index) in storeDetail.data?.storeInfo?.split('\r').filter((item) => item.trim() !== '')"
        :key="index"
      >
        {{ item }}
      </li>
    </ul>
  </article>
</template>

<script setup lang="ts">
import { useStore } from '~/store'
const {
  asyncStates: { storeDetail },
} = useStore()
</script>

<style lang="scss" scoped>
@import '~/assets/style/StoreCard.scss';
</style>
