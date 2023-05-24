import { LatLng } from "~/types/baseTypes"

const END_POINT: string = 'http://3.34.124.58:8080'
const BASE_URL = process.env.NODE_ENV === 'development' ? '/api' : END_POINT

const GEOCODING_REVERSE_BASE_URL = process.env.NODE_ENV === 'development' ? '/geocoding/map-reversegeocode/v2/gc' : 'https://naveropenapi.apigw.ntruss.com/geocoding/map-reversegeocode/v2/gc'

const storeSearchUrl = `${END_POINT}/word/stores`
const createStoreDetailUrl = (storeId: string) => `${BASE_URL}/stores/${storeId}`
const neighborhoodsStoreUrl = `${BASE_URL}/user_place/stores`
const currentPlaceStoreUrl = `${BASE_URL}/search/map/stores`
const categorySearchUrl = `${BASE_URL}/search/category/stores`

const createGecodingReverseUrl = (latlng: LatLng) => `${GEOCODING_REVERSE_BASE_URL}?coords=${latlng.longitude},${latlng.latitude}&output=json&orders=addr`

export {
  storeSearchUrl,
  createStoreDetailUrl,
  neighborhoodsStoreUrl,
  currentPlaceStoreUrl,
  categorySearchUrl,

  createGecodingReverseUrl
}