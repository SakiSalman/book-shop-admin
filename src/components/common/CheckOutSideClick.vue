<template>
  <div
    ref="elementRef"
    class=""
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
const props = defineProps({
  onClickOutside: {
    type: Function,
    required: true,
  },
});

const elementRef: any = ref(null);

const handleClickOutside = (event: MouseEvent) => {
  if (elementRef.value && !elementRef.value.contains(event.target as Node)) {
    props.onClickOutside();
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside, true);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside, true);
});

</script>