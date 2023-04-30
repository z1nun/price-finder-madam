import naver from 'vue3-naver-maps'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use((naver as any), {
    client: import.meta.env.VITE_CLIENT_ID,
    category: "ncp",
    subModules: ""
  })
})