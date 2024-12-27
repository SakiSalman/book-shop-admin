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
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import useGlobalStore from '@/composables/globalStore/useGlobalStore';


const {globalState, updateGlobalStore} = useGlobalStore()
const checkUser = () => {
  const userData = localStorage.getItem('user');
  if (userData) {
    try {
      updateGlobalStore({
        user : JSON.parse(userData)
      })
    } catch (error) {
      console.error('Failed to parse user data:', error);
      updateGlobalStore({
        user : null
      })
    }
  } else {
    console.warn('No user found in localStorage');
    updateGlobalStore({
        user : null
      })
  }
};
console.log(globalState)
const route = useRoute();
watch(
  () => route.path,
  () => {
    checkUser();
  },
  { immediate: true } 
);

onMounted(() => {
  checkUser();
});

</script>

<style scoped>

</style>