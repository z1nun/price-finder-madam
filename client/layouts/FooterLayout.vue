<template>
  <footer>
    <div class="Container">
      <div class="LogoImg">LOGO</div>
      <div class="InfoWrap">
        <div class="Info">
          <span>TEAM NAME : 착한소비</span>
          <span>info</span>
          <span>cs</span>
          <span>개인정보</span>
        </div>
        <span>Title email : text </span>
        <span>other info </span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
footer {
  background-color: #f5f7ff;
}
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
}
.LogoImg {
  width: 67px;
  height: 36px;
  font-size: 24px;
  font-weight: 700;
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
