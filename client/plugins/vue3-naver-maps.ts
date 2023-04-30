import { createNaverMap } from "vue3-naver-maps"

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(createNaverMap, {
    clientId: import.meta.env.VITE_CLIENT_ID,
    category: "ncp", 
    subModules: []
  } as any)
})