<template>
  <article class="RecommendCard" @click="onCardClick">
    <div class="top">
      <div class="IconBox">
        <img src="~/assets/img/defaultIcon.svg" />
      </div>
      <div class="Category">
        {{ storeTypeMap[recommendCard.storeType as number] }}
      </div>
    </div>

    <div class="bottom">
      <div class="title">
        {{ recommendCard.storeName }}
      </div>
      <div class="address">
        {{ recommendCard.storeAddress }}
      </div>
      <div class="pride">
        {{ recommendCard.storePride }}
      </div>
    </div>

    <div class="check">
      <img src="~/assets/img/check.svg" />
    </div>
  </article>
</template>

<script setup lang="ts">
import { useStore } from '~/store'
import { StoreCard, storeTypeMap } from '~/types/baseTypes'

interface RecommendCardProp {
  recommendCard: StoreCard
}

const { recommendCard } = defineProps<RecommendCardProp>()
const { loadStoreDetail } = useStore()
const route = useRoute()
const { push } = useRouter()

const onCardClick = () => {
  if (route.params.id == String(recommendCard.storeId)) return
  loadStoreDetail(String(recommendCard.storeId))
  push(`/detail/${recommendCard.storeId}`)
}
</script>

<style lang="scss">
.RecommendCard {
  max-height: 232px;
  width: 310px;
  position: relative;
  box-sizing: border-box;
  padding: 20px;

  background: #ffffff;
  border-radius: 16px;
  box-shadow: 2px 3px 16px 1px rgba(221, 221, 221, 0.08), 2px 3px 6px 3px rgba(230, 230, 230, 0.16);

  transition: all 0.3s;
  cursor: pointer;

  .top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    .IconBox {
      width: 80px;
      height: 80px;
      border-radius: 16px;
      display: flex;
      background-color: #f7f7f7;
      justify-content: center;
      align-items: center;
    }

    .Category {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 28px;
      width: 44px;
      font-weight: bold;
      padding: 8px;
      background-color: #f7f7f7;
      border-radius: 8px;
    }
  }

  .bottom {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-weight: 500;
    margin-top: 24px;

    .title {
      font-weight: 700;
      font-size: 18px;
    }

    .pride {
      max-width: 200px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .check {
    position: absolute;
    right: 20px;
    bottom: 20px;
  }
}
</style>
