import axios from "axios"
import { createPostRequest } from "./utils"
import { 
  StoreDetailResponse,
  StoreSearchResponse, 
  StoreSearchRequestBody, 
  NeighborhoodsStoreResponse, 
  NeighborhoodsStoreRequestBody, 
  CurrentPlaceStoreResponse,
  CurrentPlaceStoreRequestBody, 
  CategorySearchResponse,
  CategorySearchRequestBody, 
  GeocodeReverseResponse
} from "~/types/apiTypes"
import { 
  categorySearchUrl, 
  currentPlaceStoreUrl, 
  createGecodingReverseUrl,
  neighborhoodsStoreUrl, 
  createStoreDetailUrl, 
  storeSearchUrl 
} from "./urls"
import { DEFAULT_HEADERS, GEOCODE_HEADERS } from "."
import { LatLng } from "~/types/baseTypes"

// 업소 자세한 정보 요청 api
const requestStoreDetail = (storeId: string) => {
  const url = createStoreDetailUrl(storeId)
  return () => axios.get<StoreDetailResponse>(url, DEFAULT_HEADERS)
}

// 매장명 또는 상품 검색 요청
const requestStoreSearch = createPostRequest<StoreSearchResponse, StoreSearchRequestBody>(storeSearchUrl)

// 홈에서 더보기 요청
const requestNeighborhoodsStore = createPostRequest<NeighborhoodsStoreResponse, NeighborhoodsStoreRequestBody>(neighborhoodsStoreUrl)

// 지도에서 현 위치 찾기 api
const requestCurrentPlaceStore = createPostRequest<CurrentPlaceStoreResponse, CurrentPlaceStoreRequestBody>(currentPlaceStoreUrl)

// 검색 페이지에서 카테고리 선택
const requestCategorySearch = createPostRequest<CategorySearchResponse, CategorySearchRequestBody>(categorySearchUrl)

// 위도 경도를 주소로 변환
const requestGeocodeReverse = (latlng: LatLng) => {
  const url = createGecodingReverseUrl(latlng)  
  return () => axios.get<GeocodeReverseResponse>(url, GEOCODE_HEADERS)
}

export {
  requestStoreSearch,
  requestNeighborhoodsStore,
  requestCurrentPlaceStore,
  requestCategorySearch,
  requestStoreDetail,
  requestGeocodeReverse

}