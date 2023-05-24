<template>
  <section class="NaverMap">
    <NaverMap
      id="map"
      v-if="!currentPosition.loading"
      :mapOptions="mapOptions"
      :initLayers="initLayers"
      @onLoad="onLoadMap"      
    >
      <!-- 중심 마커 -->
      <NaverMarker
        class="marker"
        v-if="visibleMarker"
        v-bind="currentPosition.data"
        @onLoad="onLoadMarker"
        :htmlIcon="htmlIcon"
        @click="isMarkerOpen = !isMarkerOpen"
      >
        <div ref="innerMarkerRef">  
          <img src="~/assets/img/detail/center.svg" class="center-marker"/>
        </div>      
      </NaverMarker>

      <!-- 주변 마커 -->
      <!-- <NaverMarker
        class="marker"
        v-if="visibleMarker"
        v-bind="currentPosition.data"
        @onLoad="onLoadMarker"
        @click="isMarkerOpen = !isMarkerOpen"
      /> -->

      <NaverInfoWindow
        v-show="visibleInfo"
        id="windowInfo"
        :marker="marker"
        :open="isMarkerOpen"
        @onLoaded="onLoadedInfoWindow($event)"
        :options="infoWindowOptions"
      >
        <div ref="infoRef" class="center-info">현 위치</div>
      </NaverInfoWindow>

    </NaverMap>

    <template v-if="!currentPosition.loading">
      <CustomZoom @zoom="zoom" />
  
      <div class="search-current">
        <button @click="searchCurrent" class="primary-button">
          <span><img src="~/assets/img/detail/location.svg" /></span>
          <span class="text">현 위치에서 찾기</span>              
        </button>
      </div>
    </template>

  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { MapOptions, NaverInfoWindow, NaverMap, NaverMarker } from 'vue3-naver-maps'
import useMapOptions, { InfoWindow, InfoWindowOptions, Marker, ZoomType, Map, Bounds } from '~/utils/map'
import CustomZoom from '~/components/detail/map/CustomZoom.vue'
import { useStore } from '~/store'

const { DEFAULT_ZOOM_OPTIONS, DEFAULT_WINDOWINFO_OPTIONS } = useMapOptions()

const {
  asyncStates: { currentPosition, storeCards },
  loadLocation,
  loadCurrentPlaceStore
} = useStore()

type BoundLatLng = {
  _lat: number
  _lng: number
  x: number
  y: number
} & naver.maps.Point

// Map
const map = ref<Map | null>()
const initLayers = ['']
const visibleMarker = ref<boolean>(false)

const mapOptions = computed<MapOptions>(() => ({
  ...DEFAULT_ZOOM_OPTIONS,
  ...currentPosition.data,
}))

const onLoadMap = (mapObject: Map) => {
  const latLng = new window.naver.maps.LatLng(currentPosition.data.latitude, currentPosition.data.longitude)

  visibleMarker.value = true
  mapObject.setCenter(latLng)
  map.value = mapObject
}


const searchCurrent = (): void => {
  const bounds = map.value?.getBounds()
  if (!bounds) return
  
  const ne = bounds.getMax() as BoundLatLng
  const sw = bounds.getMin() as BoundLatLng

  const body = {
    leftUpPlace: {
      latitude: ne._lng,
      longitude: ne._lat
    },
    rightDownPlace: {
      latitude: sw._lng,
      longitude: sw._lat
    },
    userPlace: {
      latitude: currentPosition.data.longitude,
      longitude: currentPosition.data.latitude
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



// Marker
const marker = ref<Marker>()
const isMarkerOpen = ref<boolean>(false)
const innerMarkerRef = ref<HTMLElement | null>(null)
const htmlIcon = computed(() => ({  
  size: {
    width: 0,
    height: 0
  },
  anchor: new naver.maps.Point(40, 40)
}))


const onLoadMarker = (markerObject: Marker) => {
  marker.value = markerObject
}

// WindowInfo
const infoWindow = ref<InfoWindow>()
const infoRef = ref<HTMLElement | null>(null)
const visibleInfo = ref<boolean>(false)

const infoWindowOptions = computed<InfoWindowOptions>(() => ({
  ...DEFAULT_WINDOWINFO_OPTIONS,
  content: infoRef.value ?? '',
  position: {
    lat: currentPosition.data.latitude,
    lng: currentPosition.data.longitude,
  },
}))

const onLoadedInfoWindow = (windowInfoObject: InfoWindow) => {
  infoWindow.value = windowInfoObject
}

// Zoom
const zoom = (e: ZoomType) => {
  const target = map.value
  if (!target) return

  target?.setZoom(target.getZoom() + (e === 'in' ? 1 : -1), true)
}

</script>

<style scoped lang="scss">
.NaverMap {  
  position: relative;
}

#map {
  width: calc(1920px - 360px);
  height: 937px;  

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
</style>
