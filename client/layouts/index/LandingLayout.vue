<template>
  <nav>
    <div class="Container">
      <div class="TextWrap">
        <h1>우리모두의<br>착한 소비를 위하여</h1>
        <p>우리모두의 합리적인 소비를 위한 가게정보를<br> 공공데이터를 이용해서 제공해 드립니다</p>
        <SearchButton/>
      </div>
      <div class="ImageWrap">
        <img src="~/assets/img/good_consumption.png" alt="sample">
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import SearchButton from "~/components/SearchButton.vue"
</script>

<style scoped lang="scss">
nav {
  padding: 48px 20px;
  background-color : #F5F7FF;
  @media (min-width : 768px) {
    padding: 80px 20px;
  }
  @media (min-width : 1024px) {
    padding: 120px 20px;
  }
}

.Container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin : 0 auto;
  gap: 40px;
  height: 534px;

  @media (min-width : 1024px) {
    flex-direction: row;
    align-items: start;
    padding: 0 20px;
    gap : 80px;
    width: 984px;
    height: 480px;
  }
  @media (min-width : 1440px) {
    width : 1120px;
  }
  @media (min-width : 1640px) {
    width : 1496px;
  }
}

.TextWrap {
  flex : 1;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  gap: 20px;

  h1  {
      height: 78px;
      font-size : 1.75rem;
      line-height: 140%;
      margin: 0;
      @media (min-width : 1024px){
        height: 100px;
        font-size: 2.25rem;
      }
    }  

  P {
      height: 48px;
      font-size: 1rem;
      color: #8C95A1;
      line-height: 150%;
      margin: 0;
      @media (min-width : 1024px){
        height: 50px;
        font-size: 1.125rem;
      }
    }

  @media (min-width : 1024px) {
    text-align: start;
  }
}
.ImageWrap {
    height: 280px;
    width: 320px;
    left: 0px;
    top: 254px;
    border-radius: 0px;
    @media (min-width : 768px){
      height: 280px;
      width: 728px;
      left: 0px;
      top: 254px;
      border-radius: 0px;
    }
    @media (min-width : 1024px) {
      height: 480px;
      width: 504px;
      left: 460px;
      top: 0px;
      border-radius: 0px;
    }
    @media (min-width : 1440px) {
      height: 480px;
      width: 640px;
      left: 460px;
      top: 0px;
      border-radius: 0px;
    }
    @media (min-width : 1640px) {
      height: 480px;
      width: 1016px;
      left: 460px;
      top: 0px;
      border-radius: 0px;
    }
    img {
      width: inherit;
      height: inherit;
      //1640px 768px에서 이미지의 좌우 여백이 존재함, 이미지 비율을 조금더 자연스럽게 보이게 하기 위해 너비 임의 조정
      @media (min-width : 768px) {
        width: 528px;
      }
      @media (min-width : 1640px) {
        width: 816px;
      }
    }
}
</style>