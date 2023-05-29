<template>
  <article>
    <h3><img src="~/assets/img/detail/VerifiedCheck.svg" />착한가게</h3>
    <ul
      v-for="(item, index) in storeDetail.data?.storePride?.split('\r').filter((item) => item.trim() !== '')"
      :key="index"
    >
      <li>{{ item }}</li>
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

li {
  font-size: 1rem;
  font-weight: 600;
}
</style>
