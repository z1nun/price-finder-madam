<template>
  <article class="SearchTags">
    <SearchTag
      v-for="tag in tags"
      :key="tag.id"
      :tag="tag"
      :class="[activeId === tag.id ? 'active' : '']"
      @click="activeId = tag.id"
    />
  </article>
</template>

<script setup lang="ts">
import SearchTag from './SearchTag.vue'
import { TagId, ITag } from '~/components/types'

const activeId = ref<TagId>('all')

const tags = ref<ITag[]>([
  {
    text: '전체',
    id: 'all',
  },
  {
    text: '착한 가게',
    id: 'store',
  },
  {
    text: '착한 물품',
    id: 'thing',
  },
])
</script>

<style scoped lang="scss">
.SearchTags {
  display: flex;
  justify-items: start !important;
}
</style>
