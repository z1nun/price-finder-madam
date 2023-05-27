<template>
  <article class="SearchBar">
    <input 
      v-model="searchText" 
      placeholder="EX) 합리적인 가격의 매장" 
      type="text" 
      @keyup.enter="onEnter" 
      id="searchBar"
    />
  </article>
</template>

<script setup lang="ts">
import { useStore } from '~/store'


const { loadStoreSearch } = useStore()
const { push } = useRouter()

const searchText = ref<string>('')

// 동을 받아오는 api가 아직 없으니, 하드코딩
const dong = '삼성동'

const onEnter = () => {      
  loadStoreSearch({
    page: 0,
    storeName: searchText.value,
    address: dong
  })
  searchText.value = ''
  push('/search')  
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
    border-radius: 8px;
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
    max-width: 320px;    
  }

  @media (max-width: 1440px) {
    max-width: 1080px;
  }

  @media (max-width: 1024px) {
    max-width: 944px;
  }
}
</style>
