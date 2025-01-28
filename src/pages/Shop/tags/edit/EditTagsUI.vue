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
import type { TagItemModel } from '@/models/Products/TagModels';
import router from '@/router';
import { onMounted, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
const { fetchData, api, loading, handleUpdate } = useApi()
const { success, warning, error } = useToast()
const route = useRoute()
const apiURL = api.shop.tags+'/'+ route.params.id as string
const requiredFields: Field[] = [
    {
        key: "name",
        value: 'name'
    }
]
let dataList = reactive<TagItemModel>({
    name: '',
});

const formData = ref<TagItemModel[]>([]);
const handleBack = () => {
    router.push('/shop/tags')
}

const getTagDetails = async () => {
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
        getTagDetails();
    }else{
        router.push('/shop/tags')
    }
})

</script>

<template>
    <MainLayout>
        <section class="grid grid-cols-1 gap-8 pb-10">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <h1>Edit Tag</h1>
                </div>
                <div>
                    <div class="flex justify-end gap-2 items-center">
                        <ButtonStyleOne label="Back to Tags" :onclick="handleBack"
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
                        </div>
                <!-- submit buttons -->
                <div class="flex justify-center md:justify-end items-center">
                    <ButtonStyleOne :isLoading="loading as boolean" label="Update Tag" :onclick="handleSubmitData" />
                </div>
            </div>
        </section>
    </MainLayout>
</template>
