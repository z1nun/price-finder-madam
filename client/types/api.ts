import { LatLng, Product, StoreCard } from "./base"

type BaseResponse<T> = {
  status: string
  message: string 
  data: T
}

// 업소 자세한 정보 요청
export type StoreDetailResponse = BaseResponse<{
  storeInfo: string
  storeNumber: string
  storeWayToCome: string
  storeUrl: string
  products: Product[]
}>

// 매장명 또는 상품 검색 요청
export type StoreSearchResponse = BaseResponse<StoreCard[]>
export type StoreSearchRequestBody = {
  searchInput: string
  address: string
  page: number
}

// 홈에서 더보기 요청
export type NeighborhoodsStoreResponse = BaseResponse<StoreCard[]>
export type NeighborhoodsStoreRequestBody = {
  userPlace: LatLng
  address: string
  page: number 
}

// 지도에서 현 위치 찾기
export type CurrentPlaceStoreResponse = BaseResponse<StoreCard[]>
export type CurrentPlaceStoreRequestBody = {
  leftUpPlace: LatLng
  rightDownPlace: LatLng
  userPlace: LatLng
  storeName?: string | null
  storeType: number | null
  page: number
}


// 검색 페이지에서 카테고리 선택
export type CategorySearchResponse = BaseResponse<StoreCard[]>
export type CategorySearchRequestBody = {
  storeType: number
  address: string
  page: string
}


// 네이버 geocoding 
export interface GeocodeReverseResponse {
  results: Address[]
  errorMessage: string
  meta: Meta
  status: string
}

interface Address {
  name: string
  code: any
  region: Region
}

interface Region {
  area0: Area
  area1: Area
  area2: Area
  area3: Area
}

interface Area {
  name: string
  coords: any
  alias?: string
}

interface Meta {
  totalCount: number
  page: number
  count: number
}

interface AddressElement {
  types: string[]
  longName: string
  shortName: string
  code: string  
}
