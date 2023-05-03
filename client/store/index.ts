import { defineStore } from "pinia";
import { AsyncStates, DetailCard, Location, StoreCard } from "./types";
import { asyncUtils, createAsyncProcess } from "./utils";

const useStore = defineStore('store', () => {  
  const { initial, loading, fulfiled, error } = asyncUtils

  /**
   * 비동기 상태들을 초기화합니다.
   */
  const asyncStates = reactive<AsyncStates>({
    currentPosition: initial<Location>({
      latitude: 0,
      longitude: 0
    }),
    storeCards: initial<StoreCard[]>([]),
    detailCards: initial<DetailCard[]>([]),    
  })

  
  const asyncProcess = createAsyncProcess(asyncStates)

  


  /**
   * 간단 카드를 로드합니다.   
   */
  const loadStoreCard = () => asyncProcess<StoreCard[]>('storeCards', async () => await []) 


  /**
   * 상세 카드를 로드합니다.
   * @param id 찾을 가게의 id
   */
  const loadDetailCard = (id: string) => asyncProcess<DetailCard[]>('detailCards', async () => await [])


  /**
   * 현재 위치를 로드합니다.
   */
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
    loadDetailCard,
    loadStoreCard,
    asyncStates
  }
})

export default useStore