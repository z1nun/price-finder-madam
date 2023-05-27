import { AxiosResponse } from "axios"
import { AsyncState, Effect, StateTypes } from "../types/storeTypes"
import { BaseResponse } from "~/types/apiTypes"


/*
  비동기 상태를 변경하는 유틸
*/
const asyncUtils = {

  /**
   * 상태를 초기화시킵니다.
   * @param data 초기화 데이터
   * @returns 초기화된 상태
   */
  initial: <T>(data: T): AsyncState<T> => ({
    data,
    loading: false,
    error: null
  }),

  /**
   * 상태를 로딩 으로 만듭니다.
   * @param state 변경할 상태
   */
  loading: (state: AsyncState) => {
    state.loading = true    
  },

  /**   
   * 요청 처리에 성공하여 상태를 응답값으로 변경합니다.
   * @param state 변경할 상태
   * @param response 요청 응답값
   */
  fulfiled: (state: AsyncState, response: StateTypes | BaseResponse<StateTypes>) => {
    state.loading = false    
    state.data = response
  },


  /**
   * 요청 처리에 실패하여 상태를 에러 응답값으로 변경합니다.
   * @param state 변경할 상태
   * @param error 에러 응답값
   */
  error: (state: AsyncState, error: unknown) => {
    state.loading = false
    state.error = error
  } 
}


/*
  비동기 상태 흐름을 생성하는 함수 
*/
const createAsyncProcess = (states: any) => {
  const { loading, fulfiled, error } = asyncUtils


  /**
   * 비동기 흐름을 진행시킵니다.
   * @param state 변경시킬 상태입니다.
   * @param effect 콜백 함수입니다.   
   */
  return <T extends StateTypes, E = unknown>(state: AsyncState<StateTypes>, effect: Effect | Effect["callback"]) => {
    const { callback , onLoaded, onError } = typeof effect === 'function' ? { 
      callback: effect, 
      onLoaded: null,
      onError: (e: unknown) => console.log(e)
    } : effect

    loading(state)

    callback()
      .then((result: AxiosResponse<T> | AxiosResponse<BaseResponse<T>>) => {
        Object.keys(result.data).includes('data') 
          ? fulfiled(state, (result.data as BaseResponse<T>).data)
          : fulfiled(state, result.data)
        onLoaded && onLoaded(result)
      })      
      .catch((e: E) => {
        error(state, e)        
        onError && onError(e)        
      })
  }  
}



export {
  asyncUtils,  
  createAsyncProcess
}
