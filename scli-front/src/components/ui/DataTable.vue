<script setup lang="ts" generic="T extends { id: string }">
import type { TableColumn } from '@/types/ui'

defineProps<{
  columnas: TableColumn<T>[]
  filas: T[]
  cargando: boolean
  tituloVacio?: string
  mensajeVacio?: string
}>()
</script>

<template>
  <div class="acad-table-wrap">
    <table class="acad-table">
      <thead>
        <tr>
          <th
            v-for="columna in columnas"
            :key="columna.key"
            :style="{ width: columna.width, textAlign: columna.align ?? 'left' }"
          >
            {{ columna.label }}
          </th>
          <th v-if="$slots.acciones" class="acad-table__col-acciones">Acciones</th>
        </tr>
      </thead>

      <tbody v-if="cargando">
        <tr v-for="n in 5" :key="`skeleton-${n}`" class="acad-table__fila-skeleton">
          <td v-for="columna in columnas" :key="columna.key">
            <span class="acad-skeleton" />
          </td>
          <td v-if="$slots.acciones">
            <span class="acad-skeleton" />
          </td>
        </tr>
      </tbody>

      <tbody v-else-if="filas.length === 0">
        <tr>
          <td :colspan="columnas.length + ($slots.acciones ? 1 : 0)">
            <div class="acad-vacio">
              <strong class="acad-vacio__titulo">{{ tituloVacio ?? 'Sin registros' }}</strong>
              <span>{{ mensajeVacio ?? 'Todavía no hay datos para mostrar aquí.' }}</span>
            </div>
          </td>
        </tr>
      </tbody>

      <tbody v-else>
        <tr v-for="fila in filas" :key="fila.id">
          <td
            v-for="columna in columnas"
            :key="columna.key"
            :style="{ textAlign: columna.align ?? 'left' }"
          >
            <slot :name="`celda-${columna.key}`" :item="fila">
              {{ columna.value ? columna.value(fila) : '' }}
            </slot>
          </td>
          <td v-if="$slots.acciones" class="acad-table__col-acciones">
            <slot name="acciones" :item="fila" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.acad-table-wrap {
  overflow-x: auto;
  border: 1px solid var(--acad-border);
  border-radius: var(--acad-radius-md);
  background: var(--acad-surface);
}

.acad-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--acad-font-sans);
  font-size: 0.875rem;
}

.acad-table thead th {
  text-align: left;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--acad-text-secondary);
  background: var(--acad-surface-sunken);
  padding: var(--acad-space-3) var(--acad-space-4);
  border-bottom: 1px solid var(--acad-border);
  white-space: nowrap;
}

.acad-table tbody td {
  padding: var(--acad-space-3) var(--acad-space-4);
  border-bottom: 1px solid var(--acad-border);
  color: var(--acad-text-primary);
  vertical-align: middle;
}

.acad-table tbody tr:last-child td {
  border-bottom: none;
}

.acad-table tbody tr:hover td {
  background: var(--acad-surface-sunken);
}

.acad-table__col-acciones {
  width: 1%;
  white-space: nowrap;
  text-align: right;
}

.acad-skeleton {
  display: block;
  height: 14px;
  border-radius: var(--acad-radius-sm);
  background: linear-gradient(
    90deg,
    var(--acad-surface-sunken) 25%,
    var(--acad-border) 50%,
    var(--acad-surface-sunken) 75%
  );
  background-size: 200% 100%;
  animation: acad-skeleton-shimmer 1.4s ease infinite;
}

@keyframes acad-skeleton-shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .acad-skeleton {
    animation: none;
  }
}
</style>
