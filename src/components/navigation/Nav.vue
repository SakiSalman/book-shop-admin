<template>
    <ul v-for="(menuItems, index) in menu" :key="index" class="w-full">
        <ParantMenuItem :menuItems="menuItems"></ParantMenuItem>
    </ul>
</template>


<script setup lang="ts">
import menu from '@/assets/data/menu';
import ParantMenuItem from './ParantMenuItem.vue';
</script>