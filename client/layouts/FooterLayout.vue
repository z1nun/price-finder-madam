<template>
  <footer>
    <div class="Container">
      <img src="~/assets/img/footerLogo.svg" @click="push(`/`)" :style="{ cursor: 'pointer' }" />
      <div class="InfoWrap">
        <div class="Info">
          <span>TEAM NAME : 아지매들</span>
          <span>우리주변의 착한가게</span>
        </div>
        <span>Title email : https://data.seoul.go.kr </span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Router } from 'vue-router'
const { push } = useRouter()
</script>

<style scoped lang="scss">
footer {
  background-color: #f5f7ff;
  &.detail {
    max-height: auto;
    max-width: 360px;
    .Container {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      padding: 24px 20px;
      width: 320px;
      height: 190px;
      gap: 20px;
    }
    .InfoWrap {
      display: flex;
      gap: 16px;
    }
    .Info {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    img {
      width: 124px;
      height: 60px;
      position: relative;
      bottom: 20px;
    }
  }

  &.home {
    .Container {
      display: flex;
      padding: 48px 20px;
      margin: 0 auto;
      width: 320px;
      height: 188px;
      gap: 20px;

      @media (min-width: 768px) {
        padding: 80px 20px;
        width: 728px;
        height: 105px;
      }
      @media (min-width: 1024px) {
        width: 984px;
      }
      @media (min-width: 1440px) {
        width: 1120px;
      }
      @media (min-width: 1640px) {
        width: 1496px;
      }

      img {
        width: 124px;
        height: 80px;
        position: relative;
        bottom: 20px;
      }
    }
  }
}
.InfoWrap {
  display: flex;
  flex-direction: column;
  gap: 16px;

  span {
    color: #8c95a1;
  }
}
.Info {
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 40px;
  }
  span {
    color: #343e4c;
    font-weight: 600;
  }
}
</style>
