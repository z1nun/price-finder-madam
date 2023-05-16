const END_POINT = ''
const NAVER_END_POINT = ''

const storeSearchUrl = `${END_POINT}/word/stores`
const storeDetailUrl = (storeId: number) => `${END_POINT}/store/${storeId}`
const neighborhoodsStoreUrl = `${END_POINT}/user_place/stores`
const currentPlaceStoreUrl = `${END_POINT}/search/map/stores`
const categorySearchUrl = `${END_POINT}/search/category/stores`

export {
  storeSearchUrl,
  storeDetailUrl,
  neighborhoodsStoreUrl,
  currentPlaceStoreUrl,
  categorySearchUrl
}