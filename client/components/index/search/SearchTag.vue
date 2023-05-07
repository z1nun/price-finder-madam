<template>
  <article class="SearchTag">
    <div class="IconBox">
      <img :src="url" class="icon" />
    </div>
    <div class="tagText">
      {{ tag.text }}
    </div>
  </article>
</template>

<script setup lang="ts">
import { ITag } from '~/components/types'

interface SearchTagProp {
  tag: ITag
}

const { tag } = defineProps<SearchTagProp>()

const url = new URL(`../../../assets/img/${tag.id}.svg`, import.meta.url).href
</script>

<style scoped lang="scss">
.SearchTag {
  display: flex;
  flex-direction: column;
  justify-items: start;
  align-items: center;
  text-align: center;
  font-family: 'Pretendard';
  width: 200px;

  .IconBox {
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    border-radius: 80px;
    background: #fdfdfd;
    cursor: pointer;
    box-sizing: border-box;
    image-rendering: -webkit-optimize-contrast;
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  .tagText {
    margin-top: 16px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 140%;
    transition: all 0.5s;
  }

  &.active {
    .tagText {
      font-weight: bold;
    }

    .IconBox {
      box-shadow: 2px 3px 16px 1px rgba(221, 221, 221, 0.08), 2px 3px 6px 3px rgba(230, 230, 230, 0.16);
    }
  }
}
</style>
