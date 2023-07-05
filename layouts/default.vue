<script setup>
import '~/assets/css/app.css'

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - QR Vault` : 'QR Vault'
  },
})
</script>

<template>
  <slot />
</template>

<style>
body {
  --at-apply: "bg-white"
}

.dark-mode body {
  --at-apply: "bg-dark"
}
</style>
