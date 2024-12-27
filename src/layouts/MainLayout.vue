<template>
    <div class="flex grow flex-col">
        <Sidebar/>
        <section
        class="flex flex-auto flex-col transition-all duration-300 ease-in-out md:pl-[17rem]"
        >
        <Header />
        <main class="p-5 max-h-100% h-screen max-h-screen bg-gray-50">
            <slot />
        </main>
        <Footer />
        </section>

    </div>
</template>

<script setup lang="ts">
import Header from '@/components/layout/Header.vue';
import Footer from '@/components/layout/Footer.vue';
import Sidebar from '@/components/layout/Sidebar.vue';
</script>

<style scoped>

</style>