<template>
  <article class="RecommendCard">
    <div class="top">
      <div class="IconBox">
        <img src="~/assets/img/defaultIcon.svg" />
      </div>
      <div class="PriceBox">금액</div>
    </div>

    <div class="bottom">
      <div class="title">착한 가격의 가게</div>
      <div class="address">
        {{ recommendCard.address }}
      </div>
    </div>

    <div class="check">
      <img src="~/assets/img/check.svg" />
    </div>
  </article>
</template>

<script setup lang="ts">
import { IRecommendCard } from '~/components/index/search/RecommendCards.vue'

interface RecommendCardProp {
  recommendCard: IRecommendCard
}

const { recommendCard } = defineProps<RecommendCardProp>()
</script>

<style lang="scss">
.RecommendCard {
  font-family: 'Pretendard';
  height: 200px;
  width: 328px;
  position: relative;

  background: #ffffff;
  border-radius: 16px;
  box-shadow: 2px 3px 16px 1px rgba(221, 221, 221, 0.08), 2px 3px 6px 3px rgba(230, 230, 230, 0.16);

  transition: all 0.3s;
  cursor: pointer;

  .top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin: 20px;

    .IconBox {
      width: 80px;
      height: 80px;
      border-radius: 16px;
      display: flex;
      background-color: #f7f7f7;
      justify-content: center;
      align-items: center;
    }

    .PriceBox {
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
    margin-top: 24px;
    padding-left: 20px;
    padding-right: 20px;

    .title {
      font-weight: 700;
      font-size: 18px;
    }

    .address {
      margin-top: 8px;
      font-weight: 500;
    }
  }

  .check {
    position: absolute;
    right: 20px;
    bottom: 20px;
  }
}
</style>
