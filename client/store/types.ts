
//
// 
//  interface 
//
//

interface Location {
  latitude: number
  longitude: number
}

type CateGory = 'cafe' | 'korean' | 'japanese' | 'other-food' | 'alcoholic' | 'snack' | 'western' | 'chinese'

type Item = {
  title: string
  price: number | string
}

type StoreCard = {
  id: number
  category: CateGory
  title: string
  address: string 
}

type DetailCard = Partial<{
  img: Blob | string
  feature: string[]
  opening: string
  contact: string
  item: Item[]
}> & StoreCard



type StateTypes = Location | DetailCard[] | StoreCard[]

type AsyncState<T = StateTypes, E = unknown> = {
  data: T
  loading: boolean
  error: E
}

type AsyncStates = {
  currentPosition: AsyncState<Location>,
  storeCards: AsyncState<StoreCard[]>,
  detailCards: AsyncState<DetailCard[]>  
}

export {  
  Location,
  StoreCard,
  DetailCard,
  StateTypes,
  AsyncState,
  AsyncStates
}