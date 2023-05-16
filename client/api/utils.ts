import axios, { AxiosHeaders, AxiosResponse } from "axios"
import { DEFAULT_HEADERS } from "."

/**
 * @description POST 요청 함수를 생성합니다. 제너릭타입으로 <응답 타입, 요청 BODY 타입>을 요구합니다.
 * @param url POST 요청 URL
 * @returns POST 요청 함수
 */
const createPostRequest = <RES, REQ>(url: string) => (requestBody: REQ, headers?: AxiosHeaders): Promise<AxiosResponse<RES>> => {
  return axios.post<RES>(url, requestBody, headers ?? DEFAULT_HEADERS)
}

export {
  createPostRequest
}