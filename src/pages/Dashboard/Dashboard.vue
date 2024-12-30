<template>
    <MainLayout>
        <section class="h-[calc(100vh-110px)] overflow-y-auto flex flex-col gap-5">

            <!-- currency card -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
                <OverViewCardWithCurrency
                :title="307144"
                subTitle="Customers"
                >
                    <template #icon>
                        <i class='bx bx-user'></i>
                    </template>
                </OverViewCardWithCurrency>
                <OverViewCardWithCurrency
                :title="307144"
                subTitle="Customers"
                >
                    <template #icon>
                        <i class='bx bx-user'></i>
                    </template>
                </OverViewCardWithCurrency>
                <OverViewCardWithCurrency
                :title="307144"
                subTitle="Customers"
                >
                    <template #icon>
                        <i class='bx bx-user'></i>
                    </template>
                </OverViewCardWithCurrency>
                <OverViewCardWithCurrency
                :title="307144"
                subTitle="Customers"
                >
                    <template #icon>
                        <i class='bx bx-user'></i>
                    </template>
                </OverViewCardWithCurrency>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
                <OverViewCard
                :title="100"
                subTitle="Customers"
                >
                    <template #icon>
                        <i class='bx bx-user'></i>
                    </template>
                </OverViewCard>
                <OverViewCard 
                 :title="110"
                subTitle="Suppliers"
                bg-color="bg-[#00cfe8]">
                    <template #icon>
                        <i class='bx bx-user'></i>
                    </template>
                </OverViewCard>
                <OverViewCard 
                 :title="110"
                subTitle="Suppliers"
                bg-color="bg-[#1b2850]">
                    <template #icon>
                        <i class='bx bx-file' ></i>
                    </template>
                </OverViewCard>
                <OverViewCard 
                 :title="200"
                subTitle="Sales Invoice"
                bg-color="bg-[#28c76f]">
                    <template #icon>
                        <i class='bx bxs-file-blank' ></i>
                    </template>
                </OverViewCard>
            </div>
            <div>
                <CommonTable/>
            </div>
        </section>
    </MainLayout>
</template>

<script setup lang="ts">

import OverViewCard from '@/components/Cards/OverViewCard.vue';
import OverViewCardWithCurrency from '@/components/Cards/OverViewCardWithCurrency.vue';
import CommonTable from '@/components/tables/CommonTable.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import useGlobalStore from '@/composables/globalStore/useGlobalStore';

const {globalState} = useGlobalStore()

console.log(globalState)
</script>

<style scoped></style>