<template>
    <button
        :type="type"
        @click="onclick && onclick()"
        :disabled="disabled"
        :class="`flex items-center justify-center bg-[#ff9f43] border border-[#ff9f43] text-white hover:border-[#ff9f43] hover:bg-[#ffffff] hover:text-[#ff9f43] active:bg-[#ff9f43] active:border-[#ff9f43] px-6 py-2 text-base rounded-md transition-all duration-700 ease-in-out font-semibold ${buttonClass}`"
    >
        <span v-if="$slots.icon" class="flex items-center justify-center pr-2">
            <slot name="icon"></slot>
        </span>
        <span>{{ label }}</span>
    </button>
</template>

<script setup lang="ts">
const props = defineProps({
    label: {
        type: [String, Boolean],
        default: false,
    },
    type: {
        type: String as () => "button" | "submit" | "reset",
        default: "button",
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    isLoading: {
        type: Boolean,
        default: false,
    },
    buttonClass: {
        type: String,
        default: "",
    },
    onclick: {
        type: Function,
        default: null,
    },
});
</script>
