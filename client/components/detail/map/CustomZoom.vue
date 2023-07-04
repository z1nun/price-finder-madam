<template>
  <article>
    <button @click="emit('zoom', 'in')">
      <img src="~/assets/img/detail/in.svg">
    </button>
    <div class="divider"></div>
    <button @click="emit('zoom', 'out')">
      <img src="~/assets/img/detail/out.svg">
    </button>
  </article>
</template>

<script setup lang="ts">
import { ZoomType } from '~/utils/map';

const emit = defineEmits<{(e: 'zoom', value: ZoomType): void }>()

</script>

<style scoped lang="scss">
article {
  position: absolute;
  right: 0;
  top: 30%;
  transform: translateY(-30%);
  z-index: 0;
  margin-right: 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  background-color: $light-lighten-1;
  border-radius: 8px;
  width: 48px;
  height: 96px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  .divider {
    position: absolute;
    width: 48px;
    height: 0px;
    border: 1px solid #AFB7C0;
    transform: rotate(180deg);        
  }

  button {
    border: none;    
    background-color: $light-lighten-2;
    width: 45px;
    height: 45px;
    cursor: pointer;

    &:active {
      background-color: $light;
    }
  }

  img {
    width: 24px;
    height: 24px;
    transition: .2s all;
    cursor: pointer;    
  }

}
</style>