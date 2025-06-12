<template>
  <dialog ref="modalRef" class="modal" @close="emitClose">
    <div class="modal-box shadow-xl rounded-2xl p-6">
      <h3 class="text-2xl font-semibold mb-2">{{ title }}</h3>
      <!-- Si hay contenido por default -->
      <p v-if="$slots.default == null" class="mb-4">{{ content }}</p>
      
      <!-- Slot para contenido personalizado (como formularios) -->
      <slot></slot>
    </div>
  </dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const modalRef = ref(null);

defineProps({
  title: String,
  content: String // sigue siendo opcional
});

const emit = defineEmits(['close']);

onMounted(() => {
  if (modalRef.value) {
    modalRef.value.showModal();
  }
});

function emitClose() {
  emit('close');
}
</script>
