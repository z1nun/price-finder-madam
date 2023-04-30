<template>
  <section class="NaverMap">
    <NaverMap 
      id="map" 
      :mapOptions="mapOptions"
      :initLayers="initLayers"
      @onLoad="onLoadMap"
    >
      <NaverMarker 
        v-if="visibleMarker"
        class="marker"        
        v-bind="currentPosition"
        @onLoad="onLoadMarker"
        @click="isMarkerOpen = !isMarkerOpen"        
      >        
        <div id="innerMarker">
          <div class="icon"></div>
          <span> 마커 1 </span>
        </div>
      </NaverMarker>
      <NaverInfoWindow
        v-show="visibleInfo"
        id="windowInfo"
        :marker="marker"
        :open="isMarkerOpen"
        @onLoaded="onLoadedInfoWindow($event)"
        :options="infoWindowOptions"
      >
        <div ref="infoRef" class="windowInfo">
          인포
        </div>
      </NaverInfoWindow>
    </NaverMap>  
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, onUpdated } from 'vue';
import { NaverInfoWindow, NaverMap, NaverMarker } from 'vue3-naver-maps';
import useMapOptions from '~/utils/map'

type Map = naver.maps.Map
type Marker = naver.maps.Marker
type MapOptions = naver.maps.MapOptions
type InfoWindowOptions = naver.maps.InfoWindowOptions
type InfoWindow = naver.maps.InfoWindow

const { 
  DEFAULT_ZOOM_OPTIONS,
  DEFAULT_WINDOWINFO_OPTIONS,
  currentPosition,
  loadLocation
} = useMapOptions()



// Map
const mapRef = ref<Map>()
const initLayers = ['']
const visibleMarker = ref<boolean>(false)

const mapOptions = computed<MapOptions>(() => ({
  ...DEFAULT_ZOOM_OPTIONS,
  ...currentPosition,    
}))

const onLoadMap = (map: Map) => {
  const latLng = new window.naver.maps.LatLng(currentPosition.latitude, currentPosition.longitude)
  visibleMarker.value = true
  map.setCenter(latLng)  
  mapRef.value = map
}



// Marker 
const marker = ref<Marker>()
const isMarkerOpen = ref<boolean>(false)

const onLoadMarker = (markerObject: Marker) => marker.value = markerObject   



// WindowInfo
const infoWindow = ref<InfoWindow>()
const infoRef = ref<HTMLElement | null>(null)
const visibleInfo = ref<boolean>(false)

const infoWindowOptions = computed<InfoWindowOptions>(() => ({
  ...DEFAULT_WINDOWINFO_OPTIONS,
  position: {
    lat: currentPosition.latitude,
    lng: currentPosition.longitude
  },
  content: infoRef.value ?? ''
}))

const onLoadedInfoWindow = (windowInfoObject: InfoWindow) => {
  infoWindow.value = windowInfoObject  
}


onMounted(() => loadLocation())

onUpdated(() => Object.values(currentPosition).includes(0) && loadLocation())

</script>

<style scoped lang="scss">
.NaverMap {
  display: flex;
  justify-content: center;
  align-items: center;  
}

#map {
  width: calc(1920px - 360px);
  height: 937px;  

  &:focus {
    border: none !important;  
    outline: none !important;
  }
}

#innerMarker {
  transition: all .1s ease-in-out;
  background-color: rgba(233, 150, 122, 0.4);
  padding: .25rem .5rem .25rem .5rem;
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
    margin-right: .5rem;
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

</style>