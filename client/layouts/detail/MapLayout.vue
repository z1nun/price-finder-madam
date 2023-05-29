<template>
  <section class="NaverMap">
    <NaverMap
      id="map"
      v-if="!currentPosition.loading"
      :mapOptions="mapOptions"      
      @onLoad="onLoadMap"      
    >
      <!-- 중심 마커 -->
      <NaverMarker        
        v-if="visibleMarker"
        v-bind="currentPosition.data"        
        :htmlIcon="HTMLICON"        
      >
        <div>  
          <img src="~/assets/img/detail/center.svg" class="center-marker"/>
        </div>      
      </NaverMarker>

      <!-- 가게 마커 -->
      <template v-if="markerDatas.length > 0 && !storeCards.loading">
        <NaverMarker 
          v-for="(marker, i) in markerDatas"
          :key="i"
          v-bind="marker.position"
          :htmlIcon="marker.htmlIcon"
        >
          <button class="card-marker">            
            <img src="~/assets/img/detail/place.svg" class="innerIcon" />
            <div class="title">
              {{ marker.storeName }}    
            </div>
            <!-- <div class="subtitle">
              {{ marker.storeType }}        
            </div> -->
          </button>
        </NaverMarker>
      </template>
    </NaverMap>

    <template v-if="!currentPosition.loading">
      <CustomZoom @zoom="zoom" />
      <CenterButton @focus-center="focusCenter"/>
  
      <button @click="searchCurrent" class="primary-button search-current">
        <span><img src="~/assets/img/detail/location.svg" /></span>
        <span class="text">현 위치에서 찾기</span>              
      </button>
    </template>

  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { MapOptions, NaverMap, NaverMarker } from 'vue3-naver-maps'
import useMapOptions, { ZoomType, Map } from '~/utils/map'
import CustomZoom from '~/components/detail/map/CustomZoom.vue'
import CenterButton from '~/components/detail/map/CenterButton.vue'
import { useStore } from '~/store'
import { LatLng, StoreCard, storeTypeMap } from '~/types/baseTypes'

const { 
  DEFAULT_ZOOM_OPTIONS, 
  DEFAULT_ZOOM_LEVEL 
} = useMapOptions()

const {
  asyncStates: { currentPosition, storeCards },
  loadCurrentPlaceStore
} = useStore()

type BoundLatLng = {
  _lat: number
  _lng: number
  x: number
  y: number
} & naver.maps.Point


// 맵
const map = ref<Map | null>()
const centerLatLng = ref<naver.maps.LatLng>()
const mapOptions = computed<MapOptions>(() => ({
  ...DEFAULT_ZOOM_OPTIONS,
  ...currentPosition.data,
}))

const onLoadMap = (mapObject: Map) => {
  const center = storeCards.data.length > 0 
    ? createCenter(storeCards.data)
    : new window.naver.maps.LatLng(currentPosition.data.latitude, currentPosition.data.longitude)
  
  centerLatLng.value = center
  visibleMarker.value = true
  mapObject.setCenter(center)
  map.value = mapObject
}

// 현 위치에서 찾기 버튼 
const searchCurrent = () => {
  const bounds = map.value?.getBounds()
  if (!bounds) return
  
  const ne = bounds.getMax() as BoundLatLng
  const sw = bounds.getMin() as BoundLatLng

  const body = {
    leftUpPlace: {
      latitude: ne._lat,
      longitude: ne._lng
    },
    rightDownPlace: {
      latitude: sw._lat,
      longitude: sw._lng
    },
    userPlace: {
      latitude: currentPosition.data.latitude,
      longitude: currentPosition.data.longitude
    },
    storeName: null,
    storeType: null,
    page: 0
  }

  // 카테고리 - 한식 눌렀을때 검색어에 한식이 올라간 상태에서

  // 둘다 null 이거나 한쪽만 null 이여야한다.
  // 찾기 버튼을 눌럿다. -> storeType이 한식에 맞는 number 채워지고, storename은 null
  // 반대로 돈까스 검색했으면 storeType null, storeaName이 돈까스
  loadCurrentPlaceStore(body)
}


// 마커
type MarkerData = {
  htmlIcon: any, 
  position: LatLng
} & StoreCard

const visibleMarker = ref<boolean>(false)
const selectedMarker = ref<HTMLButtonElement | null>(null)
const HTMLICON = {
  size: {
    width: 0,
    height: 0
  },
  anchor: [40, 40]
}

// 마커 객체
const markerDatas = computed<MarkerData[]>(() => {
  return storeCards.data.map((card: StoreCard) => ({ 
      htmlIcon: HTMLICON, 
      position: {
        latitude: card.place.latitude,
        longitude: card.place.longitude
      },
      ...card,
      storeType: storeTypeMap[card.storeType as number]
    }))
})

// 마커 객체가 변할때마다 줌을 재설정 해줌 
watch(markerDatas, (markers: MarkerData[]) => {
  const newCenter = createCenter(markers)

  map.value?.setCenter(newCenter)
  map.value?.setZoom(DEFAULT_ZOOM_LEVEL + 3)
})

const createCenter = (markers: (MarkerData | StoreCard)[]): naver.maps.LatLng => {
  const markerLength = markers.length

  const { totalLat, totalLng } = markers.reduce((acc, cur) => ({
      totalLat: acc.totalLat + cur.place.latitude,
      totalLng: acc.totalLng + cur.place.longitude
    }), {
    totalLat: 0,
    totalLng: 0
  })
  
  const newCenter = new window.naver.maps.LatLng(
    totalLat / markerLength,
    totalLng / markerLength
  )

  return newCenter
}


// 줌
const zoom = (e: ZoomType) => {
  const target = map.value
  if (!target) return
  target?.setZoom(target.getZoom() + (e === 'in' ? 1 : -1), true)
}


// 지도를 초기 상태로 되돌립니다.
const focusCenter = () => {
  const center = new window.naver.maps.LatLng(currentPosition.data.latitude, currentPosition.data.longitude)
  map.value?.setCenter(center)
  map.value?.setZoom(DEFAULT_ZOOM_LEVEL)
}



</script>

<style scoped lang="scss">
.NaverMap {  
  position: relative;
}

#map {
  width: calc(100vw - 360px);
  height: 100vh;

  &:focus {
    border: none !important;
    outline: none !important;
  }
}

img[alt='지도 확대'] {
  display: none !important;
}

.center-marker {
  width: 60px;
  height: 60px;
}

.center-info {
  position: absolute;  
  text-align: center;  
  width: 100px;
  border-radius: 10px;
  left: 25px;  
  box-sizing: border-box;
  padding: .5rem 1rem;
  background-color: #f9fafb;    
  z-index: 1;
}


.search-current {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);   

  img {
    margin-top: 5px;
  }
}



// 가게 마커
.card-marker {
  font-family: 'Pretendard';  
  border-radius: 23px;    
  font-size: 16px;
  white-space: nowrap;
  height: 40px;  
  max-height: 40px;
  padding-left: 40px;
  padding-right: 10px;
  cursor: pointer;
  background-color: white;
  border: none;
  color: white;
  position: relative;

  .innerIcon {
    height: 30px;
    width: 30px;
    border-radius: 20px;
    position: absolute;
    background-color: $blue-lighten-2;
    top: 50%;
    left: 20px;
    transform: translate(-50%, -50%);
  }

  &.active {
    background-color: $blue-lighten-2;
    color: white;

    .innerIcon {

    }

  }


  &::after {
    content: '';
    width: 0px; 
    height: 0px;
    border-bottom: 10px solid transparent;
    border-top: 10px solid $primary;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    position: absolute;    
    bottom: -15px;
    left: 13px;
  }
}
</style>
