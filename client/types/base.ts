// 기본 타입 //


// 물품 타입
type Product = {
  productName: string
  price: number
}


// 위도 경도 타입
type LatLng = {
  latitude: number
  longitude: number
}

// 업소 목록
type StoreCard = {
  storeId: number
  storeName: string
  storeType: number
  storePride: string
  storeAddress: string
  place: LatLng 
}

type StoreDetail = {

} & StoreCard

export type {
  Product,
  LatLng,
  StoreCard,
  StoreDetail
}
