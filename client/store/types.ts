type Location = {
  latitude: number
  longitude: number
}

type StateTypes = Location

type AsyncState<T = StateTypes, E = unknown> = {
  data: T
  loading: boolean
  error: E
}

type AsyncStates = {
  currentPosition: AsyncState<Location>
}

export {  
  Location,
  StateTypes,
  AsyncState,
  AsyncStates
}