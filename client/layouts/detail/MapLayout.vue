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
        v-if="visibleMarker"
        v-bind="currentPosition.data"
        @onLoad="onLoadMarker"
        :htmlIcon="HTMLICON"
        @click="isMarkerOpen = !isMarkerOpen"
      >
        <directivesPlugin>  
          <img src="~/assets/img/detail/center.svg" class="center-marker"/>
        </directivesPlugin>      
      </NaverMarker>

      <template v-if="storeCards.data.length > 0 && !storeCards.loading">
        <NaverMarker 
          v-for="(marker, i) in markerDatas"
          :key="i"
          v-bind="marker.position"
          :htmlIcon="marker.htmlIcon"
        >
          <button class="card-marker">            
            <img src="~/assets/img/detail/place.svg" class="innerIcon" />
            {{ marker.storeName }}
          </button>
        </NaverMarker>
      </template>

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
      <CenterButton @focus-center="focusCenter"/>
  
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
import { ref, computed } from 'vue'
import { MapOptions, NaverInfoWindow, NaverMap, NaverMarker } from 'vue3-naver-maps'
import useMapOptions, { InfoWindow, InfoWindowOptions, Marker, ZoomType, Map, Bounds } from '~/utils/map'
import CustomZoom from '~/components/detail/map/CustomZoom.vue'
import CenterButton from '~/components/detail/map/CenterButton.vue'
import { useStore } from '~/store'
import { LatLng, StoreCard } from '~/types/baseTypes'

const { 
  DEFAULT_ZOOM_OPTIONS, 
  DEFAULT_WINDOWINFO_OPTIONS, 
  DEFAULT_ZOOM_LEVEL 
} = useMapOptions()

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
const centerLatLng = ref<naver.maps.LatLng>()

const mapOptions = computed<MapOptions>(() => ({
  ...DEFAULT_ZOOM_OPTIONS,
  ...currentPosition.data,
}))

const onLoadMap = (mapObject: Map) => {
  const latLng = new window.naver.maps.LatLng(currentPosition.data.latitude, currentPosition.data.longitude)
  centerLatLng.value = latLng
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



// Marker
const marker = ref<Marker>()
const isMarkerOpen = ref<boolean>(false)
const selectedMarker = ref<HTMLButtonElement | null>(null)
const HTMLICON = computed(() => ({
  size: {
    width: 0,
    height: 0
  },
  anchor: [40, 40]
}))

// const onMarkerButtonClick = (marker) => {

// }



const onLoadMarker = (markerObject: Marker) => {
  marker.value = markerObject
}

type MarkerData = {
  htmlIcon: any, 
  position: LatLng
} & StoreCard

const markerDatas = computed<MarkerData[]>(() => {
  return storeCards.data.map((card: StoreCard) => ({ 
      htmlIcon: HTMLICON.value, 
      position: {
        latitude: card.place.latitude,
        longitude: card.place.longitude
      },
      ...card
    }))
})
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

watch(markerDatas, (markers: MarkerData[]) => {
  const markerLength = markers.length

  const { lat, lng } = markers.reduce((acc, cur) => ({
      lat: acc.lat + cur.place.latitude,
      lng: acc.lng + cur.place.longitude
    }), {
    lat: 0,
    lng: 0
  })
  
  const newCenter = new window.naver.maps.LatLng(
    lat / markerLength,
    lng / markerLength
  )

  map.value?.setCenter(newCenter)
  map.value?.setZoom(DEFAULT_ZOOM_LEVEL + 3)
})


// 지도를 초기 상태로 되돌립니다.
const focusCenter = () => {
  map.value?.setCenter(centerLatLng.value!)
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
  background: $primary;
  border: none;
  color: white;
  position: relative;

  .innerIcon {
    height: 30px;
    width: 30px;
    border-radius: 20px;
    position: absolute;
    background-color: white;
    top: 50%;
    left: 20px;
    transform: translate(-50%, -50%);
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
