<script setup lang="ts">
import { wrap } from 'comlink'
import type { QrWorker } from '~/utils/qr.worker'
import Worker from '~/utils/qr.worker?worker'

const props = defineProps<{ content: string }>()

const emit = defineEmits<{
  update: [svg: string]
}>()

const worker = new Worker()
const qr = wrap<QrWorker>(worker)

const qrSVGStr = ref('')

watchEffect(async () => {
  if (!props.content)
    return

  const svg = await qr.createQr(props.content, {})
  qrSVGStr.value = svg
  emit('update', svg)
})
</script>

<template>
  <div v-if="props.content" v-bind="$attrs" v-html="qrSVGStr" />
  <div v-else>
    empty
  </div>
</template>
