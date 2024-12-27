<template>
    <div class="w-full">
      <label v-if="label" :for="id" class="block mb-2 text-sm font-medium text-gray-700">
        {{ label }}
      </label>
      <select
        :id="id"
        :value="modelValue"
        @change="$emit('update:modelValue', $event.target.value)"
        :class="[
          'block w-full p-2 border rounded-md shadow-sm outline-none',
          error ? 'border-red-500' : 'border-gray-300',
          disabled ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'
        ]"
        :disabled="disabled"
      >
        <option v-if="placeholder" disabled value="">{{ placeholder }}</option>
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
      <p v-if="error" class="mt-1 text-sm text-red-500">{{ error }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BaseSelect',
    props: {
      modelValue: {
        type: [String, Number],
        default: '',
      },
      options: {
        type: Array,
        required: true,
        validator(value) {
          return value.every(
            (option) =>
              typeof option.label === 'string' && typeof option.value === 'string'
          );
        },
      },
      label: {
        type: String,
        default: '',
      },
      placeholder: {
        type: String,
        default: '',
      },
      error: {
        type: String,
        default: '',
      },
      id: {
        type: String,
        default: '',
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  