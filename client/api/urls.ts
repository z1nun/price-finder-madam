import { LatLng } from "~/types/base"

const END_POINT = ''
const NAVER_END_POINT = ''
const GEOCODING_REVERSE_BASE_URL = '/geocoding/map-reversegeocode/v2/gc'

const storeSearchUrl = `${END_POINT}/word/stores`
const createStoreDetailUrl = (storeId: number) => `${END_POINT}/store/${storeId}`
const neighborhoodsStoreUrl = `${END_POINT}/user_place/stores`
const currentPlaceStoreUrl = `${END_POINT}/search/map/stores`
const categorySearchUrl = `${END_POINT}/search/category/stores`

const createGecodingReverseUrl = (latlng: LatLng) => `${GEOCODING_REVERSE_BASE_URL}?coords=${latlng.longitude},${latlng.latitude}&output=json&orders=addr`

export {
  storeSearchUrl,
  createStoreDetailUrl,
  neighborhoodsStoreUrl,
  currentPlaceStoreUrl,
  categorySearchUrl,

  createGecodingReverseUrl
}