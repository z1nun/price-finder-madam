<template>
  <article class="container">
    <div>
      <h3>위치정보</h3>
      <ul>
        <li>{{ location }}</li>
      </ul>
    </div>
    <button @click="openModal" v-if="props.isSearchButton">위치변경</button>
    <LocationModal v-if="modal === true" @click="closeModal" />
  </article>
</template>

<script setup lang="ts">
import LocationModal from '~/components/detail/LocationModal.vue'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
const location: string = '서울특별시 광진구 자양번영로 13'

//위치변경 버튼 클릭시 모달 오픈
const modal = ref<boolean>(false)
const openModal = () => {
  modal.value = true
}

interface StoreLocationProp {
  isSearchButton?: boolean
}

const props = withDefaults(defineProps<StoreLocationProp>(), {
  isSearchButton: false,
})

//모달 외부 클릭시 모달 창 닫히게 하기
const closeModal = (e: Event) => {
  const target = e.target as Element
  target.className === 'container' ? (modal.value = false) : null
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
