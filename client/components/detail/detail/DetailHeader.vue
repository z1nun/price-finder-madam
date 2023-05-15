<template>
  <header>
    <div class="ImgWrap">
      <div><img src="~/assets/img/arrowLeft.svg" /></div>
      <img src="~/assets/img/sampleImg.svg" />
      <span>1 / 3</span>
    </div>
    <div class="TitleWrap">
      해피분식
      <hr />
      <div><img src="~/assets/img/defaultIcon.svg" />개인 매장</div>
    </div>
  </header>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
header {
  height: 250px;
}
.ImgWrap {
  width: 360px;
  height: 180px;
  background: linear-gradient(360deg, rgba(51, 51, 51, 8e-5) 58.22%, rgba(18, 18, 18, 0.8) 100%), url(.jpg);
  box-shadow: 2px 3px 16px 1px rgba(221, 221, 221, 0.08), 2px 3px 6px 3px rgba(230, 230, 230, 0.16);
  border-radius: 0px 0px 16px 16px;

  div {
    img {
      cursor: pointer;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 12px 8px 12px 24px;
      gap: 8px;

      position: absolute;
      width: 24px;
      height: 24px;
      left: 0px;
      top: 0px;
      bottom: 0px;
    }
  }

  span {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 2px 8px;
    gap: 2px;
    color: #c7c7c7;

    position: absolute;
    width: 39px;
    height: 22px;
    left: 300px;
    top: 101px;

    background: rgba(18, 18, 18, 0.6);
    border-radius: 40px;
  }
}

.TitleWrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 20px;
  gap: 2px;

  position: absolute;
  width: 280px;
  height: fit-content;
  left: 20px;
  top: 134px;

  background: #ffffff;
  box-shadow: 1px 2px 8px rgba(51, 51, 51, 0.16), 2px 3px 16px 1px rgba(221, 221, 221, 0.08),
    2px 3px 6px 3px rgba(230, 230, 230, 0.16);
  border-radius: 16px;
  font-size: 1.25rem;
  font-weight: 700;

  hr {
    width: 280px;
    border: 1px solid #c7c7c7;
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    font-size: 1rem;
    font-weight: 400;
    img {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
