<template>
    <section class="w-full h-screen flex justify-center items-center px-2">
        <div class="w-full md:w-[350px] grid grid-cols-1 gap-3">
            <img width="100" src="/images/brand-logo.png" class="mx-auto" alt="logo">
            <h2 class="text-4xl font-semibold text-center">Sign in</h2>
            <div>
                <form v-on:submit="handleLogin" class="block">
                    <div class="grid grid-cols-1 gap-4">
                        <InputField type="email" v-model="email" placeholder="example@example.com" :required="true">
                            <template #icon>
                                <span class="text-gray-500"><i class="bx bx-envelope text-gray-500"></i></span>
                            </template>
                        </InputField>
                        <PasswordField v-model="password" placeholder="********" :required="true">
                            <template #icon>
                                <span class="text-gray-500"><i class='bx bxs-key'></i></span>
                            </template>
                        </PasswordField>
                        <div>
                            <Button type="submit" :label="loading ? 'Processing...' : 'Sign in'"></Button>
                        </div>
                    </div>

                </form>
            </div>
            <p class="flex gap-2 text-xs text-zinc-400">Don’t have an account?<a href="#"
                    class="hover:text-zinc-600">Sign up</a>
            </p>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useApi, useFormValidation } from '@/composables';
import { useRouter } from 'vue-router';
import InputField from '@/components/Inputs/InputField.vue';
import Button from '@/components/buttons/ButtonStyleOne.vue';
import PasswordField from '@/components/Inputs/PasswordField.vue';
import useToast from '@/composables/utils/useToast';
import useGlobalStore from '@/composables/globalStore/useGlobalStore';
import type { User } from '@/models/UserModels';
interface LoginForm {
    email: string;
    password: string;
}
const email = ref('');
const password = ref('');
const requiredFields = [
    { key: 'email', value: 'Email' },
    { key: 'password', value: 'Password' }
]

const { validateForm } = useFormValidation(requiredFields);
const { createData, loading, api } = useApi('');
const router = useRouter();
const { success, error } = useToast()
const {globalState, updateGlobalStore} = useGlobalStore()
const handleLogin = async (e: any) => {
    e.preventDefault();
    const formData: LoginForm = {
        email: email.value,
        password: password.value
    };
    if (!validateForm(formData)) return;
    try {
        const res = await createData({
            url: api.loginApi,
            payload: formData,
        });
        if (res.status === 201) {
            console.log(res.data)
            success(res?.data?.message)
            localStorage.setItem('user', JSON.stringify(res?.data?.data))
            localStorage.setItem('token', res?.data?.data?.token)
            updateGlobalStore({
                user : res?.data as User
            })
            router.push('/');
        } else {
            error(res?.data?.message ?? "Failed!")
        }
    } catch (err: any) {
        error(err?.message ?? "")
    }
};
</script>

<style scoped></style>