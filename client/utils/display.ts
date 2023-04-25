export type Divice = 'xl' | 'lg' | 'md' | 'sm' | 'xs'

const diviceSizeMap: Record<number, Divice> = {
  1: 'xs',
  2: 'sm',
  3: 'md',
  4: 'lg',
  5: 'xl'
}

const MOBILE_BREAK_POINT = 360

const useDisplay = () => {

  const width = ref<number>(0)

  const isMobile = computed<boolean>(() => width.value < MOBILE_BREAK_POINT)

  const divice = computed<Divice>(() => diviceSizeMap[Math.floor(width.value / (1920 / 5))])

  const getCurrentDiviceBreakPoint = (): string => {
    switch (divice.value) {
      case 'xs': return '384px'
      case 'sm': return '768px'
      case 'md': return '1152px'
      case 'lg': return '1536px'
      case 'xl': return '1920px'
    }
  }


  const resizeHandler = (): void => {
    if (typeof window !== "undefined") {
      width.value = window.innerWidth;
    }
  }

  onMounted(() => {
    width.value = window.innerWidth
    window?.addEventListener('resize', resizeHandler)      
  })

  return {
    getCurrentDiviceBreakPoint,
    isMobile,
    divice
  }
}


export default useDisplay