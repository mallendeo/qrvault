<script setup lang="ts">
import { wrap } from 'comlink'
import type { QrWorker } from '~/utils/qr.worker'
import Worker from '~/utils/qr.worker?worker'

const props = withDefaults(defineProps<{
  content: string
  qrClass?: string
  emptyClass?: { icon?: string; wrapper: string }
}>(), {
  emptyClass: () => ({ icon: '', wrapper: '' }),
})

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
  <div class="flex-center bg-white" v-bind="$attrs">
    <div v-if="props?.content" class="flex-1 p-4" :class="qrClass" v-html="qrSVGStr" />
    <slot v-else>
      <div :class="emptyClass?.wrapper" class="flex-1 p-2 flex-center">
        <Icon
          :class="emptyClass?.icon"
          class="w-full h-full opacity-50"
          name="tabler:qrcode-off"
          color="black"
        />
      </div>
    </slot>
  </div>
</template>
