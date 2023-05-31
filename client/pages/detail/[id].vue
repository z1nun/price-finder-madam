<template>
  <section>
    <div @touchmove="handleUpSensorMove" class="up_sensor" ref="up_sensor"></div>
    <div
      @touchstart="handleBottomSheetStart"
      @touchmove="handleBottomSheetMove"
      id="bottomSheet"
      class="bottom_sheet"
      ref="bottom_sheet"
    >
      <div @touchstart="handleWrapStart" @touchmove="handleWrapMove" class="bottom_sheet_handle_wrap" ref="handle_wrap">
        <div class="bottom_sheet_handle"></div>
      </div>
      <DetailLayout />
    </div>
    <MapLayout />
  </section>
</template>

<script setup lang="ts">
import DetailLayout from '/layouts/detail/DetailLayout.vue'
import MapLayout from '/layouts/detail/MapLayout.vue'
import { ref, onMounted } from 'vue'

const handle_wrap = ref<HTMLElement | null>(null)
const bottom_sheet = ref<HTMLElement | null>(null)
const up_sensor = ref<HTMLElement | null>(null)
let bottom_touch_start = ref(0)
let bottom_scroll_start: any

const handleUpSensorMove = (e: TouchEvent) => {
  bottom_sheet.value!.style.height = '70%'
  up_sensor.value!.style.height = '70%'
  setTimeout(() => {
    up_sensor.value!.style.display = 'none'
  }, 1000)
}

const handleBottomSheetStart = (e: TouchEvent) => {
  bottom_touch_start.value = e.touches[0].clientY
  bottom_scroll_start = bottom_sheet.value!.scrollTop
}

const handleBottomSheetMove = (e: TouchEvent) => {
  if (bottom_touch_start.value - e.touches[0].clientY > 0 && bottom_scroll_start <= 0) {
    bottom_sheet.value!.style.height = '80%'
    up_sensor.value!.style.display = 'block'
    up_sensor.value!.style.height = '10%'
  } else if (bottom_touch_start.value - e.touches[0].clientY < 0) {
    bottom_sheet.value!.style.height = '5%'
    up_sensor.value!.style.display = 'none'
  }
}

const handleWrapStart = (e: TouchEvent) => {
  bottom_touch_start.value = e.touches[0].clientY
}

const handleWrapMove = (e: TouchEvent) => {
  if (bottom_touch_start.value - e.touches[0].clientY < 0) {
    bottom_sheet.value!.style.height = '10%'
    up_sensor.value!.style.display = 'block'
    up_sensor.value!.style.height = '10%'
  }
}

onMounted(() => {
  up_sensor.value?.addEventListener('touchmove', handleUpSensorMove)
  bottom_sheet.value?.addEventListener('touchstart', handleBottomSheetStart)
  bottom_sheet.value?.addEventListener('touchmove', handleBottomSheetMove)
  handle_wrap.value?.addEventListener('touchstart', handleWrapStart)
  handle_wrap.value?.addEventListener('touchmove', handleWrapMove)
})
</script>

<style scoped lang="scss">
section {
  display: flex;
  position: relative;

  @media (max-width: 768px) {
    display: block;
  }
}

.bottom_sheet {
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 5%;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background-color: #ffffff;
  overflow-y: auto;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  transition-duration: 1s;
  @media (min-width: 768px) {
    position: static;
    width: 360px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
}

.bottom_sheet_handle_wrap {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 80%;
  margin-bottom: 10px;
  position: fixed;
  z-index: 4;
  @media (min-width: 768px) {
    display: none;
  }
}

.bottom_sheet_handle {
  width: 20%;
  height: 7px;
  background-color: #7c7979;
  border-radius: 30px;
  margin-top: 10px;
  z-index: 4;
}

.bottom_box {
  width: 80%;
  height: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 5px;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
}

.up_sensor {
  z-index: 1;
  position: absolute;
  background: transparent;
  width: inherit;
  height: 100%;
  bottom: 0;
  height: 10%;
  transition-duration: 1s;
}
</style>
