<template>
  <ClientOnly>
    <!-- 진원 -->
    <HeaderLayout />         
    <LandingLayout />

    <!-- 준하 -->
    <SearchLayout />
    <HowToLayout />

    <!-- 진원 -->
    <FooterLayout />
  </ClientOnly>
</template>

<script setup lang="ts">
import HeaderLayout from '/layouts/HeaderLayout.vue';
import LandingLayout from '/layouts/index/LandingLayout.vue'
import SearchLayout from '/layouts/index/SearchLayout.vue'
import HowToLayout from '/layouts/index/HowToLayout.vue'
import FooterLayout from '/layouts/FooterLayout.vue'
</script>
