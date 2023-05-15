<template>
  <section class="NaverMap">
    <NaverMap
      id="map"
      v-if="!currentPosition.loading"
      :mapOptions="mapOptions"
      :initLayers="initLayers"
      @onLoad="onLoadMap"      
    >
      <NaverMarker
        class="marker"
        v-if="visibleMarker"
        v-bind="currentPosition.data"
        @onLoad="onLoadMarker"
        @click="isMarkerOpen = !isMarkerOpen"
      />

      <NaverInfoWindow
        v-show="visibleInfo"
        id="windowInfo"
        :marker="marker"
        :open="isMarkerOpen"
        @onLoaded="onLoadedInfoWindow($event)"
        :options="infoWindowOptions"
      >
        <div ref="infoRef" class="windowInfo">인포</div>
      </NaverInfoWindow>
    </NaverMap>

    <template v-if="!currentPosition.loading">
      <CustomZoom @zoom="zoom" />
  
      <div class="search-current">
        <button @click="searchCurrent" class="primary-button">
          <span><img src="~/assets/img/detail/location.svg" /></span>
          <span class="text">현위치에서 찾기</span>    
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
import useStore from '~/store'

const { DEFAULT_ZOOM_OPTIONS, DEFAULT_WINDOWINFO_OPTIONS } = useMapOptions()

const {
  asyncStates: { currentPosition },
  loadLocation,
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
  console.log(mapObject)
  map.value = mapObject
}


const searchCurrent = (): void => {
  const bounds = map.value?.getBounds()
  if (!bounds) return
  
  const ne = bounds.getMax() as BoundLatLng
  const sw = bounds.getMin() as BoundLatLng
  
  console.log('NE: ', ne._lat, ne._lng)
  console.log('SW: ', sw._lat, sw._lng)
  
}



// Marker
const marker = ref<Marker>()
const isMarkerOpen = ref<boolean>(false)

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

onMounted(() => loadLocation())
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

#innerMarker {
  transition: all 0.1s ease-in-out;
  background-color: rgba(233, 150, 122, 0.4);
  padding: 0.25rem 0.5rem 0.25rem 0.5rem;
  border-radius: 5px;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  box-sizing: content-box;
  display: flex;
  align-items: center;
  transform: translateX(-80px);

  .icon {
    background-color: white;
    padding: 5px;
    width: 10px;
    height: 10px;
    border-radius: 10px;
    margin-right: 0.5rem;
  }

  &:hover {
    outline: 1px solid black;
  }
}

.windowInfo {
  width: 400px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
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
