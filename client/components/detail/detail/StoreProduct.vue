<template>
  <div class="container">
    <img src="~/assets/img/detail/product.svg" />
    <div>
      <span>상품명</span>
      <span class="price">10,000</span>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.container {
  width: 320px;
  display: flex;
  justify-content: flex-start;
  gap: 16px;

  img {
    width: 48px;
    height: 48px;
    background-color: #f9fafb;
    border-radius: 200px;
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
