<template>
  <section class="NaverMap">
    <NaverMap
      id="map"
      v-if="!currentPosition.loading && flag"
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
          @click="onMarkerClick(marker.storeId)"
        >
          <button :class="['card-marker', (selectedMarker == marker.storeId) && 'active']">  
            <img 
              class="innerIcon" 
              :src="createMarkerIcon(marker.storeId)"
            />
            <div class="marker-text">
              <div class="title">
                {{ marker.storeName }}                    
              </div>
              <div class="subtitle">
                {{ marker.storeType }}        
              </div>
            </div>
          </button>
        </NaverMarker>
      </template>
    </NaverMap>
    <template v-if="!currentPosition.loading && flag">
      <CustomZoom @zoom="zoom" />
      <CenterButton @onCenterButtonClick="focus(
        currentPosition.data.latitude,
        currentPosition.data.longitude
      )"/>
  
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
  loadCurrentPlaceStore,
  loadStoreDetail
} = useStore()

const { push } = useRouter()
const route = useRoute()

type BoundLatLng = {
  _lat: number
  _lng: number
  x: number
  y: number
} & naver.maps.Point


// 맵
const map = ref<Map | null>()
const flag = ref<boolean>(false)
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

  push('/search')
  
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

  loadCurrentPlaceStore(body)
}


// 마커
type MarkerData = {
  htmlIcon: any, 
  position: LatLng
  active: boolean
} & StoreCard

const visibleMarker = ref<boolean>(false)
const selectedMarker = ref<number | null | string>(null)
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
      storeType: storeTypeMap[card.storeType as number],
      active: false  
    }))
})

const onMarkerClick = (markerId: number | string) => {
  if(route.params.id == markerId) return
  // 디테일 api 요청
  loadStoreDetail(String(markerId))
  push(`/detail/${markerId}`)

}

const createMarkerIcon = (markerId: number) => {  
  const prefix = selectedMarker.value == markerId ? '-active' : ''
  return new URL(
    `../../assets/img/detail/marker-icon${prefix}.svg`,
    import.meta.url
  ).href  
}

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
 
const focus = (latitude: number, longitude: number, zoomLevel: number = DEFAULT_ZOOM_LEVEL) => {
  const center = new window.naver.maps.LatLng(latitude, longitude)
  map.value?.setCenter(center)
  map.value?.setZoom(zoomLevel)
}


onMounted(() => {
  flag.value = true
  const id = route.params.id
  if(id) {
    nextTick(() => {
      selectedMarker.value = id as string
      const { latitude, longitude } = storeCards.data.find(marker => marker.storeId == selectedMarker.value)?.place!      
      focus(latitude, longitude)
    })
  }
})
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
  position: relative;
  display: flex;

  height: 48px;
  max-height: 48px;
  padding: 0px 16px 0px 8px;  
  gap: 8px;
  border-radius: 80px;
  border: 1px solid #539AFF;  

  align-items: center;
  font-family: 'Pretendard';  
  white-space: nowrap;
  background-color: white;
  cursor: pointer;

  .innerIcon {
    height: 32px;
    width: 32px;
    border-radius: 80px;
    background-color: $blue-lighten-2;
  }

  .marker-text {
    display: flex;
    align-items: flex-start;
    flex-direction: column;    

    .title {
      font-weight: 600;
      font-size: 14px;
      line-height: 140%;
      color: #343E4C;
    }

    .subtitle {
      font-size: 10px;
      line-height: 140%;
      color: #8C95A1;
    }
  }



  &.active {
    background-color: $blue-lighten-2;    
    z-index: 100;

    .innerIcon {
      background-color: white;
    }

    .subtitle,
    .title {
      color: white;
    }
  }


  &::after {
    content: '';
    width: 0px; 
    height: 0px;
    border-bottom: 10px solid transparent;
    border-top: 10px solid $blue-lighten-2;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    position: absolute;    
    bottom: -20px;
    left: 20px;
  }
}
</style>
