<template>
  <section>
    <DetailHeader />
    <StoreCard :image="verifiedCheckImage" :title="'착한가게'" :content="['한식', '착한 가격']" />
    <StoreCard
      class="store-inform"
      :image="bagSmileImage"
      :title="'매장정보'"
      :content="['영업시간 :07:30~20:00 휴무 :수', '남성역 1번 출구에서182m', '02-775-0038']"
    />
    <StoreCard class="store-location" :title="'위치정보'" :content="['서울특별시 광진구 자양번영로 13']">
      <template #detail>
        <button>자세히</button>
      </template>
    </StoreCard>
    <StoreCard class="store-product" :title="'상품종류'">
      <template #detail>
        <span>전체 <img src="~/assets/img/arrowRight.svg" /></span>
      </template>
      <template #components>
        <div v-for="el in 3" :key="el" class="item">
          <img src="~/assets/img/product.svg" />
          <div class="text">
            <span>상품명</span>
            <span class="gg">1000원</span>
          </div>
        </div>
      </template>
    </StoreCard>
  </section>
</template>

<script setup lang="ts">
import DetailHeader from '/components/detail/DetailHeader.vue'
import StoreCard from '/components/detail/StoreCard.vue'
import verifiedCheckImage from '~/assets/img/detail/VerifiedCheck.svg'
import bagSmileImage from '~/assets/img/detail/bagSmile.svg'
</script>

<style scoped lang="scss">
section {
  width: 360px;
  background-color: #f9fafb;
  display: flex;
  flex-direction: column;
  gap: 8px;

  button {
    cursor: pointer;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 4px 8px;
    width: 50px;
    height: 26px;

    border: 1px solid #8c95a1;
    border-radius: 40px;

    /* Inside auto layout */

    flex: none;
    order: 1;
    flex-grow: 0;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 0.75rem;
    line-height: 150%;
    /* identical to box height, or 18px */

    color: #343e4c;
    background-color: white;
  }

  .store-product {
    display: flex;
    gap: 24px;
    span {
      display: flex;
      align-items: center;
    }
    .item {
      display: flex;
      align-items: center;
      gap: 16px;

      width: 320px;
      height: fit-content;

      flex: none;
      order: 1;
      align-self: stretch;
      flex-grow: 0;
      img {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 8px;
        gap: 10px;

        width: 48px;
        height: 48px;

        background: #f9fafb;
        border-radius: 200px;

        /* Inside auto layout */

        flex: none;
        order: 0;
        flex-grow: 0;
      }
      .text {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: start;

        font-weight: 500;
        font-size: 14px;
        line-height: 150%;
        /* or 21px */
        .gg {
          font-size: 16px;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
