<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useStore } from './store'
import { LatLng } from './types/baseTypes'

const {
  loadLocation,
  loadHome,
  loadNeighborhoodsStore,
  asyncStates: { currentDoro, storeCards },
} = useStore()

onMounted(async () => {
  loadLocation().then((result: LatLng) => {
    console.log(result)
    // 로컬에서는 안산이 아니라서... 일단 서울 시청을 중심으로 요청
    loadHome({
      latitude: 37.566295,
      longitude: 126.977945,
    })

    if (storeCards.data.length === 0)
      loadNeighborhoodsStore({
        address: currentDoro.data.address,
        page: 0,
        userPlace: {
          latitude: 37.566295,
          longitude: 126.977945,
        },
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

button.primary-button {
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

  background: #3366ff;
  border-radius: 48px;

  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
}
</style>
