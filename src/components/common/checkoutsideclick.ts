import { ref, onMounted, onUnmounted } from 'vue';

export function useClickOutside<T extends HTMLElement>(onClickOutside: () => void) {
  const elementRef: any = ref(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (elementRef.value && !elementRef.value.contains(event.target as Node)) {
      onClickOutside();
    }
  };

  onMounted(() => {
    document.addEventListener('click', handleClickOutside, true);
  });

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside, true);
  });

  return { elementRef };
}
