<script setup lang="ts">
import ButtonStyleOne from "@/components/buttons/ButtonStyleOne.vue";
import { useApi } from "@/composables";
import useToast from "@/composables/utils/useToast";
import MainLayout from "@/layouts/MainLayout.vue";
import type { CategoryItemModel } from "@/models/Products/CategoryModels";
import { goRoute } from "@/utils/commonUtils";
import { onMounted, ref } from "vue";
const showModal = ref(false)
const { fetchData, api, loading, handleSubmit, deleteData } = useApi()
const {success, warning} = useToast()

const dataList = ref<CategoryItemModel[]>([])
const handleDelete = async (id: string) => {
    try {
        let res:any = await deleteData(`${api.shop.categories}/${id}`)
        if (res?.statusCode === 200) {
            success(res?.data?.message)    
            getAllCategories()
        }else{
            warning(res?.message)
        }
    } catch (error) {
        console.log("no data found!")
    }
}
const getAllCategories = async () => {
    try {
        const res: any = await fetchData(api.shop.categories);
        if (res?.data) {
            dataList.value = res.data
        }
    } catch (error) {
        console.log("no data found!")
    }
}
onMounted(async () => {
    await getAllCategories()
})

</script>

<template>
    <MainLayout>
        <section class="grid grid-cols-1 gap-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <h1>Category List</h1>
                    <p>Manage your categories</p>
                </div>
                <div>
                    <div class="flex flex-col md:flex-row justify-end gap-2 items-center">
                        <div class="flex justify-between items-center gap-5">
                            <ButtonStyleOne :onclick="() => goRoute('/shop/categories/add')" label="Add New">
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
                                        <span>Categories</span>
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
                        <tbody v-for="(item, index) in dataList" :key="index">

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
                                        <img src="/images/products/expire-product-01.2a163a06.png" alt=""
                                            class="w-16 h-16 object-cover" />
                                    </div>
                                </td>
                                <td class="border-t border-b px-4 py-2 whitespace-nowrap text-xs md:text-sm">
                                    {{ item?.name }}
                                </td>
                                <td class="border-t border-b px-4 py-2 whitespace-nowrap text-end">
                                    <div class="flex items-center justify-end gap-2">
                                        <router-link :to="`/shop/categories/edit/${item?._id}`"
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
        <CommonModal :onClose="() => showModal = false" v-if="showModal">
            <template #children>
                <div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut vitae laborum ea! Optio voluptates quae
                    esse ad libero, delectus molestias doloribus, aperiam error fugiat amet at sapiente ullam, odit enim
                    ducimus distinctio aliquam illo nostrum incidunt itaque dolorum reprehenderit officiis? Corrupti,
                    similique illo maxime, tempora iure est modi quia vel ducimus optio vero asperiores repellat
                    aperiam, rerum eius consequatur obcaecati adipisci expedita. Beatae ipsa, cupiditate commodi rem
                    sunt officia facere, ullam adipisci id rerum tempore illo voluptatem quo veritatis, ex aliquid
                    voluptate suscipit. Porro rerum voluptatum nisi minima ullam exercitationem consequatur, ut
                    inventore officiis quibusdam minus numquam esse enim doloremque.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut vitae laborum ea! Optio voluptates quae
                    esse ad libero, delectus molestias doloribus, aperiam error fugiat amet at sapiente ullam, odit enim
                    ducimus distinctio aliquam illo nostrum incidunt itaque dolorum reprehenderit officiis? Corrupti,
                    similique illo maxime, tempora iure est modi quia vel ducimus optio vero asperiores repellat
                    aperiam, rerum eius consequatur obcaecati adipisci expedita. Beatae ipsa, cupiditate commodi rem
                    sunt officia facere, ullam adipisci id rerum tempore illo voluptatem quo veritatis, ex aliquid
                    voluptate suscipit. Porro rerum voluptatum nisi minima ullam exercitationem consequatur, ut
                    inventore officiis quibusdam minus numquam esse enim doloremque.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut vitae laborum ea! Optio voluptates quae
                    esse ad libero, delectus molestias doloribus, aperiam error fugiat amet at sapiente ullam, odit enim
                    ducimus distinctio aliquam illo nostrum incidunt itaque dolorum reprehenderit officiis? Corrupti,
                    similique illo maxime, tempora iure est modi quia vel ducimus optio vero asperiores repellat
                    aperiam, rerum eius consequatur obcaecati adipisci expedita. Beatae ipsa, cupiditate commodi rem
                    sunt officia facere, ullam adipisci id rerum tempore illo voluptatem quo veritatis, ex aliquid
                    voluptate suscipit. Porro rerum voluptatum nisi minima ullam exercitationem consequatur, ut
                    inventore officiis quibusdam minus numquam esse enim doloremque.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut vitae laborum ea! Optio voluptates quae
                    esse ad libero, delectus molestias doloribus, aperiam error fugiat amet at sapiente ullam, odit enim
                    ducimus distinctio aliquam illo nostrum incidunt itaque dolorum reprehenderit officiis? Corrupti,
                    similique illo maxime, tempora iure est modi quia vel ducimus optio vero asperiores repellat
                    aperiam, rerum eius consequatur obcaecati adipisci expedita. Beatae ipsa, cupiditate commodi rem
                    sunt officia facere, ullam adipisci id rerum tempore illo voluptatem quo veritatis, ex aliquid
                    voluptate suscipit. Porro rerum voluptatum nisi minima ullam exercitationem consequatur, ut
                    inventore officiis quibusdam minus numquam esse enim doloremque.
                </div>
            </template>
        </CommonModal>
    </MainLayout>
</template>
