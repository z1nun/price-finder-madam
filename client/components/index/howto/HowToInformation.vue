<template>
  <article class="HowToInformation">
    <div class="info">
      <img src="~/assets/img/clipboard.svg" />
      <div class="title">우리 주변의 착한 소비</div>
      <div class="subtitle">주변가게들의 가격과 위치를 제공해요. 모두의 착한 소비를 위해서</div>
    </div>
    <div class="info">
      <img src="~/assets/img/clipboard.svg" />
      <div class="title">어떻게 만들어졌나요</div>
      <div class="subtitle">신뢰있는 서울시 공공 데이터를 활용하여 만들어졌어요</div>
    </div>
    <div class="info">
      <img src="~/assets/img/clipboard.svg" />
      <div class="title">가격찾아줌마를 통한 소비생활</div>
      <div class="subtitle">주변 착한가게들의 위치 정보를 통해 합리적이고 알뜰한 소비생활을 느껴보세요</div>
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
