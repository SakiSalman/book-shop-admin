<template>
    <div>
      <label class="text-sm font-semibold" v-if="label">
        {{ label }}
        <span v-if="required" class="text-red-600">*</span>
      </label>
      <div
        :class="`flex flex-col w-full appearance-none outline-0 text-black disabled:!opacity-25 transition-all duration-300 ease-in-out border
        border-[#d1d0d0] hover:ring-1 hover:ring-primary disabled:!border-zinc-500 focus:border-zinc-200 focus:bg-transparent text-lg rounded-lg px-1.5 py-2 ${wrapperClass}`"
      >
        <!-- Textarea Field -->
        <textarea
          :placeholder="placeholder"
          :required="required"
          v-model="internalValue"
          v-bind="$attrs"
          :rows="rows"
          :class="`w-full bg-transparent h-full outline-none resize-none placeholder ${textareaClass}`"
        ></textarea>
      </div>
      <div v-if="message">
        <p class="text-xs text-red-500 mt-1">{{ message }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, defineProps, defineEmits } from "vue";
  
  // Props
  const props = defineProps({
    label: {
      type: [String, Boolean],
      default: false,
    },
    modelValue: {
      type: [String, null],
      default: "",
    },
    placeholder: {
      type: String,
      default: "Type here...",
    },
    rows: {
      type: Number,
      default: 4,
    },
    textareaClass: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    message: {
      type: [String, Boolean],
      default: null,
    },
    wrapperClass: {
      type: String,
      default: "",
    },
  });
  
  // Emits
  const emit = defineEmits(["update:modelValue"]);
  
  // Internal state
  const internalValue = ref(props.modelValue);
  
  // Watch for external modelValue changes
  watch(
    () => props.modelValue,
    (newValue) => {
      if (newValue !== internalValue.value) {
        internalValue.value = newValue;
      }
    }
  );
  
  // Update the parent component when internal value changes
  watch(internalValue, (newValue) => {
    emit("update:modelValue", newValue);
  });
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  