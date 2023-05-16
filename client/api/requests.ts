import axios from "axios"
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
} from "~/types/api"
import { createPostRequest } from "./utils"
import { categorySearchUrl, currentPlaceStoreUrl, createGecodingReverseUrl, neighborhoodsStoreUrl, createStoreDetailUrl, storeSearchUrl } from "./urls"
import { DEFAULT_HEADERS } from "."
import { LatLng } from "~/types/base"

// 업소 자세한 정보 요청 api
const requestStoreDetail = (storeId: number) => {
  const url = createStoreDetailUrl(storeId)
  return async () => await axios.get<StoreDetailResponse>(url, DEFAULT_HEADERS)
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
  return async () => axios.get<GeocodeReverseResponse>(url, DEFAULT_HEADERS)
}

export {
  requestStoreSearch,
  requestNeighborhoodsStore,
  requestCurrentPlaceStore,
  requestCategorySearch,
  requestStoreDetail,
  requestGeocodeReverse

}