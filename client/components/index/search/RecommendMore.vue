<template>
  <article class="RecommendCard">
    <div class="title">주변의 착한 소비 보러가기</div>
    <div class="IconBox">
      <img src="~/assets/img/arrow.svg" />
    </div>
  </article>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.RecommendCard {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    height: 28px;
    margin-top: 38px;
    font-weight: bold;
    font-size: 20px;
    line-height: 140%;
  }

  .IconBox {
    margin-top: 16px;
    width: 80px;
    height: 80px;
    position: relative;

    img {
      position: absolute;
      left: 13.54%;
      right: 13.54%;
      top: 21.88%;
      bottom: 21.88%;
    }
  }
}
</style>
