<template>
  <article>
    <div class="container">
      <div class="contentWrapper">
        <div><img :src="props.image" />{{ props.title }}</div>
        <ul>
          <li v-for="(item, i) in props.content" :key="i">{{ item }}</li>
        </ul>
      </div>
      <slot name="detail"></slot>
    </div>
    <slot name="components"></slot>
  </article>
</template>

<script setup lang="ts">
interface Props {
  image?: string
  title: string
  content: string[],
  imgType: string
}
const props = defineProps<Props>()

// const imgUrl = computed<string>(() => {
//   switch (props.imgType) {
//     case 'ckeck': return '~/assets/img/VerifiedCheck.svg'
//     case 'ckeck': return '~/assets/img/VerifiedCheck.svg'
//     default '.'    
//   }
// })

</script>

<style lang="scss" scoped>
article {
  width: 320px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px 20px;
  background: #ffffff;
  box-shadow: 2px 3px 16px 1px rgba(221, 221, 221, 0.08), 2px 3px 6px 3px rgba(230, 230, 230, 0.16);
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .contentWrapper {
    display: flex;
      flex-direction: column;
      gap: 8px;
      div {
        height: fit-content;
        display: flex;
        align-items: flex-start;
        gap: 4px;
        color: #343e4c;
        font-weight: 600;
        font-size: 1rem;
        line-height: 150%;
      }
    }
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-weight: 600;
    font-size: 1rem;
    line-height: 150%;
    color: #343e4c;
    margin: 0;
    padding-inline-start: 1.5rem;

    li {
      height: fit-content;
    }
  }
}

.store-inform,
.store-location {
  ul {
    font-weight: 400;
    font-size: 0.875rem;
  }
}
</style>
