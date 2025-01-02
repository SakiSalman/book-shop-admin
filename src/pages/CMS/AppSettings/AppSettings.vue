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
            <section class="p-3 bg-white shadow-sm">
                <div class="grid grid-cols-1 gap-2">
                    <div>
                        <label for="upload" class="flex items-center cursor-pointer mb-1">
                            App Logo
                        </label>
                        <LogoUploader 
                            :updateList="updateList" 
                            :defaultImage="dataList.logo" 
                        />
                    </div>

                </div>

                <hr class="my-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <InputField labe></InputField>
                </div>
            </section>
        </section>
    </MainLayout>
</template>

<script setup lang="ts">
import InputField from '@/components/Inputs/InputField.vue';
import LogoUploader from '@/components/Inputs/LogoUploader.vue';
import MultiImageUploader from '@/components/Inputs/MultiImageUploader.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import type { AppSettingsModel } from '@/models/CMS/AppSettingsModel';
import type { ImageInterface } from '@/models/CommonModels';
import { goRoute } from '@/utils/commonUtils';
import { onMounted, ref } from 'vue';
const initialData: AppSettingsModel = {
    logo: '/images/products/expire-product-01.2a163a06.png'
}
const dataList = ref(initialData)
const updateList = (list: String | File | null) => {
    console.log(list)
}


onMounted(() => {

})

// const getAppSettingsCMS = async () => {
//     const res = await
// }
</script>
