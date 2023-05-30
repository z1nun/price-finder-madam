<template>
  <header>
    <div class="nav">
      <img src="~/assets/img/LOGO.svg" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { BIconList, BIconSearch } from 'bootstrap-icons-vue'
</script>

<style scoped lang="scss">
template {
  @media (min-width: 768px) {
    width: 728px;
  }
  @media (min-width: 1024px) {
    width: 984px;
  }
  @media (min-width: 1440px) {
    width: 1080px;
  }
  @media (min-width: 1640px) {
    width: 1496px;
  }
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 8px 20px;
  margin: 0 auto;
  gap: 24px;
  @media (min-width: 1440px) {
    width: 1080px;
  }
}
.nav {
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  gap: 24px;
  span {
    display: none;
    @media (min-width: 768px) {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 80px;
      height: 24px;
      font-size: 1rem;
    }
  }
}

.listIcon {
  width: 24px;
  height: 24px;
  font-size: 1.5rem;
  @media (min-width: 768px) {
    display: none;
  }
}

.userWrap {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
}

.searchIcon {
  display: none;
  @media (min-width: 768px) {
    display: block;
    width: 24px;
    height: 24px;
    font-size: 1.5rem;
    border-radius: 0px;
  }
}

.user {
  display: none;
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 136px;
    height: 44px;
    padding: 0px 8px;

    span {
      font-style: normal;
      font-weight: 600;
      font-size: 1rem;
      line-height: 150%;
      color: #3366ff;
    }

    .signup {
      width: 56px;
      height: 24px;
      color: #2441b7;
    }
  }
}
</style>
