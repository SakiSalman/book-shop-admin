<template>
    <div>
        <label v-if="label">{{ label }} <span v-if="required" class="text-red-600">*</span></label>
        <div
            class="flex items-stretch w-full appearance-none outline-0 text-black disabled:!opacity-25 transition-all duration-300 ease-in-out border
      border-[#d1d0d0] hover:ring-1 hover:ring-orange-300 disabled:!border-zinc-500 focus:border-zinc-200 focus:bg-transparent px-1.5 py-2 text-lg rounded-lg">
            <div v-if="$slots.icon" class="flex items-center justify-center pr-2">
                <slot name="icon"></slot>
            </div>
            <div class="w-full bg-transparent h-full">
                <input :required="required" :type="isShowPassword ? 'text' : 'password'" :value="modelValue"
                    @input="handleInput" v-bind="$attrs"
                    :class="`w-full bg-transparent h-full outline-none ${inputClass}`" />
            </div>

            <div class="flex items-center justify-center pr-2">
                <i @click="handleShowPassword" class='bx bx-low-vision cursor-pointer'></i>
            </div>
        </div>
        <div v-if="message">
                <p class="text-xs text-red-500 mt-1">{{ message }}</p>
            </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

defineProps({
    label: {
        type: [String, Boolean],
        default: false,
    },
    modelValue: {
        type: String,
        default: "",
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
});

const isShowPassword = ref<boolean>(false);

const handleShowPassword = () => {
    isShowPassword.value = !isShowPassword.value;
};

const handleInput = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input) {
        emit('update:modelValue', input.value);
    }
};
</script>

<style scoped></style>
