import { defineStore } from "pinia";
import { AsyncState, AsyncStates, Location, StateTypes } from "./types";

const asyncUtils = {
  initial: <T>(data: T): AsyncState<T> => ({
    data,
    loading: true,
    error: null
  }),

  loading: (state: AsyncState) => {
    state.loading = true    
  },

  fulfiled: (state: AsyncState, response: StateTypes) => {
    state.data = response
    state.loading = false    
  },

  error: (state: AsyncState, error: unknown) => {
    state.loading = false
    state.error = error
  } 
}

const k = {}

const useStore = defineStore('store', () => {  
  const { initial, loading, fulfiled, error } = asyncUtils
  
  const asyncStates = reactive<AsyncStates>({
    currentPosition: initial<Location>({
      latitude: 0,
      longitude: 0
    })
  })
  
  const loadLocation = () => {     
    const targetState = asyncStates.currentPosition
    loading(targetState)
    
    navigator
      .geolocation
      .getCurrentPosition(   
        (success: GeolocationPosition) => { fulfiled(targetState, success.coords) },
        (e: GeolocationPositionError) => { error(targetState, e) }
      )
  }

  return {
    loadLocation,
    asyncStates
  }
})

export default useStore