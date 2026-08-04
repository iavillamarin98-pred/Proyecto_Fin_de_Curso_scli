<script setup lang="ts" generic="T extends { id: string }">
import type { CardField } from '@/types/ui'

defineProps<{
  campos: CardField<T>[]
  items: T[]
  cargando: boolean
  tituloVacio?: string
  mensajeVacio?: string
}>()
</script>

<template>
  <div class="acad-cardgrid">
    <div v-if="cargando" class="acad-cardgrid__grid">
      <div v-for="n in 6" :key="`skeleton-${n}`" class="acad-card acad-card--skeleton">
        <span class="acad-skeleton" style="width: 60%; height: 18px" />
        <span class="acad-skeleton" style="width: 40%; height: 14px" />
        <span class="acad-skeleton" style="width: 80%; height: 14px" />
      </div>
    </div>

    <div v-else-if="items.length === 0" class="acad-vacio">
      <strong class="acad-vacio__titulo">{{ tituloVacio ?? 'Sin registros' }}</strong>
      <span>{{ mensajeVacio ?? 'Todavía no hay datos para mostrar aquí.' }}</span>
    </div>

    <div v-else class="acad-cardgrid__grid">
      <article v-for="item in items" :key="item.id" class="acad-card">
        <header class="acad-card__header">
          <slot name="encabezado" :item="item" />
        </header>

        <dl class="acad-card__campos">
          <div v-for="campo in campos" :key="campo.key" class="acad-card__campo">
            <dt>{{ campo.label }}</dt>
            <dd :class="{ 'acad-card__valor--destacado': campo.destacado }">
              {{ campo.value(item) }}
            </dd>
          </div>
        </dl>

        <footer v-if="$slots.acciones" class="acad-card__footer">
          <slot name="acciones" :item="item" />
        </footer>
      </article>
    </div>
  </div>
</template>

<style scoped>
.acad-cardgrid__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: var(--acad-space-4);
}

.acad-card {
  display: flex;
  flex-direction: column;
  gap: var(--acad-space-3);
  background: var(--acad-surface);
  border: 1px solid var(--acad-border);
  border-radius: var(--acad-radius-md);
  padding: var(--acad-space-4);
  box-shadow: var(--acad-shadow-sm);
  transition:
    box-shadow var(--acad-transition-base),
    border-color var(--acad-transition-base);
}

.acad-card:hover {
  box-shadow: var(--acad-shadow-md);
  border-color: var(--acad-border-strong);
}

.acad-card--skeleton {
  gap: var(--acad-space-2);
}

.acad-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--acad-space-2);
}

.acad-card__campos {
  display: flex;
  flex-direction: column;
  gap: var(--acad-space-2);
  margin: 0;
}

.acad-card__campo {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--acad-space-3);
  font-size: 0.8125rem;
}

.acad-card__campo dt {
  color: var(--acad-text-secondary);
}

.acad-card__campo dd {
  margin: 0;
  color: var(--acad-text-primary);
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.acad-card__valor--destacado {
  font-weight: 600;
}

.acad-card__footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--acad-space-2);
  padding-top: var(--acad-space-2);
  border-top: 1px solid var(--acad-border);
}

.acad-skeleton {
  display: block;
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
