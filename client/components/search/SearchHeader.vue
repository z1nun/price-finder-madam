<template>
  <header>
    <router-link to="/">
      <div class="imageWrap"><img src="~/assets/img/LOGO.svg" /></div>
    </router-link>
    <div class="searchWrap">
      <div class="searchBar">
        <input type="text" placeholder="EX) 매장명,업종명" @input="onChange($event)" />
        <img src="~/assets/img/detail/magnifer.svg" />
      </div>
      <div class="categoryWrap">
        <button @click="categoryClick('all')" :class="iscategoryClick === 'all' ? 'clicked' : ''">전체</button>
        <button @click="categoryClick('dining')" :class="iscategoryClick === 'dining' ? 'clicked' : ''">
          <img src="~/assets/img/detail/dining.svg" />식음료점
        </button>
        <button @click="categoryClick('service')" :class="iscategoryClick === 'service' ? 'clicked' : ''">
          <img src="~/assets/img/detail/service.svg" />서비스
        </button>
      </div>
      <div class="categorydetail">
        <template v-for="btn in buttons" :key="btn.key">
          <button
            v-if="iscategoryClick === 'all' || iscategoryClick === btn.filter"
            @click="categroyDetailClick(btn.key)"
            :class="iscategoryDetailClick === btn.key ? 'clicked' : ''"
          >
            {{ btn.storeType }}
          </button>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue'
//api
import { CategorySearchRequestBody, StoreSearchRequestBody } from '~/types/apiTypes'
import { useStore } from '~/store'
import { storeTypeMap } from '~/types/baseTypes'
const {
  loadCategorySearch,
  loadStoreSearch,
  asyncStates: { currentDoro },
} = useStore()

const iscategoryClick: Ref<string> = ref('')
const iscategoryDetailClick: Ref<string> = ref('')

const categoryClick = (category: string) => {
  iscategoryClick.value = category
}
const categroyDetailClick = (category: string) => {
  iscategoryDetailClick.value = category
  const body: CategorySearchRequestBody = {
    storeType: iscategoryDetailClick.value,
    address: currentDoro.data.address.split(' ')[0] === '서울특별시' ? currentDoro.data.address.split(' ')[2] : '다동',
    page: 0,
  }
  loadCategorySearch(body)
}

type ButtonTypes = {
  storeType: string
  key: string
  filter: string
}

const buttons: ButtonTypes[] = Object.entries(storeTypeMap).map(([key, value], i) => ({
  storeType: value,
  key,
  filter: i < 4 ? 'dining' : 'service',
}))

const onChange = (event: Event | string) => {
  if (typeof event === 'string') {
    console.log(event)
  } else {
    const body: StoreSearchRequestBody = {
      storeName: (event.target as HTMLInputElement).value,
      address:
        currentDoro.data.address.split(' ')[0] === '서울특별시' ? currentDoro.data.address.split(' ')[2] : '다동',
      page: 0,
    }
    loadStoreSearch(body)
  }
}
</script>

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
      width: 320px;
      gap: 12px;

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
      .clicked {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 8px 12px;
        gap: 4px;
        width: fit-content;
        height: fit-content;
        background: #539aff;
        border: 1px solid #3366ff;
        border-radius: 80px;

        font-weight: 600;
        font-size: 1rem;
        line-height: 140%;
        color: #fdfdfd;
      }
    }
  }

  .categorydetail {
    width: 320px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 0 20px;
    gap: 12px;

    button {
      cursor: pointer;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 8px 12px;
      gap: 4px;

      width: fit-content;
      height: fit-content;

      background: #f5f7ff;
      border-radius: 80px;
      border: none;

      font-weight: 600;
      font-size: 16px;
      line-height: 140%;
      color: #8c95a1;
    }

    .clicked {
      color: #3366ff;
    }
  }
}
</style>
