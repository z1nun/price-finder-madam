import { defineStore } from "pinia";

type Location = {
  latitude: number
  longitude: number
}

export type AsyncState<T = any, E = unknown> = {
  data: T | null
  loading: boolean
  error: E
}

const asyncUtils = {
  initial: (data?: any): AsyncState => ({
    data: data || null,
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
    currentPosition: initial({
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