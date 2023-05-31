<template>
  <ClientOnly>
    <!-- 진원 -->
    <HeaderLayout />
    <LandingLayout />

    <!-- 준하 -->
    <IndexSearchLayout />
    <HowToLayout />

    <!-- 진원 -->
    <FooterLayout class="home" />
  </ClientOnly>
</template>

<script setup lang="ts">
import HeaderLayout from '/layouts/HeaderLayout.vue'
import LandingLayout from '/layouts/index/LandingLayout.vue'
import IndexSearchLayout from '/layouts/index/IndexSearchLayout.vue'
import HowToLayout from '/layouts/index/HowToLayout.vue'
import FooterLayout from '/layouts/FooterLayout.vue'
</script>
