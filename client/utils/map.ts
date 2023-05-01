import { onMounted, reactive, ref, toRefs } from "vue"

type MapOptions = naver.maps.MapOptions
type MarkerSize = naver.maps.Size | naver.maps.SizeLiteral
type InfoWindowOptions = naver.maps.InfoWindowOptions
type ZoomControlOptions = naver.maps.ZoomControlOptions
type Location = {
  latitude: number
  longitude: number
}

const zoomControlStyleMap = Object.freeze({
  "SMALL": 2,
  "LARGE": 3  
})

const zoomControlPositionMap = Object.freeze<Record<string, number>>({
  "CENTER": 0,
  "TOP_LEFT": 1,
  "TOP_CENTER": 2,
  "TOP_RIGHT": 3,
  "LEFT_CENTER": 4,
  "LEFT_TOP": 5,
  "LEFT_BOTTOM": 6,
  "RIGHT_TOP": 7,
  "RIGHT_CENTER": 8,
  "RIGHT_BOTTOM": 9,
  "BOTTOM_LEFT": 10,
  "BOTTOM_CENTER": 11,
  "BOTTOM_RIGHT": 12,
})

const useMapOptions = () => {

  const currentPosition = reactive<Location>({
    latitude: 0,
    longitude: 0
  })

  const isError = ref<boolean>(false)

  const loadedPosition = ref<boolean>(false)

  const ZOOM_CONTRAL_OPTIONS: ZoomControlOptions = {
    style: zoomControlStyleMap.SMALL,
    position: zoomControlPositionMap.TOP_RIGHT,
  }

  const DEFAULT_ZOOM_OPTIONS: MapOptions = {
    scaleControl: false,
    logoControl: false,
    mapDataControl: false,
    zoomControl: false,
    zoomControlOptions: ZOOM_CONTRAL_OPTIONS,
    minZoom: 6,
    zoom: 13
  }

  const DEFAULT_MARKER_SIZE: MarkerSize = {
    width: 100,
    height: 20
  }

  const DEFAULT_WINDOWINFO_OPTIONS: Omit<InfoWindowOptions, 'position' | 'content'> = {
    borderWidth: 0,
    disableAnchor: false,
    anchorSize: {
      width: 0,
      height: 0
    },
  }

  const loadLocation = () => {    
    navigator
      .geolocation
      .getCurrentPosition(   
        (success: GeolocationPosition) => {
          const { coords: { latitude, longitude } } = success
          currentPosition.latitude = latitude ?? 0
          currentPosition.longitude = longitude ?? 0
          loadedPosition.value = true
        },
        (error: GeolocationPositionError) => {
          console.log(error)
          isError.value = true
          loadedPosition.value = false
        }
      )
  }


  return {
    DEFAULT_ZOOM_OPTIONS,
    DEFAULT_MARKER_SIZE,
    DEFAULT_WINDOWINFO_OPTIONS,
    currentPosition,
    loadedPosition,
    loadLocation,
  }
}

export default useMapOptions

