<template>
  <article>
    <div @click="emit('zoom', 'in')"> 줌인 </div>
    <div @click="emit('zoom', 'out')"> 줌아웃 </div>    
  </article>
</template>

<script setup lang="ts">

const emit = defineEmits<{(e: 'zoom', value: 'in' | 'out'): void }>()

</script>

<style scoped lang=scss>
article {
  position: absolute;
  right: 0;
  z-index: 0;
  margin-right: 1rem;

  >div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1rem;
    border-radius: 10px;
    width: 50px;
    cursor: pointer;
    height: 50px;
    background-color: white;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    transition: .2s all;

    &:last-child {
      margin-top: 1rem;
    }

    &:active {
      font-size: 18px;
    }
  }
}
</style>