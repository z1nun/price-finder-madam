

// 비동기 관련 타입

import { LatLng, StoreCard } from "~/types/base"

export type Effect<T = any> = {  
  /**
   * 요청할 비동기 함수입니다.
   * @param arg 비동기 함수에 넣을 인자입니다.
   */
  callback: (arg?: any) => Promise<T>

  /**
   * 요청된 결과를 통해 행할 추가 작업입니다.
   * @param result callback 비동기함수에서 반환한 결과값입니다.
   */
  onLoaded?: (result: any) => void | null
  
  /**
   * 에러 처리 리터럴입니다.
   * @param error 
   */
  onError?: ((error: unknown | undefined) => void) | null
}


type AsyncState<T = any, E = unknown> = {
  data: T
  loading: boolean
  error: E
}

type StateTypes = LatLng | StoreCard[]

type AsyncStates = {
  currentPosition: AsyncState<LatLng>,
  storeCards: AsyncState<StoreCard[]>,
  detailCards: AsyncState<StoreCard[]>  
}


export {  
  StoreCard,  
  AsyncState,
  AsyncStates,
  StateTypes
}