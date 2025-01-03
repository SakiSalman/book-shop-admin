<template>
    <div>
      <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
      <div class="w-full h-11 p-2 rounded-md overflow-hidden flex items-center border mt-1">
        <div class="flex h-full relative">
          <input
            :id="id"
            type="color"
            class="h-full w-12 border-none cursor-pointer"
            v-model="internalColor"
            @input="updateColor"
          />
        </div>
        <div class="w-full h-full">
          <input
            type="text"
            class="w-full h-full bg-white outline-none px-2"
            :value="internalColor"
            @input="onTextInput"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, defineEmits, defineProps } from 'vue';
  
  // Props
  const props = defineProps({
    modelValue: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: 'color-picker',
    },
  });
  
  // Emits
  const emit = defineEmits(['update:modelValue']);
  
  // Internal state
  const internalColor = ref(props.modelValue);
  
  // Watch for external modelValue changes
  watch(
    () => props.modelValue,
    (newValue) => {
      if (newValue !== internalColor.value) {
        internalColor.value = newValue;
      }
    }
  );
  
  // Update the parent component on color change
  const updateColor = () => {
    emit('update:modelValue', internalColor.value);
  };
  
  // Handle manual text input
  const onTextInput = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (/^#[0-9A-Fa-f]{6}$/.test(input.value)) {
      internalColor.value = input.value;
      updateColor();
    }
  };
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  