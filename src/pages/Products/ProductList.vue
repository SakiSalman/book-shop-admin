<script setup lang="ts">
import ButtonStyleOne from "@/components/buttons/ButtonStyleOne.vue";
import InputField from "@/components/Inputs/InputField.vue";
import SelectField from "@/components/Inputs/SelectField.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import { goRoute } from "@/utils/commonUtils";
import { ref } from "vue";
const searchKeyword = ref("");
const showFilter = ref(false);
const showModal = ref(false)
const options = ref([
    {
        label: "ASC",
        value: "asc",
    },
    {
        label: "DSC",
        value: "dsc",
    },
]);

const hadndleFilter = () => {
    showFilter.value = !showFilter.value;
};
</script>

<template>
    <MainLayout>
        <section class="grid grid-cols-1 gap-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <h1>Product List</h1>
                    <p>Manage your products</p>
                </div>
                <div>
                    <div class="flex flex-col md:flex-row justify-end gap-2 items-center">
                       <div class="flex items-center gap-2">
                        <button
                            class="flex justify-center items-center bg-white shadow-sm rounded-md p-3 w-[40px] h-[40px] text-xl cursor-pointer hover:bg-slate-200">
                            <span class="text-primaryGreen"><i title="Export" class="bx bxs-file-export"></i></span>
                        </button>
                        <button
                            class="flex justify-center items-center bg-white shadow-sm rounded-md p-3 w-[40px] h-[40px] text-xl cursor-pointer hover:bg-slate-200">
                            <span><i title="Refresh" class="bx bx-refresh"></i></span>
                        </button>
                       </div>

                        <div class="flex justify-between items-center gap-5">
                            <ButtonStyleOne
                        :onclick="() => goRoute('/products/add')"
                        label="Add New">
                            <template #icon>
                                <span><i class="bx bx-plus-circle"></i></span>
                            </template>
                        </ButtonStyleOne>
                        <ButtonStyleOne 
                        :onclick="() => showModal = !showModal"
                        label="Import" 
                        buttonClass="bg-primaryBlue border-primaryBlue"
                        >
                            <template #icon>
                                <span><i class="bx bx-import"></i></span>
                            </template>
                        </ButtonStyleOne>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-white rounded-sm border border-slate-200 shadow-sm p-5 grid grid-cols-1 gap-5">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <InputField type="search" v-model="searchKeyword" placeholder="Search"
                            wrapperClass="py-1 max-w-[400px] !bg-white">
                            <template #icon>
                                <span class="text-gray-300 text-xl"><i class="bx bx-search-alt-2"></i></span>
                            </template>
                        </InputField>
                    </div>
                    <div class="flex justify-end gap-3 items-center">
                        <div>
                            <button @click="hadndleFilter"
                                class="flex justify-center items-center bg-primary shadow-sm rounded-md p-3 w-[40px] h-[40px] text-xl cursor-pointer hover:bg-slate-200 text-white hover:text-primary">
                                <span class="flex justify-center items-center"><i class="bx bx-filter-alt"></i></span>
                            </button>
                        </div>
                        <div>
                            <SelectField :options="options" placeholder="Sort by" />
                        </div>
                    </div>
                </div>
                <div v-if="showFilter" class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    <SelectField :options="options" placeholder="Sort by" />
                    <SelectField :options="options" placeholder="Sort by" />
                    <SelectField :options="options" placeholder="Sort by" />
                    <SelectField :options="options" placeholder="Sort by" />
                    <SelectField :options="options" placeholder="Sort by" />

                    <ButtonStyleOne label="Filter">
                        <template #icon>
                            <span class="text-white text-xl flex items-center"><i class="bx bx-search-alt-2"></i></span>
                        </template>
                    </ButtonStyleOne>
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
                                        <span>Product</span>
                                        <span class="flex flex-col justify-center items-center">
                                            <span
                                                class="text-[9px] flex justify-center items-center cursor-pointer text-gray-400 hover:text-primaryBlue"><i
                                                    class='bx bxs-up-arrow'></i></span>
                                            <span
                                                class="text-[9px] flex justify-center items-center cursor-pointer text-gray-400 hover:text-primaryBlue"><i
                                                    class='bx bxs-down-arrow'></i></span>
                                        </span>
                                    </div>
                                </th>
                                <th class="p-2 whitespace-nowrap py-4">
                                    <div class="flex justify-between items-center">
                                        <span> SKU
                                        </span>
                                        <span class="flex flex-col justify-center items-center">
                                            <span
                                                class="text-[9px] flex justify-center items-center cursor-pointer text-gray-400 hover:text-primaryBlue"><i
                                                    class='bx bxs-up-arrow'></i></span>
                                            <span
                                                class="text-[9px] flex justify-center items-center cursor-pointer text-gray-400 hover:text-primaryBlue"><i
                                                    class='bx bxs-down-arrow'></i></span>
                                        </span>
                                    </div>
                                </th>
                                <th class="p-2 whitespace-nowrap py-4">

                                    <div class="flex justify-between items-center">
                                        <span> Manufactured Date
                                        </span>
                                        <span class="flex flex-col justify-center items-center">
                                            <span
                                                class="text-[9px] flex justify-center items-center cursor-pointer text-gray-400 hover:text-primaryBlue"><i
                                                    class='bx bxs-up-arrow'></i></span>
                                            <span
                                                class="text-[9px] flex justify-center items-center cursor-pointer text-gray-400 hover:text-primaryBlue"><i
                                                    class='bx bxs-down-arrow'></i></span>
                                        </span>
                                    </div>


                                </th>
                                <th class="p-2 whitespace-nowrap py-4">

                                    <div class="flex justify-between items-center">
                                        <span>                                     Expired Date
                                        </span>
                                        <span class="flex flex-col justify-center items-center">
                                            <span
                                                class="text-[9px] flex justify-center items-center cursor-pointer text-gray-400 hover:text-primaryBlue"><i
                                                    class='bx bxs-up-arrow'></i></span>
                                            <span
                                                class="text-[9px] flex justify-center items-center cursor-pointer text-gray-400 hover:text-primaryBlue"><i
                                                    class='bx bxs-down-arrow'></i></span>
                                        </span>
                                    </div>
                                
                                </th>
                                <th class="p-2 whitespace-nowrap py-4">Action</th>
                            </tr>
                        </thead>
                        <tbody v-for="(item, index) in Array.from({ length: 6 })" :key="index">
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
                                        <router-link to="/product">
                                            <p class="truncate max-w-fit text-xs md:text-sm hover:text-primary">
                                                Red Premium Handy
                                            </p>
                                        </router-link>
                                    </div>
                                </td>
                                <td class="border-t border-b px-4 py-2 whitespace-nowrap text-xs md:text-sm">
                                    PT006
                                </td>
                                <td class="border-t border-b px-4 py-2 whitespace-nowrap text-xs md:text-sm">
                                    17 Jan 2023
                                </td>
                                <td class="border-t border-b px-4 py-2 whitespace-nowrap text-xs md:text-sm">
                                    17 Jan 2023
                                </td>
                                <td class="border-t border-b px-4 py-2 whitespace-nowrap">
                                    <div class="flex items-center gap-2">
                                        <router-link
                                            to="/product-details/1"
                                            class="rounded-md p-2 shadow-sm border border-slate-300 w-[30px] h-[30px] text-xl flex justify-center items-center hover:bg-primary hover:text-white transition-all duration-700">
                                            <i class='bx bx-low-vision'></i>
                                        </router-link>
                                        <router-link
                                            to="/products/edit/1"
                                            class="rounded-md p-2 shadow-sm border border-slate-300 w-[30px] h-[30px] text-xl flex justify-center items-center hover:bg-primary hover:text-white transition-all duration-700">
                                            <i class="bx bxs-edit"></i>
                                        </router-link>
                                        <button
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut vitae laborum ea! Optio voluptates quae esse ad libero, delectus molestias doloribus, aperiam error fugiat amet at sapiente ullam, odit enim ducimus distinctio aliquam illo nostrum incidunt itaque dolorum reprehenderit officiis? Corrupti, similique illo maxime, tempora iure est modi quia vel ducimus optio vero asperiores repellat aperiam, rerum eius consequatur obcaecati adipisci expedita. Beatae ipsa, cupiditate commodi rem sunt officia facere, ullam adipisci id rerum tempore illo voluptatem quo veritatis, ex aliquid voluptate suscipit. Porro rerum voluptatum nisi minima ullam exercitationem consequatur, ut inventore officiis quibusdam minus numquam esse enim doloremque.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut vitae laborum ea! Optio voluptates quae esse ad libero, delectus molestias doloribus, aperiam error fugiat amet at sapiente ullam, odit enim ducimus distinctio aliquam illo nostrum incidunt itaque dolorum reprehenderit officiis? Corrupti, similique illo maxime, tempora iure est modi quia vel ducimus optio vero asperiores repellat aperiam, rerum eius consequatur obcaecati adipisci expedita. Beatae ipsa, cupiditate commodi rem sunt officia facere, ullam adipisci id rerum tempore illo voluptatem quo veritatis, ex aliquid voluptate suscipit. Porro rerum voluptatum nisi minima ullam exercitationem consequatur, ut inventore officiis quibusdam minus numquam esse enim doloremque.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut vitae laborum ea! Optio voluptates quae esse ad libero, delectus molestias doloribus, aperiam error fugiat amet at sapiente ullam, odit enim ducimus distinctio aliquam illo nostrum incidunt itaque dolorum reprehenderit officiis? Corrupti, similique illo maxime, tempora iure est modi quia vel ducimus optio vero asperiores repellat aperiam, rerum eius consequatur obcaecati adipisci expedita. Beatae ipsa, cupiditate commodi rem sunt officia facere, ullam adipisci id rerum tempore illo voluptatem quo veritatis, ex aliquid voluptate suscipit. Porro rerum voluptatum nisi minima ullam exercitationem consequatur, ut inventore officiis quibusdam minus numquam esse enim doloremque.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut vitae laborum ea! Optio voluptates quae esse ad libero, delectus molestias doloribus, aperiam error fugiat amet at sapiente ullam, odit enim ducimus distinctio aliquam illo nostrum incidunt itaque dolorum reprehenderit officiis? Corrupti, similique illo maxime, tempora iure est modi quia vel ducimus optio vero asperiores repellat aperiam, rerum eius consequatur obcaecati adipisci expedita. Beatae ipsa, cupiditate commodi rem sunt officia facere, ullam adipisci id rerum tempore illo voluptatem quo veritatis, ex aliquid voluptate suscipit. Porro rerum voluptatum nisi minima ullam exercitationem consequatur, ut inventore officiis quibusdam minus numquam esse enim doloremque.
            </div>
        </template>
    </CommonModal>
    </MainLayout>
</template>
