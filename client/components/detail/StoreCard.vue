<template>
  <article>
    <div><img src="~/assets/img/VerifiedCheck.svg"/>착한가게</div>
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
  width: 320px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 20px;
  gap: 8px;
  background: #FFFFFF;
  box-shadow: 2px 3px 16px 1px rgba(221, 221, 221, 0.08), 2px 3px 6px 3px rgba(230, 230, 230, 0.16);

  div {
    height: fit-content;
    display : flex;
    align-items: flex-start;
    gap : 4px;
    color: #343E4C;
    font-weight: 600;
    font-size: 1rem;
    line-height: 150%;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap : 8px;
    font-weight: 600;
    font-size: 1rem;
    line-height: 150%;
    color: #343E4C;
    margin: 0;
    padding-inline-start: 1.5rem;

    li {
      width: 320px;
      height: fit-content;
    }
  }
}

</style>
