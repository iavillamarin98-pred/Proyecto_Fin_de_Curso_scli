<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    abierto: boolean
    titulo: string
    ancho?: 'sm' | 'md' | 'lg'
  }>(),
  {
    ancho: 'md',
  },
)

const emit = defineEmits<{
  cerrar: []
}>()

function alPresionarEscape(event: KeyboardEvent): void {
  if (event.key === 'Escape' && props.abierto) {
    emit('cerrar')
  }
}

onMounted(() => {
  window.addEventListener('keydown', alPresionarEscape)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', alPresionarEscape)
})

watch(
  () => props.abierto,
  (abierto) => {
    document.body.style.overflow = abierto ? 'hidden' : ''
  },
)
</script>

<template>
  <Teleport to="body">
    <Transition name="acad-modal">
      <div v-if="abierto" class="acad-modal-overlay" @mousedown.self="emit('cerrar')">
        <div
          class="acad-modal"
          :class="`acad-modal--${ancho}`"
          role="dialog"
          aria-modal="true"
          :aria-label="titulo"
        >
          <header class="acad-modal__header">
            <h2 class="acad-modal__titulo">{{ titulo }}</h2>
            <button
              type="button"
              class="acad-modal__cerrar"
              aria-label="Cerrar"
              @click="emit('cerrar')"
            >
              ✕
            </button>
          </header>

          <div class="acad-modal__cuerpo">
            <slot />
          </div>

          <footer v-if="$slots.acciones" class="acad-modal__footer">
            <slot name="acciones" />
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.acad-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(28, 37, 48, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--acad-space-4);
  z-index: 1000;
}

.acad-modal {
  background: var(--acad-surface);
  border-radius: var(--acad-radius-lg);
  box-shadow: var(--acad-shadow-lg);
  width: 100%;
  max-height: min(720px, 90vh);
  display: flex;
  flex-direction: column;
  font-family: var(--acad-font-sans);
}

.acad-modal--sm {
  max-width: 420px;
}

.acad-modal--md {
  max-width: 640px;
}

.acad-modal--lg {
  max-width: 900px;
}

.acad-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--acad-space-5) var(--acad-space-6);
  border-bottom: 1px solid var(--acad-border);
}

.acad-modal__titulo {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--acad-text-primary);
}

.acad-modal__cerrar {
  border: none;
  background: transparent;
  color: var(--acad-text-secondary);
  font-size: 1rem;
  line-height: 1;
  cursor: pointer;
  padding: var(--acad-space-2);
  border-radius: var(--acad-radius-sm);
  transition: background-color var(--acad-transition-fast);
}

.acad-modal__cerrar:hover {
  background: var(--acad-surface-sunken);
  color: var(--acad-text-primary);
}

.acad-modal__cerrar:focus-visible {
  outline: 2px solid var(--acad-primary);
  outline-offset: 2px;
}

.acad-modal__cuerpo {
  padding: var(--acad-space-6);
  overflow-y: auto;
}

.acad-modal__footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--acad-space-3);
  padding: var(--acad-space-4) var(--acad-space-6);
  border-top: 1px solid var(--acad-border);
}

.acad-modal-enter-active,
.acad-modal-leave-active {
  transition: opacity var(--acad-transition-base);
}

.acad-modal-enter-from,
.acad-modal-leave-to {
  opacity: 0;
}

.acad-modal-enter-active .acad-modal,
.acad-modal-leave-active .acad-modal {
  transition:
    transform var(--acad-transition-base),
    opacity var(--acad-transition-base);
}

.acad-modal-enter-from .acad-modal,
.acad-modal-leave-to .acad-modal {
  transform: translateY(8px) scale(0.98);
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .acad-modal-enter-active,
  .acad-modal-leave-active,
  .acad-modal-enter-active .acad-modal,
  .acad-modal-leave-active .acad-modal {
    transition: none;
  }
}
</style>
