
//
// !!! interface와 type 명확한 구분 필요 !!!
//


// 데이터 타입

interface Location {
  latitude: number
  longitude: number
}

type CateGory = 'cafe' | 'korean' | 'japanese' | 'other-food' | 'alcoholic' | 'snack' | 'western' | 'chinese'

type Item = {
  title: string
  price: number | string
}

type StoreCard = {
  id: number
  category: CateGory
  title: string
  address: string 
}

type DetailCard = Partial<{
  img: Blob | string
  feature: string[]
  opening: string
  contact: string
  item: Item[]
}> & StoreCard

type StateTypes = Location | DetailCard[] | StoreCard[]





// 비동기 관련 타입

export type Effect<T> = {  
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


type AsyncState<T = StateTypes, E = unknown> = {
  data: T
  loading: boolean
  error: E
}

type AsyncStates = {
  currentPosition: AsyncState<Location>,
  storeCards: AsyncState<StoreCard[]>,
  detailCards: AsyncState<DetailCard[]>  
}

export {  
  Location,
  StoreCard,
  DetailCard,
  StateTypes,
  AsyncState,
  AsyncStates,
}