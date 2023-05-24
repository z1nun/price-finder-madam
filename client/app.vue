<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useStore } from './store';
import { LatLng } from './types/baseTypes';

const { loadLocation, loadHome } = useStore()

onMounted(() => {  
  loadLocation()
    .then((result: LatLng) => {    
      // 로컬에서는 안산이 아니라서... 일단 서울 시청을 중심으로 요청
      loadHome({
        latitude: 37.33,
        longitude: 126.58
      })
    })
})
</script>


<style lang="scss">
body {
  margin: 0px;
  padding: 0px;
  font-size: 14px;
  font-family: 'Pretendard';
}

button.primary-button  {
  font-family: 'Pretendard';
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 24px;
  gap: 8px;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  border: none;
  color: white;

  width: 320px;
  height: 48px;

  background: #3366FF;
  border-radius: 48px;

  cursor: pointer;

  &:hover {
    opacity: .9;
  }
}
</style>