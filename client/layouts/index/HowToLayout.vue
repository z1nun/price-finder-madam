<template>
  <ClientOnly>
    <section class="HowToLayoutWarpper" v-if="visible">
      <article class="Title">
        착한소비는 <br />
        어떻게 만들어졌나요?
      </article>
      <HowToInformation />
    </section>
  </ClientOnly>
</template>

<script setup lang="ts">
import HowToInformation from '~/components/index/howto/HowToInformation.vue'
import useDisplay from '~/utils/display'

const { divice } = useDisplay()

const visible = computed<boolean>(() => !(divice.value === 'xs'))
</script>

<style scoped lang="scss">
.HowToLayoutWarpper {
  height: 680px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  .Title {
    margin-top: 80px;
    font-family: 'Pretendard' sans-serif;
    color: #343e4c;
    font-size: 28px;
    line-height: 150%;
    font-weight: 700;
  }
}
</style>
