import { AsyncState, AsyncStates, StateTypes } from "./types"


                                                             
//                             
//  비동기 상태를 제어하는 코드를 모아놨습니다.   
//                                            




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
    loading: true,
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
  fulfiled: (state: AsyncState, response: StateTypes) => {
    state.data = response
    state.loading = false    
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



type Effect = {  
  /**
   * 요청할 비동기 함수입니다.
   * @param arg 비동기 함수에 넣을 인자입니다.
   */
  callback: (arg?: any) => Promise<any>

  /**
   * 요청된 결과를 통해 행할 추가 작업입니다.
   * @param result callback 비동기함수에서 반환한 결과값입니다.
   */
  onLoaded?: (result: any) => void | null
  
  /**
   * 에러 처리 리터럴입니다.
   * @param error 
   */
  onError?: ((error: unknown | undefined) => void) | null
}



/*
  비동기 상태 흐름을 생성하는 함수 
*/
const createAsyncProcess = (states: AsyncStates) => {
  const { loading, fulfiled, error } = asyncUtils

  type State = keyof AsyncStates

  return <T extends StateTypes>(state: State, effect: Effect | Effect["callback"]) => {
    const { callback , onLoaded, onError } = typeof effect === 'function' ? { 
      callback: effect, 
      onLoaded: null,
      onError: (e: unknown) => console.log(e)
    } : effect

    loading(states[state])

    callback()
      .then((result: T) => {
        fulfiled(states[state], result)
        onLoaded && onLoaded(result)
      })      
      .catch((e: unknown) => {
        error(states[state], e)
        onError && onError(e)
      })
  }  
}



export {
  asyncUtils,  
  createAsyncProcess
}

export {
  Effect
}