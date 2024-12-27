<template>
  <div>
    <label class="text-sm font-semibold" v-if="label">{{ label }} <span v-if="required"
        class="text-red-600">*</span></label>
    <div
      :class="`flex items-stretch w-full appearance-none outline-0 text-black disabled:!opacity-25 transition-all duration-300 ease-in-out border
      border-[#d1d0d0] hover:ring-1 hover:ring-orange-300 disabled:!border-zinc-500 focus:border-zinc-200 focus:bg-transparent text-lg rounded-lg px-1.5 py-2 ${wrapperClass}`">
      <!-- Icon Slot -->
      <div v-if="$slots.icon" class="flex items-center justify-center pr-2">
        <slot name="icon"></slot>
      </div>
      <!-- Input Field -->
      <div class="w-full bg-transparent h-full">
        <input :placeholder="placeholder" :required="required" :type="type" :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)" v-bind="$attrs"
          :class="`w-full bg-transparent h-full outline-none placeholder ${inputClass}`" />
      </div>
      
    </div>
    <div v-if="message">
        <p class="text-xs text-red-500 mt-1">{{ message }}</p>
      </div>
  </div>
</template>

<script setup>

defineProps({
  label: {
    type: [String, Boolean],
    default: false,
  },
  modelValue: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "Type here...",
  },
  type: {
    type: String,
    default: 'text',
  },
  inputClass: {
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
</script>

<style scoped></style>
