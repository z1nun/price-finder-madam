<template>
  <article class="SearchBar">
    <input 
      v-model="searchText"
      :placeholder="placeholder" 
      type="text" 
      @keyup.enter="onSearchBarEnter"
      id="searchBar"
      autocomplete="off"
    />
  </article>
</template>

<script setup lang="ts">
import { useStore } from '~/store'
const { loadStoreSearch } = useStore()
const { push } = useRouter()

interface SearchBarProps {
  placeholder?: string
  dong?: string
}

const props = withDefaults(defineProps<SearchBarProps>(), {
  placeholder: 'EX) 합리적인 가격의 매장',
  dong: '삼성동'
})

const searchText = ref<string>('')

const onSearchBarEnter = () => {
  console.log({
    page: 0,
    storeName: searchText.value,
    address: props.dong
  })
  loadStoreSearch({
    page: 0,
    storeName: searchText.value,
    address: props.dong
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
  height: 64px;

  input {    
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

  &.detail {
    width: 100%;
    max-width: 100%;
    position: absolute;
    max-width: 960px;  
    min-width: 320px;
    width: 90%;
    inset: 0;
    margin: 20px auto;

    input {        
      margin: 0px;
      border: 1px solid #3366FF;
      border-radius: 8px;  
      height: 48px;      
      font-size: 14px;      
    }
  }
}
</style>
