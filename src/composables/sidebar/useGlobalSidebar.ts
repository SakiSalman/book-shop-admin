import { reactive } from 'vue';

const state = reactive({
    showSidebar: false,
});

const toggleSidebar = () => {
    state.showSidebar = !state.showSidebar;
    console.log("Sidebar state updated:", state.showSidebar);
};

export const useGlobalSidebar = () => {
    return {
        state,
        toggleSidebar,
    };
};
