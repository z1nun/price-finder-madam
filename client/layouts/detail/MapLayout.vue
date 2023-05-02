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
        v-bind="currentPosition.data"
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
    
    <CustomZoom @zoom="zoom" />
  </section> 
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { MapOptions, NaverInfoWindow, NaverMap, NaverMarker } from 'vue3-naver-maps';
import useMapOptions, { 
  InfoWindow, 
  InfoWindowOptions,
  Marker, 
  ZoomType,
  Map
} from '~/utils/map'
import CustomZoom from '~/components/detail/map/CustomZoom.vue'
import useStore from '~/store';

const { 
  DEFAULT_ZOOM_OPTIONS,
  DEFAULT_WINDOWINFO_OPTIONS,  
} = useMapOptions()

const { asyncStates: { currentPosition }, loadLocation } = useStore()


// Map
const map = ref<Map | null>()
const initLayers = ['']
const visibleMarker = ref<boolean>(false)

const mapOptions = computed<MapOptions>(() => ({
  ...DEFAULT_ZOOM_OPTIONS,
  ...currentPosition.data,
}))

const onLoadMap = (mapObject: Map) => {
  const latLng = new window.naver.maps.LatLng(
    currentPosition.data.latitude, 
    currentPosition.data.longitude
  )  

  visibleMarker.value = true
  mapObject.setCenter(latLng)
  map.value = mapObject
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
    lng: currentPosition.data.longitude
  }
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

img[alt="지도 확대"] {
  display: none !important;
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

