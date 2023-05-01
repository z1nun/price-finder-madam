<template>
  <article>
    <div><img src="~/assets/img/BagSmile.svg"/>매장 정보</div>
    <ul>
      <li>영업시간 :07:30~20:00 휴무 :수</li>
      <li>남성역 1번 출구에서182m</li>
      <li>02-775-0038</li>
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
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 150%;
    color: #343E4C;
    margin: 0;
    padding-inline-start: 1.5rem;

    li {
      width: 320px;
      height: 24px;
    }
  }
}

</style>