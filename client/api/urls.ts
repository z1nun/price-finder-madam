import { LatLng } from '~/types/baseTypes'

const END_POINT = 'http://3.34.124.58:8080'
const HTTPS_END_POINT = 'https://woojin.site'
const BASE_URL = process.env.NODE_ENV === 'development' ? HTTPS_END_POINT : HTTPS_END_POINT

const GEOCODING_REVERSE_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? '/geocoding/map-reversegeocode/v2/gc'
    : 'https://naveropenapi.apigw.ntruss.com/geocoding/map-reversegeocode/v2/gc'

const homeUrl = `${BASE_URL}/home`
const storeSearchUrl = `${BASE_URL}/search`
const createStoreDetailUrl = (storeId: string) => `${BASE_URL}/stores/${storeId}`
const neighborhoodsStoreUrl = `${BASE_URL}/search/map`
const currentPlaceStoreUrl = `${BASE_URL}/search/map/stores`
const categorySearchUrl = `${BASE_URL}/search/category/stores`

const createGecodingReverseUrl = (latlng: LatLng): string =>
  `${GEOCODING_REVERSE_BASE_URL}?coords=${latlng.longitude},${latlng.latitude}&output=json&orders=addr`
const createLatlngToAddress = (latlng: LatLng): string =>
  `${BASE_URL}/search/user/address?latitude=${latlng.latitude}&longitude=${latlng.longitude}`

export {
  homeUrl,
  storeSearchUrl,
  createStoreDetailUrl,
  neighborhoodsStoreUrl,
  currentPlaceStoreUrl,
  categorySearchUrl,
  createGecodingReverseUrl,
  createLatlngToAddress,
}
