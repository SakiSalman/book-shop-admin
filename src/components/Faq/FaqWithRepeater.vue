<template>
    <div>
        <ButtonStyleOne label="Add New" buttonClass="ml-auto mr-3" :onclick="addNewItem" />
        <div class="grid grid-cols-1 gap-3" v-for="(item, index) in dataList" :key="index">
            <div class="py-3 border-b border-gray-300">
                <div class="flex items-center gap-3">
                    <div class="w-full">
                        <InputField type="text" v-model="item.question" placeholder="Question" label="Question" />
                    </div>
                    <button @click="removeItem(index)" class="text-red-600 mt-6 text-xl">X</button>
                </div>
                <TextAreaField label="Answer" placeholder="Type here.." v-model="item.answer" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue';
import InputField from '../Inputs/InputField.vue';
import TextAreaField from '../Inputs/TextAreaField.vue';
import ButtonStyleOne from '../buttons/ButtonStyleOne.vue';
import type { DataItem } from '@/models/Products/ProductsModels';

const props = defineProps<{
    modelValue: DataItem[];
    updateList: (updatefaq: DataItem[]) => void; // Correct function name
}>();

const emit = defineEmits<{
    (event: 'update:modelValue', newVal: DataItem[]): void;
}>();

const dataList = reactive<DataItem[]>([...props.modelValue]);

watch(() => dataList, (newVal) => {
    emit('update:modelValue', newVal);
}, { deep: true });

const addNewItem = () => {
    const newItem: DataItem = {
        id: dataList.length + 1,
        question: "New question",
        answer: "New answer",
    };
    dataList.push(newItem);
    props.updateList(dataList);
};

const removeItem = (index: number) => {
    dataList.splice(index, 1);
    props.updateList(dataList);
};
</script>

<style></style>