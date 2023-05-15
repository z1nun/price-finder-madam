<template>
  <article>    
    <button @click="emit('searchCurrent')">
      <span><img src="~/assets/img/detail/location.svg" /></span>
      <span class="text">현위치에서 찾기</span>    
    </button>
  </article>
</template>

<script setup lang="ts">

interface SearchCurrentEmits {
  (e: 'searchCurrent'): void
}

const emit = defineEmits<SearchCurrentEmits>()

</script>

<style scoped lang="scss">
article {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%); /* 왼쪽으로 50%만큼 이동하여 중앙에 위치시킵니다 */
}
button {
  z-index: 0;
  display: flex;
  color: white;  
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 24px;
  gap: 8px;
  border: none;

  width: 320px;
  height: 48px;
  left: calc(50% - 320px/2 + 180px);
  top: 952px;

  background: #3366FF;
  border-radius: 48px;
  cursor: pointer;
}
</style>