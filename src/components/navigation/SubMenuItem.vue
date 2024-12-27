<template>
    <ul class="hidden">
        <li v-for="(dropdown, index) in menuItem?.items" :key="index" class="pl-2">
            <a v-if="dropdown?.item?.length > 0" type="button"
                :class="`flex justify-between items-center py-2 px-2 text-sm hover:text-primaryOrange duration-500 transition-all ${route.path ===dropdown?.path && 'drop-down-menu-active'}`">
                <span class="flex items-center gap-3">
                    <span class=""><i class="bx bx-chevron-right"></i></span>
                    <span>{{ dropdown?.name }}</span>
                </span>
                <span v-if="dropdown?.item?.length > 0">
                    <i class="bx bx-chevron-right"></i>
                </span>
            </a>
            <router-link v-else :to="dropdown.path"
                :class="`flex justify-between items-center py-2 px-2 text-sm hover:text-primaryOrange duration-500 transition-all ${route.path ===dropdown?.path && 'drop-down-menu-active'}`">
                <span class="flex items-center gap-3">
                    <span class=""><i class="bx bx-chevron-right"></i></span>
                    <span>{{ dropdown?.name }}</span>
                </span>
                <span v-if="dropdown?.item?.length > 0">
                    <i class="bx bx-chevron-right"></i>
                </span>
            </router-link>

        </li>
    </ul>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

defineProps({
    menuItem: {
        type: Object,
        default: () => ({
            items: [],
        }),
    },
});
const route = useRoute();
</script>
