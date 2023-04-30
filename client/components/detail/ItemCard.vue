<template>
  <article>
    <span>착한가게</span>
    <ul>
      <li>한식</li>
      <li>저렴한 가격, 깨끗한 위생</li>
    </ul>
  </article>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>

article {
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 16px 20px;
  gap: 8px;

  width: 320px;
  height: 120px;

  background: #FFFFFF;
  box-shadow: 2px 3px 16px 1px rgba(221, 221, 221, 0.08), 2px 3px 6px 3px rgba(230, 230, 230, 0.16);
  flex: none;
  order: 0;
  flex-grow: 0;

  span {
    width: 60px;
    height: 24px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 150%;
    /* identical to box height, or 24px */


    color: #343E4C;


    /* Inside auto layout */

    flex: none;
    order: 1;
    flex-grow: 0;
  }

  ul {

width: 320px;
height: 24px;

font-family: 'Pretendard';
font-style: normal;
font-weight: 600;
font-size: 16px;
line-height: 150%;
/* identical to box height, or 24px */


color: #343E4C;


/* Inside auto layout */

flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
  }
}

</style>