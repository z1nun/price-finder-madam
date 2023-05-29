import { defineStore } from "pinia";
import { AsyncStates, } from "../types/storeTypes";
import { asyncUtils, createAsyncProcess } from "./utils";
import { requestCategorySearch, requestCurrentPlaceStore, requestGeocodeReverse, requestHome, requestLatlngToAddress, requestNeighborhoodsStore, requestStoreDetail, requestStoreSearch } from "~/api";
import { LatLng, StoreDetail, StoreCard } from "~/types/baseTypes";
import { CategorySearchRequestBody, CurrentPlaceStoreRequestBody, GeocodeReverseResponse, HomeRequestBody, LatlngToAddressResponse, NeighborhoodsStoreRequestBody, StoreSearchRequestBody } from "~/types/apiTypes";

const useStore = defineStore('store', () => {  
  const { initial, loading, fulfiled, error } = asyncUtils

  // 스토어가 관리하는 비동기 상태
  const asyncStates = reactive<AsyncStates>({
    currentPosition: initial<LatLng>({ latitude: 0, longitude: 0 }),
    storeCards: initial<StoreCard[]>([]),
    indexCards: initial<StoreCard[]>([]),
    storeDetail: initial<StoreDetail>({} as any),
    currentDoro: initial<{ address: string }>({ address: ''})
  })

  // 스토어가 관리하는 상태
  const states = reactive({
    
  })

  
  // 비동기 프로세스 생성
  const asyncProcess = createAsyncProcess(asyncStates)
    
  /**
    *  asyncProcss에 대하여..   
    * 
    *  asyncProcss는 첫번째 인자로 주어진 비동기 상태에 대해 *비동기 프로세스를 진행합니다.
    *  두 번째 인자는 받아올 api 콜백함수 또는 callback, onLoaded, onError로 이루어진 객체를 넣어줍니다.
    *  callback은 받아올 api 콜백함수, onLoaded는 요청 성공시 호출할 콜백, onError는 요청 실패시 호출할 콜백입니다.
    * 
    *  *비동기 프로세스: api의 응답값이 필요한 비동기 변수에 대해 자동으로 로딩 상태 관리, api의 응답값 할당, 
    *   에러 처리를 실행하는 프로세스입니다.
  */ 

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
  const loadStoreDetail = (storeId: string) => asyncProcess<StoreDetail>(asyncStates.storeDetail, {
    callback: requestStoreDetail(storeId),
    onLoaded: (result: any) => {
      console.log(result)
    }
  })

  // 홈에서 더보기 비동기 동작
  const loadNeighborhoodsStore = (body: NeighborhoodsStoreRequestBody) => asyncProcess<StoreCard[]>(asyncStates.storeCards, requestNeighborhoodsStore(body))

  // 지도에서 현 위치 찾기 api 
  const loadCurrentPlaceStore = (body: CurrentPlaceStoreRequestBody) => asyncProcess<StoreCard[]>(asyncStates.storeCards, {
    callback: requestCurrentPlaceStore(body),
    onLoaded: (result: any) => console.log('현 위치에서 찾기 요청에 성공했습니다.', result.data.data),
    onError: (e: unknown) => console.log('현 위치에서 찾기 요청에 실패했습니다.', e)
  })

  // 검색 페이지에서 카테고리 선택
  
  // 카테고리 - 한식 눌렀을때 검색어에 한식이 올라간 상태에서

  // 둘다 null 이거나 한쪽만 null 이여야한다.
  // 찾기 버튼을 눌럿다. -> storeType이 한식에 맞는 number 채워지고, storename은 null
  // 반대로 돈까스 검색했으면 storeType null, storeaName이 돈까스
  const loadCategorySearch = (body: CategorySearchRequestBody) => asyncProcess<StoreCard[]>(asyncStates.storeCards, requestCategorySearch(body))

  // 현재 위도 경도를 도로명으로 변경  
  const loadLatlngToAddress = (latlng: LatLng) => asyncProcess<LatlngToAddressResponse>(asyncStates.currentDoro, requestLatlngToAddress(latlng))
 
  // 현재 위치 로드
  const loadLocation = async (): Promise<LatLng> => {   
    const targetState = asyncStates.currentPosition
    loading(targetState)

    return new Promise((resolve, reject) => {
      navigator
        .geolocation
        .getCurrentPosition(   
          (success: GeolocationPosition) => { 
            if (asyncStates.currentDoro.data.address === '') loadLatlngToAddress(success.coords)
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
