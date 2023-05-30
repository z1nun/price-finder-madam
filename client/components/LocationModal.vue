<template>
  <article class="container">
    <section class="locationWrap">
      <div class="top">
        <h3>위치정보 수정</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-x-lg"
          viewBox="0 0 16 16"
          @click="sendToParentModal()"
        >
          <path
            d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
          />
        </svg>
      </div>
      <div class="inputWrap">
        <input placeholder="서울특별시" />
      </div>

      <div>
        <h6>구</h6>
        <div class="inputWrap">
          <input placeholder="구 명칭" v-model="selectedGu" />
          <img v-if="modalGu === false" src="~/assets/img/arrowDown.svg" @click="openModalGu" />
          <img v-if="modalGu === true" src="~/assets/img/arrowUp.svg" @click="openModalGu" />
        </div>
        <DropMenuGu v-if="modalGu === true" v-model="selectedGu" @UpdateSelectedGu="UpdateSelectedGu" />
      </div>

      <div v-if="selectedGu">
        <h6>동</h6>
        <div class="inputWrap">
          <input placeholder="동 명칭" v-model="selectedDong" />
          <img v-if="modalDong === false" src="~/assets/img/arrowDown.svg" @click="openModalDong" />
          <img v-if="modalDong === true" src="~/assets/img/arrowUp.svg" @click="openModalDong" />
        </div>
        <DropMenuDong
          v-if="modalDong === true"
          :Gu="selectedGu"
          v-model="selectedDong"
          @updateSelectedDong="updateSelectedDong"
        />
      </div>
      <ClickButton class="clickButton" title="변경하기" @click="search()" />
    </section>
  </article>
</template>

<script setup lang="ts">
import ClickButton from '~/components/ClickButton.vue'
import DropMenuGu from '~/components/search/DropMenuGu.vue'
import DropMenuDong from '~/components/search/DropMenuDong.vue'
import { ref, watch, defineEmits } from 'vue'
import { CategorySearchRequestBody } from '~/types/apiTypes'
import { useStore } from '~/store'
const {
  loadCategorySearch,
  loadGeocodeReverse,
  asyncStates: { currentDoro },
} = useStore()

//모달 열고 닫기
const modalGu = ref(false)
const modalDong = ref(false)
const openModalGu = () => {
  modalGu.value = !modalGu.value
}
const openModalDong = () => {
  modalDong.value = !modalDong.value
}

//하위 컴포넌트에서 전달받은 '구' 와 '동'
const selectedGu = ref('')
const selectedDong = ref('')

//값 변경
const UpdateSelectedGu = (data: string) => {
  selectedGu.value = data
}
const updateSelectedDong = (data: string) => {
  selectedDong.value = data
}

// const latlng = () => {
//   loadGeocodeReverse('currentDoro.data.adrress')
// }

const search = () => {
  const body: CategorySearchRequestBody = {
    storeType: '1', //default 1인데 전체인것도 가능한지?
    address: selectedDong.value,
    page: 0,
  }
  loadCategorySearch(body)
  sendToParentDong()
  sendToParentGu()
  sendToParentModal()
}

//구 바뀌면 동 초기화
const changeValue = () => {
  selectedDong.value = ''
}

//상위 컴포넌트 storeLocation에 값 전달
const emitEvents = defineEmits(['UpdateDong', 'UpdateGu', 'UpdateModal'])
const sendToParentDong = () => {
  emitEvents('UpdateDong', selectedDong.value)
}
const sendToParentGu = () => {
  emitEvents('UpdateGu', selectedGu.value)
}
const sendToParentModal = () => {
  emitEvents('UpdateModal', false)
}

watch(selectedGu, changeValue)
watch(selectedGu, sendToParentDong)
watch(selectedGu, sendToParentGu)
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: #00000050;
}

.locationWrap {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  gap: 24px;

  width: 320px;
  height: fit-content;

  background: #ffffff;
  border-radius: 16px;

  .top {
    width: inherit;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    h3 {
      width: fit-content;
      height: fit-content;
      margin: 0;
      font-weight: 600;
      font-size: 1rem;
      line-height: 150%;
      color: #000000;
    }
    svg {
      cursor: pointer;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 4px;

    h6 {
      width: fit-content;
      height: fit-content;
      margin: 0;
      font-weight: 500;
      font-size: 0.75rem;
      line-height: 140%;
      color: #343e4c;
    }
  }

  .inputWrap {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
    gap: 8px;

    width: 320px;
    height: 37px;

    border: 1px solid #c7c7c7;
    border-radius: 8px;

    input {
      border: none;
      outline: none;
      width: 252px;
      height: 28px;
      font-size: 0.875rem;
      font-weight: 600;
    }

    img {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  }

  input::placeholder {
    width: 264px;
    height: 21px;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 150%;
    color: #8c95a1;
  }

  .clickButton {
    margin: 0 auto;
  }
}
</style>
