<script setup lang="ts">
defineProps<{
  modelValue: 'tabla' | 'cards'
}>()

const emit = defineEmits<{
  'update:modelValue': [value: 'tabla' | 'cards']
}>()
</script>

<template>
  <div class="acad-viewtoggle" role="group" aria-label="Cambiar vista">
    <button
      type="button"
      class="acad-viewtoggle__btn"
      :class="{ 'acad-viewtoggle__btn--activo': modelValue === 'tabla' }"
      @click="emit('update:modelValue', 'tabla')"
    >
      <span aria-hidden="true">☰</span> Tabla
    </button>
    <button
      type="button"
      class="acad-viewtoggle__btn"
      :class="{ 'acad-viewtoggle__btn--activo': modelValue === 'cards' }"
      @click="emit('update:modelValue', 'cards')"
    >
      <span aria-hidden="true">▦</span> Tarjetas
    </button>
  </div>
</template>

<style scoped>
.acad-viewtoggle {
  display: inline-flex;
  padding: 3px;
  background: var(--acad-surface-sunken);
  border-radius: var(--acad-radius-sm);
  border: 1px solid var(--acad-border);
}

.acad-viewtoggle__btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--acad-font-sans);
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--acad-text-secondary);
  background: transparent;
  border: none;
  border-radius: calc(var(--acad-radius-sm) - 2px);
  padding: 7px var(--acad-space-3);
  cursor: pointer;
  transition:
    background-color var(--acad-transition-fast),
    color var(--acad-transition-fast);
}

.acad-viewtoggle__btn--activo {
  background: var(--acad-surface);
  color: var(--acad-primary);
  box-shadow: var(--acad-shadow-sm);
}

.acad-viewtoggle__btn:focus-visible {
  outline: 2px solid var(--acad-primary);
  outline-offset: 2px;
}
</style>
