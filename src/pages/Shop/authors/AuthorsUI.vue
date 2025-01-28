<script setup lang="ts">
import ButtonStyleOne from "@/components/buttons/ButtonStyleOne.vue";
import { useApi } from "@/composables";
import useToast from "@/composables/utils/useToast";
import MainLayout from "@/layouts/MainLayout.vue";
import type { CategoryItemModel } from "@/models/Products/CategoryModels";
import { goRoute } from "@/utils/commonUtils";
import { onMounted, ref } from "vue";
const { fetchData, api, deleteData } = useApi()
const { success, warning } = useToast()

const dataList = ref<CategoryItemModel[]>([])
const handleDelete = async (id: string) => {
    try {
        let res: any = await deleteData(`${api.shop.authors}/${id}`)
        if (res?.statusCode === 200) {
            success(res?.data?.message)
            getAllauthors()
        }
    } catch (error) {
        console.log("no data found!")
    }
}
const getAllauthors = async () => {
    try {
        const res: any = await fetchData(api.shop.authors);
        if (res?.data) {
            dataList.value = res.data
        }
    } catch (error) {
        console.log("no data found!")
    }
}
onMounted(async () => {
    await getAllauthors()
})

</script>

<template>
    <MainLayout>
        <section class="grid grid-cols-1 gap-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <h1>Author List</h1>
                    <p>Manage your authors</p>
                </div>
                <div>
                    <div class="flex flex-col md:flex-row justify-end gap-2 items-center">
                        <div class="flex justify-between items-center gap-5">
                            <ButtonStyleOne :onclick="() => goRoute('/shop/authors/add')" label="Add New">
                                <template #icon>
                                    <span><i class="bx bx-plus-circle"></i></span>
                                </template>
                            </ButtonStyleOne>
                        </div>
                    </div>
                </div>
            </div>

            <!-- product table start-->

            <div class="p-3 bg-white ">
                <div class="w-full overflow-x-auto">
                    <table class="table-auto w-full border-separate border-spacing-y-3 text-left">
                        <thead class="bg-gray-100">
                            <tr class="pl-4 border-t border-b border-l rounded-l-lg">
                                <th class="p-2 py-4">
                                    <label class="flex items-center cursor-pointer">
                                        <input type="checkbox"
                                            class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded border border-slate-300 checked:bg-teal-800 checked:border-teal-800" />
                                        <span
                                            class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 peer-checked:left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                            <i class="bx bx-check text-white"></i>
                                        </span>
                                    </label>
                                </th>
                                <th class="p-2 whitespace-nowrap py-4">
                                    <div class="flex justify-between items-center">
                                        <span>Authors</span>
                                    </div>
                                </th>
                                <th class="p-2 whitespace-nowrap py-4">
                                    <div class="flex justify-between items-center">
                                        <span> Name
                                        </span>
                                    </div>
                                </th>
                                <th class="p-2 whitespace-nowrap py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody v-if="dataList.length == 0">
                            <tr>
                                <td class="px-2 py-2" colspan="4">
                                    <p class="text-center">No Data Found!</p>
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-else v-for="(item, index) in dataList" :key="index">
                            <tr>
                                <td class="border-t border-b px-2 py-2">
                                    <label class="flex  cursor-pointer">
                                        <input type="checkbox"
                                            class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded border border-slate-300 checked:bg-teal-800 checked:border-teal-800" />
                                        <span
                                            class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 peer-checked:left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                            <i class="bx bx-check text-white"></i>
                                        </span>
                                    </label>
                                </td>
                                <td class="border-t border-b px-4 py-2 whitespace-nowrap">
                                    <div class="flex items-center gap-3">
                                        <img src="/images/default.webp" alt=""
                                            class="w-16 h-16 object-cover" />
                                    </div>
                                </td>
                                <td class="border-t border-b px-4 py-2 whitespace-nowrap text-xs md:text-sm">
                                    {{ item?.name }}
                                </td>
                                <td class="border-t border-b px-4 py-2 whitespace-nowrap text-end">
                                    <div class="flex items-center justify-end gap-2">
                                        <router-link :to="`/shop/authors/edit/${item?._id}`"
                                            class="rounded-md p-2 shadow-sm border border-slate-300 w-[30px] h-[30px] text-xl flex justify-center items-center hover:bg-primary hover:text-white transition-all duration-700">
                                            <i class="bx bxs-edit"></i>
                                        </router-link>
                                        <button @click="handleDelete(item?._id || '')"
                                            class="rounded-md p-2 shadow-sm border border-slate-300 w-[30px] h-[30px] text-xl flex justify-center items-center hover:bg-red-600 hover:text-white transition-all duration-700">
                                            <i class="bx bx-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- product table end -->
        </section>
    </MainLayout>
</template>
