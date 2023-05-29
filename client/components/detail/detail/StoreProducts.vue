<template>
  <article>
    <div>
      <h3>상품종류</h3>
      <span>전체<img src="~/assets/img/detail/arrowRight.svg" /></span>
    </div>
    <StoreProduct
      v-for="(product, index) in storeDetail?.data.products"
      :productName="product.productName"
      :price="product.price"
      :key="index"
    />
  </article>
</template>

<script setup lang="ts">
import StoreProduct from '~/components/detail/detail/StoreProduct.vue'
import { useStore } from '~/store'
const {
  asyncStates: { storeDetail },
} = useStore()
</script>

<style lang="scss" scoped>
article {
  width: 320px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px 20px;
  gap: 24px;
  background: #ffffff;
  box-shadow: 2px 3px 16px 1px rgba(221, 221, 221, 0.08), 2px 3px 6px 3px rgba(230, 230, 230, 0.16);

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      height: fit-content;
      display: flex;
      align-items: flex-start;
      gap: 4px;
      color: #343e4c;
      font-weight: 600;
      font-size: 1rem;
      line-height: 150%;
      margin: 0;
    }

    span {
      display: flex;
      align-items: center;
      gap: 4px;
      font-weight: 500;

      img {
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>
