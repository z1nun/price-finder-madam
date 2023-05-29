<template>
  <article class="container">
    <div>
      <h3>위치정보</h3>
      <ul>
        <li>{{ storeDetail?.data.storeWayToCome }}</li>
      </ul>
    </div>
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

.container {
  display: flex;
  flex-direction: row;
  align-items: center;

  button {
    cursor: pointer;
    display: flex;
    padding: 4px 8px;
    width: fit-content;
    height: fit-content;

    border: 1px solid #8c95a1;
    border-radius: 40px;

    font-weight: 500;
    font-size: 0.75rem;
    line-height: 150%;
    color: #343e4c;
    background-color: inherit;
  }
}
</style>
