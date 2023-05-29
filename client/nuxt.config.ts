// https://nuxt.com/docs/api/configuration/nuxt-config
const defaultProxyOption = {
	changeOrigin: true,	
	secure: false,
	ws: true
}



export default defineNuxtConfig({
  css: ['@/assets/fonts/main.css'],  
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/style/variables.scss";'
        }
      }
    }
  },
  modules: [
    '@pinia/nuxt',    
  ],  
  app: {
    head: {
      title:'가격찾아줌마',
      meta: [
        {
          // 'http-equiv': "Content-Security-Policy",
          // content: 'default-src https'
        }
      ]
    },    
  },
  nitro: {
    devProxy: {
      "/geocoding": {
        target: 'https://naveropenapi.apigw.ntruss.com',
				rewrite: (path: string) => path.replace(/^\/geocoding/, ''),
				...defaultProxyOption
      },
      '/api': {
        target: 'http://3.34.124.58:8080',
        rewrite: (path: string) => path.replace(/^\/api/, ''),
				...defaultProxyOption
      }
    }
  },  
})