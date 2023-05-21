<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="scss">
body {
  margin: 0px;
  padding: 0px;
  font-size: 14px;
  font-family: 'Pretendard';
}

button.primary-button  {
  font-family: 'Pretendard';
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 24px;
  gap: 8px;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  border: none;
  color: white;

  width: 320px;
  height: 48px;

  background: #3366FF;
  border-radius: 48px;

  cursor: pointer;

  &:hover {
    opacity: .9;
  }
}
</style>