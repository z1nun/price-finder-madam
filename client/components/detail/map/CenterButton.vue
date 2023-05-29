<template>
  <article>
    <button @click="emit('onCenterButtonClick')">
      <img src="~/assets/img/detail/target.svg" />
    </button>
  </article>
</template>

<script setup lang="ts">

const emit = defineEmits<{ (e: 'onCenterButtonClick'): void }>()

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
  }
}
</style>