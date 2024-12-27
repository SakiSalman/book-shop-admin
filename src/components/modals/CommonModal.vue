<template>
    <div 
    class="w-screen h-screen bg-[#000000b6] fixed z-[999999999999999999] top-0 right-0 left-0 bottom-0 p-2 md:p-10 flex justify-center items-center"
    >
        <div
        class="bg-white p-3 md:p-5 rounded-md relative"
        :class="modalWidth"
        >
        <span @click="onClose" class="w-[35px] h-[35px] border border-gray-400 bg-white p-2 text-2xl flex justify-center items-center rounded-full absolute right-6 md:right-8 top-4 cursor-pointer hover:bg-red-500 hover:text-white duration-700 transition-all"><i class='bx bx-x'></i></span>
           <div class="pt-10 min-h-[100px] max-h-[550px] overflow-x-hidden overflow-y-auto ">
            <slot name="children"/>
           </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';


const props = defineProps({
    modalWidth : {
        type : String,
        default: "w-full md:w-[700px]"
    },
    modalWrapClass : {
        type : String,
        default : ""
    },
    onClose : {
        type: Function as PropType<() => void>,
        required: true
    },
})
</script>