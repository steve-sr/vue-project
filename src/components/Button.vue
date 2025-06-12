<template>
  <button
    class="btn btn-circle bg-primary text-white shadow-lg hover:bg-primary-focus fixed"
    :class="position"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  position: {
    type: String,
    required: true,
  },
});
defineEmits(["click"]);
</script>
