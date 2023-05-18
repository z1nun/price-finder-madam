<template>
  <div>
    <ul>
      <li v-for="item in district.map((el) => el.Gu)">
        <input type="radio" :value="item" class="checkbox" name="gu" v-model="selectedGu" @click="sendToParent" />
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { watch, defineEmits, ref } from 'vue'
import district from '~/components/search/area'

//선택된 input value(구 명칭) 저장과 상위 컴포넌트에 전달
const selectedGu = ref('')
const emit = defineEmits(['UpdateSelectedGu'])
const sendToParent = () => {
  emit('UpdateSelectedGu', selectedGu.value)
}
watch(selectedGu, sendToParent)
</script>

<style lang="scss" scoped>
@import '~/assets/style/DropMenu.scss';
</style>
