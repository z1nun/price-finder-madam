// 기본 타입

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

// 가게 목록
type StoreCard = {
  storeId: number
  storeName: string
  storeType: number
  storePride: string
  storeAddress: string
  place: LatLng 
}

// 가게 상세
type StoreDetail = {
  storeInfo: string
  storeNumber: string
  storeWayToCome: string
  storeUrl: string
  products: Product[]
} & StoreCard

export type {
  Product,
  LatLng,
  StoreCard,
  StoreDetail
}
