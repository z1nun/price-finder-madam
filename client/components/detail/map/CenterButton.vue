<template>
  <article>
    <img src="~/assets/img/detail/target.svg" @click="emit('focusCenter')"/>
  </article>
</template>

<script setup lang="ts">

const emit = defineEmits<{ (e: 'focusCenter'): void }>()

</script>

<style scoped lang="scss">
article {
  position: absolute;
  right: 0;
  top: 20%;
  transform: translateY(-20%);
  z-index: 0;
  margin-right: 2.5rem;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  background-color: white;
  border-radius: 8px;
  width: 48px;
  height: 48px;  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  img {
    width: 24px;
    height: 24px;
    cursor: pointer;    
  }
}
</style>