<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: string
    placeholder?: string
    debounceMs?: number
  }>(),
  {
    placeholder: 'Buscar...',
    debounceMs: 350,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const valorLocal = ref(props.modelValue)
let temporizador: ReturnType<typeof setTimeout> | undefined

watch(
  () => props.modelValue,
  (nuevo) => {
    if (nuevo !== valorLocal.value) {
      valorLocal.value = nuevo
    }
  },
)

function alEscribir(): void {
  clearTimeout(temporizador)
  temporizador = setTimeout(() => {
    emit('update:modelValue', valorLocal.value)
  }, props.debounceMs)
}

onBeforeUnmount(() => {
  clearTimeout(temporizador)
})
</script>

<template>
  <div class="acad-search">
    <span class="acad-search__icono" aria-hidden="true">⌕</span>
    <input
      v-model="valorLocal"
      type="search"
      class="acad-input acad-search__input"
      :placeholder="placeholder"
      @input="alEscribir"
    />
  </div>
</template>

<style scoped>
.acad-search {
  position: relative;
  min-width: 240px;
}

.acad-search__icono {
  position: absolute;
  left: var(--acad-space-3);
  top: 50%;
  transform: translateY(-50%);
  color: var(--acad-text-muted);
  font-size: 0.9375rem;
  pointer-events: none;
}

.acad-search__input {
  padding-left: 32px;
}
</style>
