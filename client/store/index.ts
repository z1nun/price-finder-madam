import { defineStore } from "pinia";
import { AsyncState, Location } from "./types";

const asyncUtils = {
  initial: <T>(data?: T): AsyncState<T> => ({
    data: data || {},
    loading: true,
    error: null
  }),

  loading: (state: AsyncState) => {
    state.loading = true    
  },

  fulfiled: (state: AsyncState, response: any) => {
    state.data = response
    state.loading = false    
  },

  error: (state: AsyncState, error: unknown) => {
    state.data = null
    state.loading = false
    state.error = error
  } 
}

const useStore = defineStore('store', () => {  
  const { initial, loading, fulfiled, error } = asyncUtils
  
  const asyncStates = reactive<Record<string, AsyncState>>({
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