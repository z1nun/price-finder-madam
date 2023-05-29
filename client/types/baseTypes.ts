// 기본 타입

type StoreType =
  | '한식'
  | '중식'
  | '경양식,일식'
  | '기타외식업'
  | '미용업'
  | '목욕업'
  | '세탁업'
  | '숙박업'
  | '서비스업종'

const storeTypeMap: Record<number, StoreType> = {
  1: '한식',
  2: '중식',
  3: '경양식,일식',
  4: '기타외식업',
  5: '미용업',
  6: '목욕업',
  7: '세탁업',
  8: '숙박업',
  13: '서비스업종',
}

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
  storeType: number | string
  storePride: string
  storeAddress: string
  place: LatLng
}

// 가게 상세
type StoreDetail = {
  storeInfo?: string
  storeNumber?: string
  storeWayToCome?: string
  storeUrl?: string
  products?: Product[]
} & StoreCard

export type { Product, LatLng, StoreCard, StoreDetail }

export { storeTypeMap }
