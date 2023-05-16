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


type StoreCard = {
  storeId: number
  storeName: string
  storeType: number
  storePride: string
  storeAddress: string
  place: LatLng 
}

export type {
  Product,
  LatLng,
  StoreCard
}
