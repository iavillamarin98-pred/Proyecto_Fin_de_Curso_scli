<script setup lang="ts">
import type { Tono } from '@/types/ui'

defineProps<{
  texto: string
  tono: Tono
}>()
</script>

<template>
  <span class="acad-badge" :class="`acad-badge--${tono}`">{{ texto }}</span>
</template>
