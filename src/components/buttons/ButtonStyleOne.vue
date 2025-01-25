<template>
    <button :type="type" @click="onclick && onclick()" :disabled="disabled"
        :class="`flex items-center justify-center bg-primary border border-primary text-white hover:border-primary hover:bg-[#ffffff] hover:text-[#ff9f43] active:bg-primary active:border-primary px-6 py-2 text-base rounded-md transition-all duration-700 ease-in-out font-semibold ${buttonClass}`">
        <span v-if="$slots.icon" class="flex items-center justify-center pr-2">
            <slot name="icon"></slot>
        </span>
        <span>
            <template v-if="isLoading">
                <PulseLoader />
            </template>
            <template v-else>
                {{ label }}
            </template>
        </span>
    </button>
</template>

<script setup lang="ts">
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

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
