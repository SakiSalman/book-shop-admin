<script setup lang="ts">
import { ref, } from "vue";
import InputField from "../Inputs/InputField.vue";
import CheckOutSideClick from "../common/CheckOutSideClick.vue";
import { useGlobalSidebar } from "@/composables/sidebar/useGlobalSidebar";
import useToast from '@/composables/utils/useToast';
import router from "@/router"
import useGlobalStore from "@/composables/globalStore/useGlobalStore";
const {toggleSidebar, state} = useGlobalSidebar()
const {globalState} = useGlobalStore()
const {success} = useToast()
const searchKeyword = ref("");
const showDropBox = ref(false);
const handleClickedOutside = () => {
    if (showDropBox.value) {
        showDropBox.value = false;
    }
};
const toggleDropdown = () => {
    showDropBox.value = !showDropBox.value;
};

const handleLogout = () => {
    localStorage.clear()
    router.push('/login')
    success('Logged Out Successfully!')
}
</script>

<template>
    <header class="py-3 px-4 shadow-sm bg-white sticky top-0">
        <div class="grid grid-cols-12 gap-5">
            <div @click="() => toggleSidebar()" class="col-span-1 flex justify-center items-center md:hidden">
                <span class="text-2xl text-primaryOrange"><i class='bx bx-menu-alt-left' ></i></span>
            </div>
            <div class="col-span-7 md:col-span-5">
                <InputField
                    type="search"
                    v-model="searchKeyword"
                    placeholder="Search"
                    wrapperClass="py-1 !bg-gray-50 max-w-[400px]"
                >
                    <template #icon>
                        <span class="text-gray-300 text-xl"
                            ><i class="bx bx-search-alt-2"></i
                        ></span>
                    </template>
                </InputField>
            </div>
            <div class="col-span-4 md:col-span-7 flex justify-end gap-2 items-center">
                <div
                    class="flex flex-shrink-0 justify-center items-center w-[40px] h-[40px] rounded-md overflow-hidden bg-gray-200"
                >
                    <router-link
                        to="/settings"
                        class="flex justify-center items-center"
                        ><i class="bx bx-cog"></i
                    ></router-link>
                </div>
                <div
                    class="grid grid-cols-1 md:grid-cols-12 gap-1 items-center w-[160px] h-[40px] rounded-sm"
                >
                    <div class="col-span-4">
                        <div
                            class="w-[40px] h-[40px] overflow-hidden rounded-sm ring-1 ring-indigo-400"
                        >
                            <img
                            @click="toggleDropdown"
                            @click.stop
                                src="/images/avatar.jpg"
                                class="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div
                        class="col-span-8 cursor-pointer relative hidden md:block"
                        @click="toggleDropdown"
                        @click.stop
                    >
                        <p
                            class="text-xs md:text-sm font-semibold flex items-center gap-1 justify-between"
                        >
                            <span>{{ globalState?.user?.name }}</span>
                            <span class="text-xl"
                                ><i class="bx bx-chevron-down"></i
                            ></span>
                        </p>
                        <p class="text-xs">{{globalState?.user?.role}}</p>

                        <div
                            class="absolute bg-white border border-gray-100 shadow top-[53px] rounded-sm transition-all duration-700"
                            :class="{
                                'opacity-100 visible right-0': showDropBox,
                                'opacity-0 invisible right-0': !showDropBox,
                            }"
                        >
                            <CheckOutSideClick
                                :onClickOutside="handleClickedOutside"
                            >
                                <ul class="grid grid-cols-1 min-w-[160px] py-5">
                                    <router-link
                                        to="/profile"
                                        class="flex gap-1 items-center px-3 py-1 hover:bg-primaryOrange duration-700 transition-colors"
                                        ><i class="bx bx-user"></i>My
                                        Profile</router-link
                                    >
                                    <router-link
                                        to="/settings"
                                        class="flex gap-1 items-center px-3 py-1 hover:bg-primaryOrange duration-700 transition-colors"
                                        ><i class="bx bx-cog"></i>
                                        Settings</router-link
                                    >
                                    <button
                                        class="flex gap-1 items-center px-3 py-1 hover:bg-primaryOrange duration-700 transition-colors text-red-500 hover:text-white"
                                        @click='handleLogout'
                                    >
                                        <i class="bx bx-log-out"></i>Log out
                                    </button>
                                </ul>
                            </CheckOutSideClick>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>
