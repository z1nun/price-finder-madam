<template>
  <button>{{ title }}</button>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String,
})
const { title } = props
</script>

<style scoped lang="scss">
button {
  width: 312px;
  height: fit-content;
  border-radius: 48px;
  color: white;
  background-color: #3366ff;
  text-align: center;
  line-height: 48px;
  font-size: 1rem;
  border: 0;
  cursor: pointer;
  transition: all 0.1s;

  &:hover {
    opacity: 0.9;
  }
}
</style>
