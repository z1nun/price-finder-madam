type Location = {
  latitude: number
  longitude: number
}

type StateTypes = Location

type AsyncState<T = StateTypes, E = unknown> = {
  data: T | any
  loading: boolean
  error: E
}

export {
  Location,
  AsyncState
}