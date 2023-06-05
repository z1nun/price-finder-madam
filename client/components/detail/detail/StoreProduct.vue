<template>
  <div class="container">
    <div class="imgWrap">
      <template v-if="Number(storeType) < 4">
        <img src="~/assets/img/detail/product.svg" />
      </template>
      <template v-if="Number(storeType) > 3">
        <img src="~/assets/img/detail/HandMoney.svg" />
      </template>
    </div>
    <div>
      <span> {{ productName }} </span>
      <span class="price">{{ price.toLocaleString() }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface StoreProductProp {
  productName: string
  price: number
  storeType: string | number
}

const { productName, price, storeType } = defineProps<StoreProductProp>()
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  gap: 16px;

  @media (min-width: 768px) {
    width: 320px;
  }
  .imgWrap {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
    background-color: #f9fafb;
    border-radius: 50%;
    img {
      width: 32px;
      height: 32px;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 150%;
    color: #343e4c;

    .price {
      font-weight: 600;
      font-size: 1rem;
    }
  }
}
</style>
