<template>
    <div class="grid grid-cols-1" :class="wrapperClass">
        <div class="grid grid-cols-1 gap-3 p-3 rounded-md" :class="active ? titleWrapActiveClass : 'bg-primarySlate'">
            <div class="flex justify-between items-center gap-3 cursor-pointer" @click="handleActive">
                <div class="flex items-center gap-2 text-base font-semibold" :class="titleWrapClass, active ? titleWrapActiveClass : ''">
                    <span class="flex justify-center items-center" :class="iconClass"><slot name="icon" /></span>
                    <span :class="titleCLass">{{ title }}</span>
                </div>
                <div>
                    <div
                        v-if="active"
                        class="w-[25px] h-[25px] rounded-full border border-gray-500 flex justify-center items-center cursor-pointer transition-all duration-300"
                    >
                        <i class="bx bx-chevron-up"></i>
                    </div>
                    <div
                        v-else
                        class="w-[25px] h-[25px] rounded-full border border-gray-500 flex justify-center items-center cursor-pointer transition-all duration-300"
                    >
                        <i class="bx bx-chevron-down"></i>
                    </div>
                </div>
            </div>
            <div class="h-[1px] w-full bg-primarySlate"></div>
        </div>
        <div
            ref="content"
            :style="{ maxHeight: active ? `${contentHeight <= 400 ? 400 : contentHeight}px` : '0' }"
            class="overflow-hidden overflow-y-auto transition-all duration-300 ease-in-out]"
        >
            <div ref="slotContent" class="mt-3">
                <slot name="children" />
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
    wrapperClass: {
        type: String,
        default: ''
    },
    titleWrapClass: {
        type: String,
        default: ''
    },
    titleWrapActiveClass: {
        type: String,
        default: ''
    },
    iconClass: {
        type: String,
        default: ''
    },
    titleCLass: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: 'Title here'
    },
    defaultOpen: {
        type: Boolean,
        default: false
    }
});

const active = ref(props.defaultOpen);
const content = ref<HTMLElement | null>(null);
const slotContent = ref<HTMLElement | null>(null);
const contentHeight = ref(0);

const handleActive = () => {
    active.value = !active.value;
};

const updateContentHeight = () => {
    if (slotContent.value) {
        contentHeight.value = slotContent.value.offsetHeight + 20;
    }
};

onMounted(() => {
    updateContentHeight();
});

// Watch for changes to active state to update height
watch(active, (newVal) => {
    if (newVal) {
        updateContentHeight();
    }
});
</script>

