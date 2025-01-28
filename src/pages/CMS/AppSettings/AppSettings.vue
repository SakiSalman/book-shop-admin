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
                                class="flex justify-center items-center bg-white shadow-sm rounded-md p-3 w-[40px] h-[40px] text-xl cursor-pointer hover:bg-slate-200"
                                @click="getAppSettingsCMS">
                                <span :class="loading ? 'animate-spin duration-700' : ''">
                                    <i title="Refresh" class="bx bx-refresh"></i>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="loading">
                <AppSettingLoadingUI />
            </div>
            <section v-else class="p-3 bg-white shadow-sm grid grid-cols-1 gap-8">
                <div class="grid grid-cols-1 gap-2">
                    <div>
                        <label for="upload" class="flex items-center cursor-pointer mb-1">
                            App Logo
                        </label>
                        <LogoUploader :updateList="updateList" :defaultImage="dataList.logo" :images="dataList.logo"
                            :isLoading="loading" />

                    </div>
                    <hr class="my-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        <RangeInput label="Desktop Logo Width" :max="150" :min="80" :step="5"
                            v-model="dataList.desktopLogoWidth" :value="dataList.desktopLogoWidth" />
                        <RangeInput label="Mobile Logo Width" :max="150" :min="80" :step="5"
                            v-model="dataList.mobileLogoWidth" :value="dataList.mobileLogoWidth" />
                        <RangeInput label="Desktop Footer Logo Width" :max="150" :min="80" :step="5"
                            v-model="dataList.desktopFooterLogoWidth" :value="dataList.desktopFooterLogoWidth" />
                        <RangeInput label="Mobile Footer Logo Width" :max="150" :min="80" :step="5"
                            v-model="dataList.mobileFooterLogoWidth" :value="dataList.mobileFooterLogoWidth" />
                    </div>
                    <hr class="my-4">
                </div>

                <div>
                    <h5 class="mb-2">Color palette</h5>
                    <div class="grid grid-cols-2 lg:grid-cols-4 gap-2">
                        <ColorPicker label="Primary Color" v-model="dataList.primaryColor" />
                        <ColorPicker label="Secondary Color" v-model="dataList.secondaryColor" />
                        <ColorPicker label="Text Color" v-model="dataList.textColor" />
                        <ColorPicker label="Gray Color" v-model="dataList.grayBg" />
                    </div>
                </div>
                <div>
                    <ButtonStyleOne type="submit" :label="loading ? 'Updating' : 'Save'" :disabled="loading"
                        :onclick="handleSaveSettings">
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
import RangeInput from '@/components/Inputs/RangeInput.vue';
import AppSettingLoadingUI from '@/components/LoadingUI/AppSettingLoadingUI.vue';
const { fetchData, api, createData, loading } = useApi()
const { error, warning, success } = useToast()
// variables
let dataList = reactive<AppSettingsModel>({
    logo: '/images/default.webp',
    primaryColor: '#b8070a',
    textColor: '#050505',
    desktopLogoWidth: 150,
    mobileLogoWidth: 80,
    desktopFooterLogoWidth: 150,
    mobileFooterLogoWidth: 80,
    secondaryColor: '#050402',
    grayBg: '#f1f2f4',
});
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
            const updatedData = res?.data as AppSettingsModel;

            if (updatedData) {
                dataList.logo = updatedData?.logo || dataList?.logo;
                dataList.primaryColor = updatedData?.primaryColor || dataList?.primaryColor;
                dataList.secondaryColor = updatedData?.secondaryColor || dataList?.secondaryColor;
                dataList.grayBg = updatedData?.grayBg || dataList?.grayBg;
                dataList.textColor = updatedData?.textColor || dataList?.textColor;
                dataList.desktopLogoWidth = updatedData?.desktopLogoWidth || dataList?.desktopLogoWidth;
                dataList.mobileLogoWidth = updatedData?.mobileLogoWidth || dataList?.mobileLogoWidth;
                dataList.desktopFooterLogoWidth = updatedData?.desktopFooterLogoWidth || dataList?.desktopFooterLogoWidth;
                dataList.mobileFooterLogoWidth = updatedData?.mobileFooterLogoWidth || dataList?.mobileFooterLogoWidth;
            }

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
            dataList = res?.data?.data
            success(res.message)
            getAppSettingsCMS()
        } else {
            warning(res.message)
        }
    } catch (err: any) {
        error(err.message)
    }
}
</script>
