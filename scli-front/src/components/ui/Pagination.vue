<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    paginaActual: number
    totalPaginas: number
    totalElementos: number
    tamanioPagina?: number
  }>(),
  {
    tamanioPagina: 20,
  },
)

const emit = defineEmits<{
  cambiar: [pagina: number]
}>()

const esPrimera = computed(() => props.paginaActual <= 0)
const esUltima = computed(() => props.paginaActual >= props.totalPaginas - 1)

const rangoVisible = computed(() => {
  const desde = props.totalElementos === 0 ? 0 : props.paginaActual * props.tamanioPagina + 1
  const hasta = Math.min(props.totalElementos, (props.paginaActual + 1) * props.tamanioPagina)
  return { desde, hasta }
})
</script>

<template>
  <div v-if="totalElementos > 0" class="acad-pagination">
    <span class="acad-pagination__resumen">
      {{ rangoVisible.desde }}–{{ rangoVisible.hasta }} de {{ totalElementos }}
    </span>

    <div class="acad-pagination__controles">
      <button
        type="button"
        class="acad-btn acad-btn--ghost acad-btn--icon"
        :disabled="esPrimera"
        aria-label="Página anterior"
        @click="emit('cambiar', paginaActual - 1)"
      >
        ‹
      </button>
      <span class="acad-pagination__pagina">
        Página {{ paginaActual + 1 }} de {{ Math.max(totalPaginas, 1) }}
      </span>
      <button
        type="button"
        class="acad-btn acad-btn--ghost acad-btn--icon"
        :disabled="esUltima"
        aria-label="Página siguiente"
        @click="emit('cambiar', paginaActual + 1)"
      >
        ›
      </button>
    </div>
  </div>
</template>

<style scoped>
.acad-pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--acad-space-4);
  padding-top: var(--acad-space-4);
  font-size: 0.8125rem;
  color: var(--acad-text-secondary);
  flex-wrap: wrap;
}

.acad-pagination__controles {
  display: flex;
  align-items: center;
  gap: var(--acad-space-3);
}

.acad-pagination__pagina {
  min-width: 120px;
  text-align: center;
}
</style>
