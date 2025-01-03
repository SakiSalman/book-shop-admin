<template>
    <MainLayout>
        <section class="grid grid-cols-1 gap-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <h1>App Settings</h1>
                    <p>Customize Your App</p>
                </div>
                <div>
                    <div class="flex flex-col md:flex-row justify-end gap-2 items-center">
                        <div class="flex items-center gap-2">
                            <button
                                class="flex justify-center items-center bg-white shadow-sm rounded-md p-3 w-[40px] h-[40px] text-xl cursor-pointer hover:bg-slate-200">
                                <span>
                                    <i title="Refresh" class="bx bx-refresh"></i>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <section class="p-3 bg-white shadow-sm grid grid-cols-1 gap-8">
                <div class="grid grid-cols-1 gap-2">
                    <div>
                        <label for="upload" class="flex items-center cursor-pointer mb-1">
                            App Logo
                        </label>
                       <LogoUploader :updateList="updateList" :defaultImage="dataList.logo" :images="dataList.logo" :isLoading="loading"/>

                    </div>
                    <hr class="my-4">

                </div>

                <div>
                    <h5 class="mb-2">Color palette</h5>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <ColorPicker label="Primary Color" :modelValue="dataList.primaryColor" />
                        <ColorPicker label="Secondary Color" :modelValue="dataList.secondaryColor" />
                        <ColorPicker label="Gray Color" v-model="dataList.grayBg" />
                    </div>
                </div>
                <div>
                    <ButtonStyleOne type="submit" :label="loading ? 'Updating' : 'Save'" :disabled="loading" :onclick="handleSaveSettings">
                    </ButtonStyleOne>
                </div>
            </section>
        </section>
    </MainLayout>
</template>

<script setup lang="ts">
import ButtonStyleOne from '@/components/buttons/ButtonStyleOne.vue';
import ColorPicker from '@/components/Inputs/ColorPicker.vue';
import LogoUploader from '@/components/Inputs/LogoUploader.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import type { AppSettingsModel } from '@/models/CMS/AppSettingsModel';
import { onMounted, reactive, ref } from 'vue';
import { useApi } from '@/composables';
import useToast from '@/composables/utils/useToast';
const { fetchData, api, createData } = useApi()
const { error, warning, success } = useToast()
// variables
let dataList = reactive<AppSettingsModel>({
    logo: '/images/products/expire-product-01.2a163a06.png',
    primaryColor: '#b8070a',
    secondaryColor: '#050402',
    grayBg: '#f1f2f4',
});
const { loading } = useApi()

const updateList = (list: string | File | null | undefined) => {
    dataList = {
        ...dataList,
        logo: list
    }
}

onMounted(() => {
    getAppSettingsCMS()
})

const getAppSettingsCMS = async () => {
    try {
        const res: any = await fetchData(api.CMS.appSettings);
        if (res?.statusCode === 200) {
            const updatedData = res.data as AppSettingsModel;
            dataList.logo = updatedData.logo || dataList.logo;
            dataList.primaryColor = updatedData.primaryColor || dataList.primaryColor;
            dataList.secondaryColor = updatedData.secondaryColor || dataList.secondaryColor;
            dataList.grayBg = updatedData.grayBg || dataList.grayBg;
        } else {
            error(res?.message);
        }
    } catch (err: any) {
        error(err.message);
    }
};


const handleSaveSettings = async () => {
    try {
        const res = await createData({
            payload: dataList,
            url: api.CMS.appSettings,
            isFormData: true
        })

        if (res.status === 201) {
            dataList = res?.data
            success(res.message)
        } else {
            warning(res.message)
        }
    } catch (err: any) {
        error(err.message)
    }
}
</script>
