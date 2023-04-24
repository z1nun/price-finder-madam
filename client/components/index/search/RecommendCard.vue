<template>
  <article class="RecommendCard">
    <div class="top">
      <div class="IconBox">
        <img src="~/assets/img/defaultIcon.png" />
      </div>
      <div class="PriceBox">
        금액
      </div>
    </div>

    <div class="bottom">
      <div class="title">
        착한 가격의 가게
      </div>
      <div class="address">
        {{ recommendCard.address }}
      </div>        
    </div>

  </article>
</template>

<script setup lang="ts">
import { IRecommendCard } from './RecommendCards.vue';

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
  height: 200px;  

  background: #FFFFFF;
  border-radius: 16px;

  .top {
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin: 20px;

    .IconBox {
      width: 80px;
      height: 80px;
      border-radius: 16px;
      display: flex;
      background-color: #F7F7F7;
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
      background-color: #F7F7F7;
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
}
</style>