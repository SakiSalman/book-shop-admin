<template>
    <MainLayout>
        <section class="grid grid-cols-1 gap-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <h1>Header Footer CMS</h1>
                    <p>Customize Your Header and Footer</p>
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
                <CmsLoadingUI />
            </div>
            <section v-else class="p-3 bg-white shadow-sm grid grid-cols-1 gap-8">
                <div class="grid grid-cols-1 gap-2">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
                        <InputField label="Search Input Placeholder" placeholeder="type here.."
                            v-model="dataList.searchPlaceholder" />
                        <InputField label="Search Button Text" placeholeder="type here.."
                            v-model="dataList.searchButtonText" />
                    </div>
                    <hr class="my-4">
                </div>

                <div>
                    <h5 class="mb-2">Color palette</h5>
                    <div class="grid grid-cols-2 lg:grid-cols-4 gap-2">
                        <ColorPicker label="Header Background Color" v-model="dataList.headerBgColor" />
                        <ColorPicker label="Footer Background Color" v-model="dataList.footerBgColor" />
                    </div>
                </div>
                <div>
                    <TextAreaField label="Copyright Text" placeholeder="type here.."
                        v-model="dataList.copyrightText" />
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
import MainLayout from '@/layouts/MainLayout.vue';
import { onMounted, reactive, ref } from 'vue';
import { useApi } from '@/composables';
import useToast from '@/composables/utils/useToast';
import AppSettingLoadingUI from '@/components/LoadingUI/AppSettingLoadingUI.vue';
import InputField from '@/components/Inputs/InputField.vue';
import type { HeaderFooterModel } from '@/models/CMS/HeaderFooterCMS';
import TextAreaField from '@/components/Inputs/TextAreaField.vue';
import CmsLoadingUI from '@/components/LoadingUI/CmsLoadingUI.vue';
const { fetchData, api, createData, loading } = useApi()
const { error, warning, success } = useToast()
// variables
let dataList = reactive<HeaderFooterModel>({
    searchPlaceholder: null,
    searchButtonText: null,
    headerBgColor: null,
    footerBgColor: null,
    copyrightText: null,
});

onMounted(() => {
    getAppSettingsCMS()
})

const getAppSettingsCMS = async () => {
    try {
        const res: any = await fetchData(api.CMS.headerFooterCMS);
        if (res?.statusCode === 200) {
            const updatedData = res?.data?.[0] as HeaderFooterModel;

            if (updatedData) {
                dataList.searchPlaceholder = updatedData?.searchPlaceholder || dataList.searchPlaceholder
                dataList.searchButtonText = updatedData?.searchButtonText || dataList?.searchButtonText
                dataList.headerBgColor = updatedData?.headerBgColor || dataList?.headerBgColor
                dataList.footerBgColor = updatedData?.footerBgColor || dataList?.footerBgColor
                dataList.copyrightText = updatedData?.copyrightText || dataList?.copyrightText
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
            url: api.CMS.headerFooterCMS,
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
