<template>
    <li v-if="menuItems?.items?.length > 0" class="mb-4">
        <p class="text-sm font-semibold mb-3 bg-primary text-white p-2">{{ menuItems?.sectionName }}</p>
        <ul v-for="(parentMenu, index) in menuItems?.items" :key="index" class="">
            <li v-if="parentMenu?.items?.length > 0">
                <a v-on:click="showMenu($event, parentMenu)" type="button"
                    :class="isMenuActive(parentMenu) ? 'menu-active  parent-menu cursor-pointer' : 'parent-menu cursor-pointer'">
                    <div
                        class="flex items-center justify-between gap-3 px-3 py-2 rounded-sm hover:text-primary duration-500 transition-all">
                        <div class="flex items-center gap-2">
                            <span v-html="parentMenu?.icon" class="flex items-center"></span>
                            <span href=""> {{ parentMenu?.name }}</span>
                        </div>
                        <div>
                            <i class='bx bx-chevron-down'></i>
                        </div>
                    </div>
                    <!-- submenu rendering Start -->
                    <SubMenuItem :menuItem="parentMenu"></SubMenuItem>
                    <!-- Sub menu rendering end-->
                </a>
            </li>
            <li v-else>
                <router-link
                    :to="parentMenu?.path ?? '#'"
                    :class="isMenuActive(parentMenu) ? 'text-primary flex items-center gap-2 text-sm px-3 py-2 hover:text-primary duration-500 transition-all' : 'flex items-center gap-4 text-sm px-3 py-2 hover:text-primary duration-500 transition-all'">
                    <span v-html="parentMenu?.icon" class="flex items-center"></span>
                    <span href=""> {{ parentMenu?.name }}</span>
                </router-link>
            </li>

        </ul>
    </li>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import SubMenuItem from './SubMenuItem.vue';

defineProps({
    menuItems: {
        type: Object,
        default: () => ({
            items: []
        })
    }
})

const route = useRoute();

function isMenuActive(menu: any) {
    if (menu.path === route.path) {
        return true;
    }
    if (menu.items && menu.items.length > 0) {
        return menu.items.some((subMenu: any) => isMenuActive(subMenu));
    }
    return false;
}
const showMenu = (e: any, parentMenu: any) => {
    const parentAnchor = e.target.closest('a') as HTMLElement;
    if (!parentAnchor) return;
    const submenu = parentAnchor.childNodes[2] as HTMLElement;
    if (parentMenu?.items?.length > 0) {
        if (e.target.closest('a').classList.contains('parent-menu')) {
            e.preventDefault();
        }
        if (!submenu || submenu.tagName !== 'UL') return;

        submenu.classList.toggle('hidden');
    }
};





</script>
