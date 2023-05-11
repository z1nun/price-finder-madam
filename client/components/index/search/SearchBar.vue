<template>
  <article class="SearchBar">
    <input v-model="search" placeholder="EX) 합리적인 가격의 매장" type="text" @keyup.enter="onEnter" id="searchBar"/>
  </article>
</template>

<script setup lang="ts">
const search = ref<string>()

const onEnter = () => {
  search.value = ''
}
</script>

<style scoped lang="scss">
.SearchBar {
  font-family: 'Pretendard';
  width: 100%;
  max-width: 1456px;

  input[type='text'] {
    width: 100%;
    height: 64px;

    margin-top: 40px;
    border-radius: 80px;
    outline: none;
    font-size: 20px;

    box-sizing: border-box;
    background-color: #fdfdfd;
    background-image: url('assets/img/search.svg');
    background-position: calc(100% - 21.25px);
    background-repeat: no-repeat;
    border: 1px solid #ccc;
    padding-left: 24px;

    &::-webkit-input-placeholder {
      color: #8c95a1;
      font-family: 'Pretendard';
      font-weight: 600;
      letter-spacing: -0.003em;
      line-height: 24px;
      transition: opacity 0.3s;
    }

    &:focus::-webkit-input-placeholder {
      opacity: 0;
    }
  }

  @media (max-width: 414px) {
    width: 320px;
  }
}
</style>
