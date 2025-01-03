<template>
    <div class="flex flex-col items-start w-full">
      <label v-if="label" :for="id" class="mb-2 text-sm font-medium text-gray-700">
        {{ label }}
      </label>
      <div class="relative w-full">
        <input
          :id="id"
          type="range"
          :min="min"
          :max="max"
          :step="step"
          v-model="currentValue"
          @input="handleInput"
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        />
        <div
          class="absolute top-1/2 left-0 h-2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg"
          :style="{ width: `${percentage}%` }"
        ></div>
      </div>
      <div class="flex justify-between w-full mt-2 text-xs text-gray-500">
        <span>{{ min }}</span>
        <span>{{ currentValue }}px</span>
        <span>{{ max }}</span>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watch, defineProps, defineEmits } from "vue";
  
  // Define props
  const props = defineProps({
    modelValue: {
    type: Number,
    default: 0,
  },
    id: {
      type: String,
      default: () => `range-input-${Math.random().toString(36).substring(2, 9)}`,
    },
    label: {
      type: String,
      default: "",
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    step: {
      type: Number,
      default: 1,
    },
    value: {
      type: Number,
      default: 0,
    },
    onChange: {
      type: Function,
      default: null,
    },
  });
  
const emit = defineEmits(["update:modelValue"]);

const currentValue = ref<number>(props.modelValue);
  
  // Computed property for percentage
  const percentage = computed(() => {
    return ((currentValue.value - props.min) / (props.max - props.min)) * 100;
  });
  
  // Watch for external value changes
  watch(
  () => props.modelValue,
  (newValue) => {
    currentValue.value = newValue;
  }
);
  
  // Handle input event
  const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const newValue = Number(target.value);
  currentValue.value = newValue;

  emit("update:modelValue", newValue);

  if (props.onChange) props.onChange(newValue);
};
  </script>
  
  <style scoped>
  /* Adjust the range input thumb styling for a better UI */
  input[type="range"]::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    background: #2563eb; /* Tailwind's blue-600 */
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
    transition: transform 0.2s;
  }
  
  input[type="range"]::-webkit-slider-thumb:hover {
    transform: scale(1.2);
  }
  
  input[type="range"]::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: #2563eb;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
    transition: transform 0.2s;
  }
  
  input[type="range"]::-moz-range-thumb:hover {
    transform: scale(1.2);
  }
  </style>
  