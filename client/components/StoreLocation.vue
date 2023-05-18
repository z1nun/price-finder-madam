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
import LocationModal from '~/components/LocationModal.vue'
import { ref, computed } from 'vue'
import { useStore } from '~/store'

const {
  asyncStates: { currentDoro },
} = useStore()

const location = computed<string>(() => {
  if (!currentDoro.data) return '주소를 찾을 수 없습니다.'
  
  const { area1, area2, area3 } = currentDoro.data.results[0].region
  return `${area1.name} ${area2.name} ${area3.name}`
})

//위치변경 버튼 클릭시 모달 오픈
const modal = ref<boolean>(false)
const openModal = () => {
  modal.value = true
}

const props = withDefaults(defineProps<{ isSearchButton: boolean }>(), {
  isSearchButton: false,
})

//모달 외부 클릭시 모달 창 닫히게 하기
const closeModal = (e: Event) => {
  const target = e.target as Element
  target.className === 'container' ? (modal.value = false) : null
}
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
