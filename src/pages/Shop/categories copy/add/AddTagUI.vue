<script setup lang="ts">
import ButtonStyleOne from '@/components/buttons/ButtonStyleOne.vue';
import InputField from '@/components/Inputs/InputField.vue';
import { useApi } from '@/composables';
import useToast from '@/composables/utils/useToast';
import MainLayout from '@/layouts/MainLayout.vue';
import type { Field } from '@/models/CommonModels';
import type { TagItemModel } from '@/models/Products/TagModels';
import router from '@/router';
import { reactive } from 'vue';
const { api, loading, handleSubmit } = useApi()
const { success, warning, error } = useToast()
const appURL = api.shop.tags

const requiredFields: Field[] = [
    {
        key: "name",
        value: 'name'
    }
]
let dataList = reactive<TagItemModel>({
    name: ''
});

const handleBack = () => {
    router.push('/shop/tags')
}
const handleSubmitData = async () => {
    try {
        const res = await handleSubmit({
            isFormData: false,
            payload: dataList,
            requiredFields: requiredFields,
            url: appURL,
        });
        if (res?.status === 201) {
            Object.assign(dataList, {
                name: ''
            })
            success(res?.data?.message);
        } else {
            warning(res?.message || res?.data?.message);
        }
    } catch (err: any) {
        error(err?.response?.data?.message);
    }
};

</script>

<template>
    <MainLayout>
        <section class="grid grid-cols-1 gap-8 pb-10">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <h1>Add Categories</h1>
                </div>
                <div>
                    <div class="flex justify-end gap-2 items-center">
                        <ButtonStyleOne label="Back to Categories" :onclick="handleBack"
                            buttonClass="bg-primaryBlue border-primaryBlue">
                            <template #icon>
                                <span class="flex justify-center items-center"><i class='bx bx-arrow-back'></i></span>
                            </template>
                        </ButtonStyleOne>
                    </div>
                </div>
            </div>
            <div class="bg-white rounded-sm border border-slate-200 shadow-sm p-5 grid grid-cols-1 gap-5">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                    <InputField label="Name" placeholder="Type here..." required v-model="dataList.name" />
                </div>
                <!-- submit buttons -->
                <div class="flex justify-center md:justify-end items-center">
                    <ButtonStyleOne :isLoading="loading as boolean" label="Add Tag" :onclick="handleSubmitData" />
                </div>
            </div>
        </section>
    </MainLayout>
</template>
