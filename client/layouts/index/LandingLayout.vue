<template>
  <nav>
    <div class="Container">
      <div class="TextWrap">
        <h1>우리모두의<br>착한 소비를 위하여</h1>
        <p>우리모두의 합리적인 소비를 위한 가게정보를<br> 공공데이터를 이용해서 제공해 드립니다</p>
        <SearchButton/>
      </div>
      <div class="ImageWrap">
        <img src="~/assets/img/sampleimg.png" alt="sample">
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
  height: 630px;
  background-color : #F5F7FF;

  @media (min-width : 768px) {
    padding: 80px 20px;
    height: 694px;
  }
  @media (min-width : 1024px) {
    padding: 120px 20px;
    height: 720px;
  }
}

.Container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin : 0 auto;
  gap: 40px;

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
  flex : 1;
}
</style>