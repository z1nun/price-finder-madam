<template>
  <header>
      <nav>
        <span class="img">LOGO</span>
        <span>CATEGORY</span>
        <span>CATEGORY</span>
      </nav>
        <div class="user">
          <span>Log in</span>
          <span>sign In</span>
        </div>
  </header>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">

header {  
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 8px 20px;
  margin: 0 auto;
  gap: 24px;

  @media (min-width : 768px) {
    width: 728px;
    }
  @media (min-width : 1024px) {
    width: 984px;
  }  
  @media (min-width : 1440px) {
    width: 1080px;
  }  
  @media (min-width : 1640px) {
    width: 1496px;
  }  
}

nav {
  display: flex;
  align-items: center;
  text-align: center;
  gap: 24px;

  .img {
    width: 56px;
    height: 44px;
    font-weight: 700;

    @media (min-width : 768px) {
      width: 160px;
    }

    //나중에 삭제 (피그마처럼 보이게 하기위해 넣은부분)
    text-align: start;
    line-height: 44px;
  }
  span {
    width: 73px;
    height: 20px;

    @media (min-width : 768px) {
      width: 140px;
    }
  }
}

.user {
  display: none;

  @media (min-width : 1024px) {
    display: flex;
    text-align: center;
    gap: 24px;
    span {
      width: 140px;
    }
  } 
}



</style>