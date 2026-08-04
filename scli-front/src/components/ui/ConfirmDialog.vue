<script setup lang="ts">
import Modal from './Modal.vue'
import type { Tono } from '@/types/ui'

withDefaults(
  defineProps<{
    abierto: boolean
    titulo: string
    mensaje: string
    tono?: Tono
    textoConfirmar?: string
    textoCancelar?: string
    procesando?: boolean
  }>(),
  {
    tono: 'danger',
    textoConfirmar: 'Confirmar',
    textoCancelar: 'Cancelar',
    procesando: false,
  },
)

const emit = defineEmits<{
  confirmar: []
  cancelar: []
}>()
</script>

<template>
  <Modal :abierto="abierto" :titulo="titulo" ancho="sm" @cerrar="emit('cancelar')">
    <p class="acad-confirm__mensaje">{{ mensaje }}</p>

    <template #acciones>
      <button
        type="button"
        class="acad-btn acad-btn--ghost"
        :disabled="procesando"
        @click="emit('cancelar')"
      >
        {{ textoCancelar }}
      </button>
      <button
        type="button"
        class="acad-btn"
        :class="`acad-btn--${tono}`"
        :disabled="procesando"
        @click="emit('confirmar')"
      >
        {{ procesando ? 'Procesando...' : textoConfirmar }}
      </button>
    </template>
  </Modal>
</template>

<style scoped>
.acad-confirm__mensaje {
  margin: 0;
  color: var(--acad-text-secondary);
  line-height: 1.5;
}
</style>
