<template>
  <div>
    <ul>
      <li v-for="item in data[0].Dong">
        <input type="radio" :value="item" class="checkbox" name="dong" v-model="data" />
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, defineEmits } from 'vue'
import district from '~/components/search/area'

// 선택된 input value(동 명칭) 저장과 상위 컴포넌트에 전달
const emit = defineEmits(['updateSelectedDong'])

const props = defineProps({
  Gu: String,
})

const data = computed({
  get: () => district.filter((el) => el.Gu === props.Gu),
  set: (selectedDong) => {
    emit('updateSelectedDong', selectedDong)
  },
})

console.log(data)
</script>

<style lang="scss" scoped>
@import '~/assets/style/DropMenu.scss';
</style>
