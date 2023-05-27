import { defineStore } from "pinia";
import { AsyncStates, } from "../types/storeTypes";
import { asyncUtils, createAsyncProcess } from "./utils";
import { requestCategorySearch, requestCurrentPlaceStore, requestGeocodeReverse, requestHome, requestNeighborhoodsStore, requestStoreDetail, requestStoreSearch } from "~/api";
import { LatLng, StoreDetail, StoreCard } from "~/types/baseTypes";
import { CategorySearchRequestBody, CurrentPlaceStoreRequestBody, GeocodeReverseResponse, HomeRequestBody, NeighborhoodsStoreRequestBody, StoreSearchRequestBody } from "~/types/apiTypes";

const useStore = defineStore('store', () => {  
  const { initial, loading, fulfiled, error } = asyncUtils

  // 스토어가 관리하는 비동기 상태
  const asyncStates = reactive<AsyncStates>({
    currentPosition: initial<LatLng>({ latitude: 0, longitude: 0 }),
    storeCards: initial<StoreCard[]>([]),
    indexCards: initial<StoreCard[]>([]),
    storeDetail: initial<StoreDetail>({} as any),
    currentDoro: initial<GeocodeReverseResponse>({} as any)
  })

  // 스토어가 관리하는 상태
  const states = reactive({

  })

  
  // 비동기 동작 생성
  const asyncProcess = createAsyncProcess(asyncStates)


  // 검색
  const loadStoreSearch = (body: StoreSearchRequestBody) => asyncProcess<StoreCard[]>(asyncStates.storeCards, {
    callback: requestStoreSearch(body),
    onLoaded: (result: any) => {
      console.log(`${body.storeName}에 대해 검색 요청에 성공했습니다.`, result.data.data)      
    }
  })

  // 홈 카드 요청
  const loadHome = (body: HomeRequestBody) => asyncProcess<StoreCard[]>(asyncStates.indexCards, {
    callback: requestHome(body),
    onLoaded: (result: any) => {
      console.log('홈 카드 요청에 성공했습니다.', result.data.data)
      asyncStates.storeCards.data = result.data.data
    },
    onError: (e: unknown) => console.log('홈 카드 요청에 실패했습니다.', e)
  })

  // 업소 자세한 정보 비동기 동작
  const loadStoreDetail = (storeId: string) => asyncProcess<StoreDetail>(asyncStates.storeDetail, requestStoreDetail(storeId))

  // 홈에서 더보기 비동기 동작
  const loadNeighborhoodsStore = (body: NeighborhoodsStoreRequestBody) => asyncProcess<StoreCard[]>(asyncStates.storeCards, requestNeighborhoodsStore(body))

  // 지도에서 현 위치 찾기 api 
  const loadCurrentPlaceStore = (body: CurrentPlaceStoreRequestBody) => asyncProcess<StoreCard[]>(asyncStates.storeCards, {
    callback: requestCurrentPlaceStore(body),
    onLoaded: (result: any) => console.log('현 위치에서 찾기 요청에 성공했습니다.', result.data.data),
    onError: (e: unknown) => console.log('현 위치에서 찾기 요청에 실패했습니다.', e)
  })

  // 검색 페이지에서 카테고리 선택
  const loadCategorySearch = (body: CategorySearchRequestBody) => asyncProcess<StoreCard[]>(asyncStates.storeCards, requestCategorySearch(body))

  // 현재 위도 경도를 도로명으로 변경
  const loadGeocodingReverse = (latlng: LatLng) => asyncProcess<GeocodeReverseResponse>(asyncStates.currentDoro, requestGeocodeReverse(latlng))
 
  // 현재 위치 로드
  const loadLocation = async (): Promise<LatLng> => {   
    const targetState = asyncStates.currentPosition
    loading(targetState)

    return new Promise((resolve, reject) => {
      navigator
        .geolocation
        .getCurrentPosition(   
          (success: GeolocationPosition) => { 
            if (Object.keys(asyncStates.currentDoro.data).length === 0) loadGeocodingReverse(success.coords)       
            fulfiled(targetState, {
              latitude: success.coords.latitude,
              longitude: success.coords.longitude
            })
            resolve({
              latitude: success.coords.latitude,
              longitude: success.coords.longitude
            })              
          },
          (e: GeolocationPositionError) => {
            error(targetState, e)
            reject(e)
          }
        )
    })
  }
  // 현재 동을 반환합니다.
  const getCurrnetDong = computed<string>(() => asyncStates.currentDoro.data?.results[0].region.area3.name)


  return {
    loadLocation,
    loadStoreDetail,
    loadCurrentPlaceStore,
    loadStoreSearch,
    loadHome,
    asyncStates
  }
})

export default useStore
