<script setup lang="ts">
import AccordionsStyleOne from '@/components/Accordions/AccordionsStyleOne.vue';
import ButtonStyleOne from '@/components/buttons/ButtonStyleOne.vue';
import FaqWithRepeater from '@/components/Faq/FaqWithRepeater.vue';
import InputField from '@/components/Inputs/InputField.vue';
import MultiImageUploader from '@/components/Inputs/MultiImageUploader.vue';
import SelectField from '@/components/Inputs/SelectField.vue';
import TextAreaField from '@/components/Inputs/TextAreaField.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import type { ImageInterface } from '@/models/CommonModels';
import type { DataItem } from '@/models/Products/ProductsModels';
import router from '@/router';
import { ref, watch } from 'vue';
const sku = ref(0)
const discountOption = ref([
    {
        label: "Choose",
        value: "",
    },
    {
        label: "Parcentage",
        value: "parcentage",
    },
    {
        label: "Cash",
        value: "cash",
    },
]);
const questions = ref<DataItem[]>([]);
const handleBack = () => {
    console.log("first")
    router.push('/products')
}

const generateSku = () => {
    sku.value = Math.floor(Math.random() * 1e10);
}

const updateListFaq = (faqs: DataItem[]) => {
    console.log("faqs",faqs)
    questions.value = faqs
}
const updateList = (lsit: ImageInterface[]) => {
    console.log(lsit)
}
watch(questions, (newVal) => {
  console.log('Updated questions:', newVal); // Log the updated questions to the console
}, { deep: true });
</script>

<template>
    <MainLayout>
        <section class="grid grid-cols-1 gap-8 pb-10">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <h1>Add Product</h1>
                </div>
                <div>
                    <div class="flex justify-end gap-2 items-center">
                        <ButtonStyleOne label="Back to Product" :onclick="handleBack"
                            buttonClass="bg-primaryBlue border-primaryBlue">
                            <template #icon>
                                <span class="flex justify-center items-center"><i class='bx bx-arrow-back'></i></span>
                            </template>
                        </ButtonStyleOne>
                    </div>
                </div>
            </div>
            <div class="bg-white rounded-sm border border-slate-200 shadow-sm p-5 grid grid-cols-1 gap-5">
                <AccordionsStyleOne iconClass="text-primary" defaultOpen title="Product Information">
                    <template #icon>
                        <i class='bx bx-error-circle'></i>
                    </template>
                    <template #children>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                            <InputField label="Product name" placeholeder="type here.." />
                            <InputField label="Slug" placeholeder="type here.." />
                            <div class="flex items-end gap-2">
                                <InputField label="SKU" :modelValue="sku" placeholeder="type here.." />
                                <ButtonStyleOne label="Generate" :onclick="generateSku" buttonClass="py-[10px]" />
                            </div>
                            <SelectField :options="discountOption" placeholder="Choose" label="Discount Type" />
                            <InputField type="number" label="Discount Value" placeholeder="type here.." />
                            <InputField type="number" label="Number Of Pages Value" placeholeder="type here.." />
                            <InputField type="text" label="Language" placeholeder="type here.." />
                            <SelectField :options="[]" placeholder="Choose" label="Select Categories" />
                            <SelectField :options="[]" placeholder="Choose" label="Select Author" />
                            <SelectField :options="[]" placeholder="Choose" label="Select Publisher" />
                            <div class="md:col-span-3">
                                <TextAreaField label="Description" placeholeder="type here.." v-model="sku" />
                            </div>
                        </div>
                    </template>
                </AccordionsStyleOne>
                <AccordionsStyleOne iconClass="text-primary" :defaultOpen="false" title="Pricing & Stocks">
                    <template #icon>
                        <i class='bx bx-shape-circle'></i>
                    </template>
                    <template #children>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                            <InputField type="number" label="Quantity" placeholeder="type here.." />
                            <InputField type="number" label="Price" placeholeder="type here.." />
                            <SelectField :options="discountOption" placeholder="Choose" label="Tax Type
" />
                            <SelectField :options="discountOption" placeholder="Choose" label="Discount Type" />
                            <InputField type="number" label="Discount Value" placeholeder="type here.." />
                        </div>
                    </template>
                </AccordionsStyleOne>
                <AccordionsStyleOne iconClass="text-primary" :defaultOpen="false" title="Images">
                    <template #icon>
                        <i class='bx bx-images'></i>
                    </template>
                    <template #children>
                        <div>
                            <MultiImageUploader :updateList="updateList" />
                        </div>
                    </template>
                </AccordionsStyleOne>
                <AccordionsStyleOne iconClass="text-primary" :defaultOpen="false" title="Frequently Asked Questions">
                    <template #icon>
                        <i class='bx bx-question-mark'></i>
                    </template>
                    <template #children>
                        <div>
                            <FaqWithRepeater 
                            :model-value="questions"
                            :updateList="updateListFaq"
                            />
                        </div>
                    </template>
                </AccordionsStyleOne>

                <!-- submit buttons -->
                <div class="flex justify-center md:justify-end items-center">
                    <ButtonStyleOne label="Add Product" />
                </div>
            </div>
        </section>
    </MainLayout>
</template>
