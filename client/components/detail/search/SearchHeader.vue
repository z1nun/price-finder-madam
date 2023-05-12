<template>
  <header>
    <router-link to="/">
      <div class="imageWrap"><img src="~/assets/img/LOGO.svg" /></div>
    </router-link>
    <div class="searchWrap">
      <div class="searchBar">
        <input type="text" placeholder="EX) 매장명,업종명" /><img src="~/assets/img/detail/magnifer.svg" />
      </div>
      <div class="categoryWrap">
        <button>전체</button>
        <button><img src="~/assets/img/detail/dining.svg" />식음료점</button>
        <button><img src="~/assets/img/detail/service.svg" />서비스</button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
header {
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: #ffffff;
  padding-bottom: 16px;
  .imageWrap {
    display: flex;
    align-items: center;
    padding: 12px 20px;
    width: 320px;
    height: fit-content;
  }

  .searchWrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    .searchBar {
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 8px 16px;
      gap: 16px;
      width: 320px;
      height: 48px;
      background: #ffffff;
      border: 1px solid #3366ff;
      border-radius: 8px;

      input {
        border: none;
        outline: none;
        width: 252px;
        height: 38px;
        font-size: 0.875rem;
        font-weight: 600;
      }
    }

    .categoryWrap {
      display: flex;
      justify-content: space-between;
      width: 320px;

      button {
        cursor: pointer;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 8px 12px;
        gap: 4px;
        width: fit-content;
        height: fit-content;
        border: 1px solid #c7c7c7;
        border-radius: 80px;
        font-weight: 600;
        font-size: 1rem;
        line-height: 140%;
        color: #c7c7c7;
        background: none;
      }
    }
  }
}
</style>
