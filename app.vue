<script setup>
import '@unocss/reset/tailwind.css'
</script>

<template>
  <VitePwaManifest />
  <NuxtLoadingIndicator />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
