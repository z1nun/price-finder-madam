import { LatLng, Product } from "./base"

// axios response interfaces

// 업소 자세한 정보 요청 응답
export interface StoreDetailResponse {
  storeInfo: string
  storeNumber: string
  storeWayToCome: string
  storeUrl: string
  products: Product[]
}

// 매장명 또는 상품 검색 요청 BODY
export interface StoreSearchRequestBody {
  searchInput: string
  address: string
  page: number
}

// 매장명 또는 상품 검색 요청 응답
export interface StoreSearchResponse {
  storeId: number
  storeName: string
  storeType: number
  storePride: string
  storeAddress: string
  place: LatLng 
}


// 홈에서 더보기 요청 응답
export interface NeighborhoodsStoreResponse {

}