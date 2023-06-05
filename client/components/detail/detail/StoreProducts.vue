<template>
  <article>
    <div>
      <h3>상품종류</h3>
    </div>
    <StoreProduct
      v-for="(product, index) in storeDetail?.data.products"
      :productName="product.productName"
      :price="product.price"
      :storeType="storeDetail?.data.storeType"
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
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px 20px;
  gap: 24px;
  background: #ffffff;
  box-shadow: 2px 3px 16px 1px rgba(221, 221, 221, 0.08), 2px 3px 6px 3px rgba(230, 230, 230, 0.16);

  @media (min-width: 768px) {
    width: 320px;
  }
}
</style>
