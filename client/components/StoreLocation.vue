<template>
  <article class="container">
    <div>
      <h3>위치정보</h3>
      <ul v-if="!currentDoro.loading">
        <div v-if="!Gu">
          <li>{{ !currentDoro.data.address ? '주소를 찾을 수 없습니다' : currentDoro.data.address }}</li>
        </div>
        <div v-else>
          <li>{{ `서울특별시 ${Gu} ${Dong}` }}</li>
        </div>
      </ul>
    </div>
    <button @click="openModal" v-if="props.isSearchButton">위치변경</button>
    <LocationModal
      v-if="modal === true"
      @click="closeModal"
      @updateDong="UpdateDong"
      @updateGu="UpdateGu"
      @updateModal="UpdateModal"
    />
  </article>
</template>

<script setup lang="ts">
import LocationModal from '~/components/LocationModal.vue'
import { ref } from 'vue'
import { useStore } from '~/store'

const {
  asyncStates: { currentDoro },
  loadCategorySearch,
} = useStore()

//위치변경 버튼 클릭시 모달 오픈
const modal = ref<boolean>(false)
const openModal = () => {
  modal.value = true
}

//하위컴포넌트 (LocationModal) 에서 받아온 데이터
const Dong = ref('')
const Gu = ref('')
const UpdateDong = (data: string) => {
  Dong.value = data
}
const UpdateGu = (data: string) => {
  Gu.value = data
}
const UpdateModal = (data: boolean) => {
  modal.value = data
  currentDoro.data.address = `서울특별시 ${Gu.value} ${Dong.value}`
}

//모달 외부 클릭시 모달 창 닫히게 하기
const closeModal = (e: Event) => {
  const target = e.target as Element
  target.className === 'container' ? (modal.value = false) : null
}

const props = withDefaults(defineProps<{ isSearchButton: boolean }>(), {
  isSearchButton: false,
})
</script>

<style lang="scss" scoped>
@import '~/assets/style/StoreCard.scss';

.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

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
