import { createRouter, createWebHistory } from 'vue-router';
import { useGuard, useGuestGuard } from '@/composables/guards/useAuthGuard';
import Dashboard from '@/pages/Dashboard/Dashboard.vue';
import SalesDasboard from '@/pages/Dashboard/SalesDasboard.vue';
import ProductList from '@/pages/Products/ProductList.vue';
import EditProduct from '@/pages/Products/edit/EditProduct.vue';
import AddProduct from '@/pages/Products/add/AddProduct.vue';
import ProductDetails from '@/pages/Products/product-details/ProductDetails.vue';
import Login from '@/pages/auth/Login.vue';
import ForgotPassword from '@/pages/auth/ForgotPassword.vue';
import ResetPassword from '@/pages/auth/ResetPassword.vue';
import AppSettings from '@/pages/CMS/AppSettings/AppSettings.vue';
import HeaderFooterCMS from '@/pages/CMS/HeaderFooterCMS/HeaderFooterCMS.vue';
import CategoriesUI from '@/pages/Shop/categories/CategoriesUI.vue';
import AddCategoriesUI from '@/pages/Shop/categories/add/AddCategoriesUI.vue';
import EditCategoriesUI from '@/pages/Shop/categories/edit/EditCategoriesUI.vue';
import TagUI from '@/pages/Shop/categories copy/TagUI.vue';
import AddTagUI from '@/pages/Shop/categories copy/add/addTagUI.vue';
import EditTagsUI from '@/pages/Shop/categories copy/edit/EditTagsUI.vue';

const routes = [
    { path: '/login', component: Login, beforeEnter: useGuestGuard },
    { path: '/forgot-password', component: ForgotPassword, beforeEnter: useGuestGuard },
    { path: '/reset-password', component: ResetPassword, beforeEnter: useGuestGuard },
    { path: '/', component: Dashboard, beforeEnter: useGuard },
    { path: '/sales-dashboard', component: SalesDasboard, beforeEnter: useGuard },
    { path: '/products', component: ProductList, beforeEnter: useGuard },
    { path: '/products/edit/:id', component: EditProduct, beforeEnter: useGuard },
    { path: '/products/add', component: AddProduct, beforeEnter: useGuard },
    { path: '/product-details/:id', component: ProductDetails, beforeEnter: useGuard },

    // CMS ROUTES

    { path: '/cms/app-settings', component: AppSettings, beforeEnter: useGuard },
    { path: '/cms/header-footer-cms', component: HeaderFooterCMS, beforeEnter: useGuard },

    // Shop
    { path: '/shop/categories', component: CategoriesUI, beforeEnter: useGuard },
    { path: '/shop/categories/add', component: AddCategoriesUI, beforeEnter: useGuard },
    { path: '/shop/categories/edit/:id', component: EditCategoriesUI, beforeEnter: useGuard },
    { path: '/shop/tags', component: TagUI, beforeEnter: useGuard },
    { path: '/shop/tag/add', component: AddTagUI, beforeEnter: useGuard },
    { path: '/shop/tag/edit/:id', component: EditTagsUI, beforeEnter: useGuard },

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;