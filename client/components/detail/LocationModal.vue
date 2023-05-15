<template>
  <article class="container">
    <div class="locationWrap">
      <h3>위치정보 수정</h3>
      <div class="inputWrap">
        <input placeholder="주소를 입력해주세요." />
        <img src="~/assets/img/search.svg" />
      </div>

      <div>
        <h6>시도</h6>
        <div class="inputWrap">
          <input placeholder="시도 명칭" />
          <img src="~/assets/img/arrowDown.svg" @click="openModal" />
          <LocationSort v-if="modal === true" />
        </div>
      </div>

      <div>
        <h6>동읍면</h6>
        <div class="inputWrap">
          <input placeholder="동읍면 명칭" />
          <img src="~/assets/img/arrowDown.svg" />
        </div>
      </div>
      <button class="primary-button">
        변경하기
      </button>
    </div>
  </article>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const modal = ref(false)

const openModal = () => {
  modal.value = true
}
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
  padding: 21px 20px;
  gap: 24px;

  width: 320px;
  height: 321px;

  background: #ffffff;
  border-radius: 16px;

  h3 {
    width: fit-content;
    height: fit-content;
    margin: 0;
    font-weight: 600;
    font-size: 1rem;
    line-height: 150%;
    color: #000000;
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
}
</style>
