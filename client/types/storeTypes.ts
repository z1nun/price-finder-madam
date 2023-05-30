// 스토어 타입

import { GeocodeReverseResponse, LatlngToAddressResponse } from "~/types/apiTypes"
import { LatLng, SearchType, StoreCard, StoreDetail } from "~/types/baseTypes"

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
  onLoaded?: (result: any) => any
  
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

type StateTypes = LatLng | StoreCard[] | StoreDetail | string | LatlngToAddressResponse | { address: string}


// 비동기 상태들
type AsyncStates = {
  currentPosition: AsyncState<LatLng>,  // 현재 위치
  storeCards: AsyncState<StoreCard[]>,  // 업소 목록
  storeDetail: AsyncState<StoreDetail>   // 업종 상세
  currentDoro: AsyncState<{ address: string }>    // 현재 주솟값(도로명)  
  indexCards: AsyncState<StoreCard[]>
  additionalStoreCards: AsyncState<StoreCard[]>
}

// 상태
type States = {
  currentSearchType: {    
    searchType: SearchType
    lastBody: any
  }
  currentPage: number,
  scrollTarget: Element | null
}

export {  
  AsyncState,
  AsyncStates,
  StateTypes,
  States
}