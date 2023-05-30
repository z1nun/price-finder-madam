import { defineStore } from 'pinia'
import { AsyncStates, States } from '../types/storeTypes'
import { asyncUtils, createAsyncProcess } from './utils'
import {
  requestCategorySearch,
  requestCurrentPlaceStore,
  requestHome,
  requestLatlngToAddress,
  requestNeighborhoodsStore,
  requestStoreDetail,
  requestStoreSearch,
} from '~/api'
import { LatLng, StoreDetail, StoreCard, SearchType } from '~/types/baseTypes'
import {
  BaseResponse,
  CategorySearchRequestBody,
  CurrentPlaceStoreRequestBody,
  HomeRequestBody,
  LatlngToAddressResponse,
  NeighborhoodsStoreRequestBody,
  StoreSearchRequestBody,
} from '~/types/apiTypes'
import { AxiosResponse } from 'axios'

const useStore = defineStore('store', () => {
  const { initial, loading, fulfiled, error } = asyncUtils

  // 스토어가 관리하는 비동기 상태
  const asyncStates = reactive<AsyncStates>({
    currentPosition: initial<LatLng>({ latitude: 0, longitude: 0 }),
    storeCards: initial<StoreCard[]>([]),
    indexCards: initial<StoreCard[]>([]),
    storeDetail: initial<StoreDetail>({} as any),
    currentDoro: initial<{ address: string }>({ address: '' }),
    additionalStoreCards: initial<StoreCard[]>([]),
  })

  // 스토어가 관리하는 상태
  const states = reactive<States>({
    currentSearchType: {
      searchType: 'home',
      lastBody: {},
    },
    currentPage: 1,
    scrollTarget: null,
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
  const loadStoreSearch = (body: StoreSearchRequestBody) =>
    asyncProcess<StoreCard[]>(asyncStates.storeCards, {
      callback: requestStoreSearch(body),
      onLoaded: () => {
        states.currentSearchType.searchType = 'search'
        states.currentSearchType.lastBody = body
      },
    })

  // 홈 카드 요청
  const loadHome = (body: HomeRequestBody) =>
    asyncProcess<StoreCard[]>(asyncStates.indexCards, {
      callback: requestHome(body),
      onLoaded: () => {
        states.currentSearchType.searchType = 'home'
        scrollReset()
      },
    })

  // 업소 자세한 정보 비동기 동작
  const loadStoreDetail = (storeId: string) =>
    asyncProcess<StoreDetail>(asyncStates.storeDetail, {
      callback: requestStoreDetail(storeId),
    })

  // 홈에서 더보기 비동기 동작
  const loadNeighborhoodsStore = (body: NeighborhoodsStoreRequestBody) =>
    asyncProcess<StoreCard[]>(asyncStates.storeCards, {
      callback: requestNeighborhoodsStore(body),
      onLoaded: () => (states.currentSearchType.lastBody = body),
    })

  // 지도에서 현 위치 찾기 api
  const loadCurrentPlaceStore = (body: CurrentPlaceStoreRequestBody) =>
    asyncProcess<StoreCard[]>(asyncStates.storeCards, {
      callback: requestCurrentPlaceStore(body),
      onLoaded: () => {
        states.currentSearchType.searchType = 'currentPlace'
        states.currentSearchType.lastBody = body
        scrollReset()
      },
      onError: (e: unknown) => console.log('현 위치에서 찾기 요청에 실패했습니다.', e),
    })
  const loadCategorySearch = (body: CategorySearchRequestBody) =>
    asyncProcess<StoreCard[]>(asyncStates.storeCards, {
      callback: requestCategorySearch(body),
      onLoaded: () => {
        states.currentSearchType.searchType = 'category'
        states.currentSearchType.lastBody = body
        scrollReset()
      },
    })

  const searchRequestMapping: Record<SearchType, (body: any) => () => Promise<any>> = {
    home: requestNeighborhoodsStore,
    search: requestNeighborhoodsStore,
    currentPlace: requestCurrentPlaceStore,
    category: requestCategorySearch,
  }

  // 스크롤시 마지막 비동기 동작 요청
  const scrollSearch = () => {
    const callback = searchRequestMapping[states.currentSearchType.searchType]
    const body = {
      ...states.currentSearchType.lastBody,
      page: ++states.currentPage,
    }

    return asyncProcess<StoreCard[]>(asyncStates.additionalStoreCards, {
      callback: callback(body),
      onLoaded: (result: AxiosResponse<BaseResponse<StoreCard[]>>) => {
        if (result.data.data.length > 0) {
          asyncStates.storeCards.data = asyncStates.storeCards.data.concat(result.data.data)
        }
      },
    })
  }

  // 현재 위도 경도를 도로명으로 변경
  const loadLatlngToAddress = (latlng: LatLng) =>
    asyncProcess<LatlngToAddressResponse>(asyncStates.currentDoro, requestLatlngToAddress(latlng))

  // 현재 위치 로드
  const loadLocation = async (): Promise<LatLng> => {
    const targetState = asyncStates.currentPosition
    loading(targetState)

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (success: GeolocationPosition) => {
          if (asyncStates.currentDoro.data.address === '') loadLatlngToAddress(success.coords)
          fulfiled(targetState, {
            latitude: success.coords.latitude,
            longitude: success.coords.longitude,
          })
          resolve({
            latitude: success.coords.latitude,
            longitude: success.coords.longitude,
          })
        },
        (e: GeolocationPositionError) => {
          error(targetState, e)
          reject(e)
        }
      )
    })
  }

  const scrollReset = () => {
    console.log(states.scrollTarget)
    nextTick(() => states.scrollTarget?.scrollTo({ top: 0 }))
  }

  return {
    loadLocation,
    loadStoreDetail,
    loadCurrentPlaceStore,
    loadStoreSearch,
    loadHome,
    loadCategorySearch,
    scrollSearch,
    loadNeighborhoodsStore,

    asyncStates,
    states,
  }
})

export default useStore
