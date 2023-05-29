<template>
  <header>
    <router-link to="/">
      <div class="imageWrap"><img src="~/assets/img/LOGO.svg" /></div>
    </router-link>
    <div class="searchWrap">
      <div class="searchBar">
        <input type="text" placeholder="EX) 매장명,업종명" /><img src="~/assets/img/detail/magnifier.svg" />
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
        <button
          @click="categroyDetailClick('1')"
          :class="iscategoryDetailClick === '1' ? 'clicked' : ''"
          v-if="iscategoryClick === 'all' || iscategoryClick === 'dining'"
        >
          한식
        </button>
        <button
          @click="categroyDetailClick('2')"
          :class="iscategoryDetailClick === '2' ? 'clicked' : ''"
          v-if="iscategoryClick === 'all' || iscategoryClick === 'dining'"
        >
          중식
        </button>
        <button
          @click="categroyDetailClick('3')"
          :class="iscategoryDetailClick === '3' ? 'clicked' : ''"
          v-if="iscategoryClick === 'all' || iscategoryClick === 'dining'"
        >
          경양식, 일식
        </button>
        <button
          @click="categroyDetailClick('4')"
          :class="iscategoryDetailClick === '4' ? 'clicked' : ''"
          v-if="iscategoryClick === 'all' || iscategoryClick === 'service'"
        >
          기타외식업
        </button>
        <button
          @click="categroyDetailClick('5')"
          :class="iscategoryDetailClick === '5' ? 'clicked' : ''"
          v-if="iscategoryClick === 'all' || iscategoryClick === 'service'"
        >
          미용업
        </button>
        <button
          @click="categroyDetailClick('6')"
          :class="iscategoryDetailClick === '6' ? 'clicked' : ''"
          v-if="iscategoryClick === 'all' || iscategoryClick === 'service'"
        >
          목욕업
        </button>
        <button
          @click="categroyDetailClick('7')"
          :class="iscategoryDetailClick === '7' ? 'clicked' : ''"
          v-if="iscategoryClick === 'all' || iscategoryClick === 'service'"
        >
          세탁업
        </button>
        <button
          @click="categroyDetailClick('8')"
          :class="iscategoryDetailClick === '8' ? 'clicked' : ''"
          v-if="iscategoryClick === 'all' || iscategoryClick === 'service'"
        >
          숙박업
        </button>
        <button
          @click="categroyDetailClick('13')"
          :class="iscategoryDetailClick === '13' ? 'clicked' : ''"
          v-if="iscategoryClick === 'all' || iscategoryClick === 'service'"
        >
          기타서비스
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue'
//api
import { CategorySearchRequestBody } from '~/types/apiTypes'
import { useStore } from '~/store'
const { loadCategorySearch } = useStore()
const {
  asyncStates: { currentDoro },
} = useStore()

const iscategoryClick: Ref<string> = ref('')
const iscategoryDetailClick: Ref<string> = ref('')

const categoryClick = (category: string) => {
  iscategoryClick.value = category
}
const categroyDetailClick = (category: string) => {
  iscategoryDetailClick.value = category
  console.log(iscategoryDetailClick.value)
  const body: CategorySearchRequestBody = {
    storeType: iscategoryDetailClick.value,
    address: '북창동',
    page: 0,
  }
  loadCategorySearch(body)
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
