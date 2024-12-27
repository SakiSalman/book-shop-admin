<template>
    <aside
        class="peer fixed bottom-0 top-0 z-[2] md:z-[1] flex flex-col border-zinc-300/25 bg-white py-6 ltr:border-r rtl:border-l transition-all duration-300 ease-in-out max-md:w-[20rem] max-md:shadow-2xl md:w-[17rem]"
        :class="state.showSidebar ? 'left-0' : 'left-[-1000px] md:left-0'"
    >
        <div class="flex items-center justify-between px-6 pb-6 max-md:flex-row-reverse">
            <a aria-label="Logo" href="/">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 198.43 176.06" class="h-9">
                    <g>
                        <rect fill="#3b82f675" x="0" y="88.03" width="141.73" height="88.03" rx="44.02" ry="44.02" />
                        <rect fill="#3b82f6d0" x="0" y="44.02" width="170.08" height="88.03" rx="44.02" ry="44.02" />
                        <rect fill="#3b82f6f0" x="0" y="0" width="198.43" height="88.03" rx="44.02" ry="44.02" />
                    </g>
                </svg>
            </a>
            <button
                type="button"
                aria-label="Toggle Aside Menu"
                class="flex h-12 w-12 items-center justify-center text-3xl md:hidden"
                @click="toggleSidebar"
            >
            <i class='bx bx-x'></i>
            </button>
        </div>
        <div class="h-full overflow-y-scroll px-6">
            <Nav></Nav>
        </div>
        <div class="px-6"></div>
    </aside>
</template>

<script setup lang="ts">
import Nav from '@/components/navigation/Nav.vue';
import { useGlobalSidebar } from '@/composables/sidebar/useGlobalSidebar';

// Access global state and actions
const { state, toggleSidebar } = useGlobalSidebar();

// Log the initial state for debugging
console.log("Initial sidebar state:", state.showSidebar);
</script>
