<script setup lang="ts">
import ButtonStyleOne from '@/components/buttons/ButtonStyleOne.vue';
import InputField from '@/components/Inputs/InputField.vue';
import LogoUploader from '@/components/Inputs/LogoUploader.vue';
import SelectField from '@/components/Inputs/SelectField.vue';
import TextAreaField from '@/components/Inputs/TextAreaField.vue';
import { useApi } from '@/composables';
import useToast from '@/composables/utils/useToast';
import MainLayout from '@/layouts/MainLayout.vue';
import type { Field } from '@/models/CommonModels';
import type { CategoryItemModel } from '@/models/Products/CategoryModels';
import router from '@/router';
import { onMounted, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
const { fetchData, api, loading, handleUpdate } = useApi()
const { success, warning, error } = useToast()
const route = useRoute()
const apiURL = api.shop.categories+'/'+ route.params.id as string
const requiredFields: Field[] = [
    {
        key: "name",
        value: 'name'
    }
]
let dataList = reactive<CategoryItemModel>({
    name: '',
    description: "",
    icon: null,
    parentCategory: null
});

const formData = ref<CategoryItemModel[]>([]);
const handleBack = () => {
    router.push('/shop/categories')
}
const updateList = (list: string | File | null | undefined) => {
    dataList = {
        ...dataList,
        icon: list
    }
}

const getCategoryDetails = async () => {
    try {
        const res: any = await fetchData(apiURL);
        if (res?.data?._id) {
            Object.assign(dataList, res.data)
        }
    } catch (error) {
        console.log("no data found!")
    }
}
const handleSubmitData = async () => {
    try {
        const res = await handleUpdate({
            isFormData: true,
            payload: dataList,
            requiredFields: requiredFields,
            url: apiURL
        });
        if (res?.status === 200) {
            dataList = res?.data?.data;
            success(res?.data?.message);
        } else {
            warning(res?.message || res?.data?.message);
        }
    } catch (err: any) {
        error(err.message);
    }
};

onMounted(() => {
    if (route?.params?.id as string) {
    getCategoryDetails();
    }else{
        router.push('/shop/categories')
    }
})

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
                            <InputField label="Name" placeholder="Type here..." required
                                v-model="dataList.name"/>
                            <InputField label="Slug" placeholder="Type here..."
                                v-model="dataList.slug" :disable="true"/>
                            <div class="md:col-span-3">
                                <TextAreaField label="Description" placeholeder="type here.."
                                    v-model="dataList.description" />
                            </div>
                            <div class="md:col-span-3">
                                <label for="upload" class="flex items-center cursor-pointer mb-1">
                                    App Logo
                                </label>
                                <LogoUploader :updateList="updateList" :defaultImage="dataList.icon"
                                    :images="dataList.icon" :isLoading="false" />

                            </div>

                            <SelectField :options="formData" placeholder="Choose" label="Parent Categories" val
                                v-model="dataList.parentCategory" />

                        </div>
                <!-- submit buttons -->
                <div class="flex justify-center md:justify-end items-center">
                    <ButtonStyleOne :isLoading="loading as boolean" label="Update Category" :onclick="handleSubmitData" />
                </div>
            </div>
        </section>
    </MainLayout>
</template>
