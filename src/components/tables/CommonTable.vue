<template>
    <div class="border rounded-md bg-white shadow-sm p-5">
        <h4 class="text-xl font-medium mb-4">Expired Products</h4>
        <div class="w-full overflow-x-auto">
            <table
                class="table-auto w-full border-separate border-spacing-y-3 text-left"
            >
                <thead>
                    <tr
                        class="pl-4 py-4 border-t border-b border-l rounded-l-lg"
                    >
                        <th class="p-2">
                            <label class="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded border border-slate-300 checked:bg-teal-800 checked:border-teal-800"
                                />
                                <span
                                    class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 peer-checked:left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                >
                                    <i class="bx bx-check text-white"></i>
                                </span>
                            </label>
                        </th>
                        <th class="p-2 whitespace-nowrap">Product</th>
                        <th class="p-2 whitespace-nowrap">SKU</th>
                        <th class="p-2 whitespace-nowrap">Manufactured Date</th>
                        <th class="p-2 whitespace-nowrap">Expired Date</th>
                        <th class="p-2 whitespace-nowrap">Action</th>
                    </tr>
                </thead>
                <tbody
                    v-for="(item, index) in Array.from({ length: 6 })"
                    :key="index"
                >
                    <tr>
                        <td class="border-t border-b px-4 py-2">
                            <label class="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded border border-slate-300 checked:bg-teal-800 checked:border-teal-800"
                                />
                                <span
                                    class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 peer-checked:left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                >
                                    <i class="bx bx-check text-white"></i>
                                </span>
                            </label>
                        </td>
                        <td
                            class="border-t border-b px-4 py-2 whitespace-nowrap"
                        >
                            <div class="flex items-center gap-3">
                                <img
                                    src="/images/default.webp"
                                    alt=""
                                    class="w-16 h-16 object-cover"
                                />
                                <router-link to="/product"
                                    ><p
                                        class="truncate max-w-fit text-xs md:text-sm hover:text-primary"
                                    >
                                        Red Premium Handy
                                    </p></router-link
                                >
                            </div>
                        </td>
                        <td
                            class="border-t border-b px-4 py-2 whitespace-nowrap text-xs md:text-sm"
                        >
                            PT006
                        </td>
                        <td
                            class="border-t border-b px-4 py-2 whitespace-nowrap text-xs md:text-sm"
                        >
                            17 Jan 2023
                        </td>
                        <td
                            class="border-t border-b px-4 py-2 whitespace-nowrap text-xs md:text-sm"
                        >
                            17 Jan 2023
                        </td>
                        <td
                            class="border-t border-b px-4 py-2 whitespace-nowrap"
                        >
                            <div class="flex items-center gap-2">
                                <button
                                    class="rounded-md p-2 shadow-sm border border-slate-300 w-[30px] h-[30px] text-xl flex justify-center items-center hover:bg-primary hover:text-white transition-all duration-700"
                                >
                                    <i class="bx bxs-edit"></i>
                                </button>
                                <button
                                    class="rounded-md p-2 shadow-sm border border-slate-300 w-[30px] h-[30px] text-xl flex justify-center items-center hover:bg-red-600 hover:text-white transition-all duration-700"
                                >
                                    <i class="bx bx-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
