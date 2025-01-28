<template>
    <MainLayout>
        <section class="grid grid-cols-1 gap-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <h1>Product Details</h1>
                    <p>Full details of a product</p>
                </div>
                <div>
                    <div class="flex flex-col md:flex-row justify-end gap-2 items-center">
                       <div class="flex items-center gap-2">
                        <button
                            @click="goRoute('/products/edit/1')"
                            class="flex justify-center items-center bg-white shadow-sm rounded-md p-3 w-[40px] h-[40px] text-xl cursor-pointer hover:bg-slate-200">
                            <span class="text-primaryGreen"><i class="bx bxs-edit"></i></span>
                        </button>
                        
                       </div>
                    </div>
                </div>
            </div>
            <!-- product table start-->

            <div class="grid grid-cols-12 gap-3 md:gap-10">
                <div class="p-4 bg-white col-span-12 md:col-span-8 border border-gray-100 rounded-sm overflow-hidden">
                    <div v-for="([key, value], index) in Object.entries(prodDetails)" :key="index" class="grid grid-cols-12 gap-4 p-2 border">
                        <div class="col-span-12 md:col-span-4 capitalize"><span class="text-sm">{{ key }}</span></div>
                        <div class="col-span-12 md:col-span-8">
                            <span class="text-sm">{{ value !== null ? value : "N/A" }}</span>
                        </div>
                    </div>
                </div>
                <div class="p-2 bg-white col-span-12 md:col-span-4 border border-gray-100 rounded-sm overflow-hidden">
                    <div class="grid grid-cols-12 gap-2">
                        <div class="col-span-12">
                            <img class="w-full h-auto rounded-sm" src="/images/default.webp" alt="">
                        </div>
                        <div class="col-span-4">
                            <img class="w-full h-auto rounded-sm" src="/images/default.webp" alt="">
                        </div>
                        <div class="col-span-4">
                            <img class="w-full h-auto rounded-sm" src="/images/default.webp" alt="">
                        </div>
                        <div class="col-span-4">
                            <img class="w-full h-auto rounded-sm" src="/images/default.webp" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <!-- product table end -->
        </section>
    </MainLayout>
</template>
<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue";
import { goRoute } from "@/utils/commonUtils";
import { ref } from "vue";
const prodDetails = ref( {
    "product": "Macbook Pro",
    "category": "Computers",
    "subCategory": null,
    "brand": null,
    "unit": "Piece",
    "sku": "PT0001",
    "minimumQty": 5,
    "quantity": 50,
    "tax": 0.00,
    "discountType": "Percentage",
    "price": 1500.00,
    "status": "Active",
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
  })
const ProdImges = ref([
    "expire-product-01.2a163a06.png",
    'expire-product-01.2a163a06.png',
    'expire-product-01.2a163a06.png',
    'expire-product-01.2a163a06.png'
])

</script>