<template>
  <article class="HowToInformation">
    <div class="info">
      <img src="~/assets/img/clipboard.svg" />
      <div class="title">우리 주변의 착한 소비</div>
      <div class="subtitle">주변가게들의 가격과 위치를 제공해요. 모두의 착한 소비를 위해서</div>
    </div>
    <div class="info">
      <img src="~/assets/img/clipboard.svg" />
      <div class="title">ETC</div>
      <div class="subtitle">ETC INFO</div>
    </div>
    <div class="info">
      <img src="~/assets/img/clipboard.svg" />
      <div class="title">ETC</div>
      <div class="subtitle">ETC INFO</div>
    </div>
  </article>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.HowToInformation {
  width: 100%;
  margin-top: 64px;
  max-width: 1456px;
  height: 372px;
  background: #f7f7f7;
  box-shadow: 2px 3px 16px 1px rgba(221, 221, 221, 0.08), 2px 3px 6px 3px rgba(230, 230, 230, 0.16);
  border-radius: 24px;

  .info {
    margin-top: 48px;
    margin-left: 24px;
    max-width: 1408px;
    height: 65px;
    position: relative;
    text-align: start;

    @media (max-width: 768px) {
      padding-right: 24px;
    }

    img {
      position: absolute;
      top: 0;
      left: 0;
    }

    .title,
    .subtitle {
      margin-left: 44px;
    }

    .title {
      color: #343e4c;
      font-weight: 600;
      font-size: 18px;
      line-height: 140%;
    }

    .subtitle {
      margin-top: 16px;
      color: #8c95a1;
      line-height: 150%;
    }
  }
}
</style>
