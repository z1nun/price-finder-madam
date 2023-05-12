<template>
  <article class="container">
    <div>
      <h3>위치정보</h3>
      <ul>
        <li>{{ location }}</li>
      </ul>
    </div>
    <button @click="openModal" v-if="isSeacrhPage">위치변경</button>
    <LocationSwitch v-if="modal === true" @click="target" />
  </article>
</template>

<script setup lang="ts">
import LocationSwitch from '~/components/detail/LocationSwitch.vue'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const currentPath = computed(() => route.path)
const location: string = '서울특별시 광진구 자양번영로 13'
const modal = ref(false)
const isSeacrhPage = ref(false)
console.log(currentPath.value)

const openModal = () => {
  modal.value = true
}

const target = (e: Event) => {
  const target = e.target as Element
  target.className === 'container' ? (modal.value = false) : null
}

if (currentPath.value === '/search') {
  isSeacrhPage.value = true
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/StoreCardStyle.scss';

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
