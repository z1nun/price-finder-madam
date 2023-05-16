import { defineStore } from "pinia";
import { AsyncStates, StoreCard } from "./types";
import { asyncUtils, createAsyncProcess } from "./utils";
import { requestCategorySearch, requestCurrentPlaceStore, requestNeighborhoodsStore, requestStoreDetail } from "~/api";
import { LatLng } from "~/types/base";
import { CategorySearchRequestBody, CurrentPlaceStoreRequestBody, NeighborhoodsStoreRequestBody } from "~/types/api";

const useStore = defineStore('store', () => {  
  const { initial, loading, fulfiled, error } = asyncUtils

  /**
   * 비동기 상태들을 초기화합니다.
   */
  const asyncStates = reactive<AsyncStates>({
    currentPosition: initial<LatLng>({
      latitude: 0,
      longitude: 0
    }),
    storeCards: initial<StoreCard[]>([]),
    detailCards: initial<StoreCard[]>([]),
  })

  const { detailCards, storeCards } = asyncStates


  // 비동기 동작 생성
  const asyncProcess = createAsyncProcess()

    
  const loadStoreCard = () => asyncProcess<StoreCard[]>(storeCards, async () => await []) 



  // 업소 자세한 정보 비동기 동작
  const loadStoreDetail = (storeId: number) => asyncProcess<StoreCard[]>(detailCards, requestStoreDetail(storeId))

  // 홈에서 더보기 비동기 동작
  const loadNeighborhoodsStore = (body: NeighborhoodsStoreRequestBody) => asyncProcess<StoreCard[]>(storeCards, requestNeighborhoodsStore(body))

  // 지도에서 현 위치 찾기 api 
  const loadCurrentPlaceStore = (body: CurrentPlaceStoreRequestBody) => asyncProcess<StoreCard[]>(storeCards, requestCurrentPlaceStore(body))

  // 검색 페이지에서 카테고리 선택
  const loadCategorySearch = (body: CategorySearchRequestBody) => asyncProcess<StoreCard[]>(storeCards, requestCategorySearch(body))
 
  

  

  // 현재 위치 로드
  const loadLocation = () => {   
    const targetState = asyncStates.currentPosition
    loading(targetState)
    
    navigator
      .geolocation
      .getCurrentPosition(   
        (success: GeolocationPosition) => { fulfiled(targetState, success.coords) },
        (e: GeolocationPositionError) => { error(targetState, e) }
      )
  }

  return {
    loadLocation,
    loadStoreCard,
    asyncStates
  }
})

export default useStore