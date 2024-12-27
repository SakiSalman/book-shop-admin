<template>
    <section class="w-full h-screen flex justify-center items-center px-2">
        <div class="w-full md:w-[350px] grid grid-cols-1 gap-3">
            <img width="100" src="/images/brand-logo.png" class="mx-auto" alt="logo">
            <h2 class="text-4xl font-semibold text-center">Sign in</h2>
            <div>
                <form v-on:submit="handleLogin" class="block">
                    <div class="grid grid-cols-1 gap-4">
                        <InputField type="email" v-model="email" placeholder="example@example.com" :required="true"
                            message="Field Is Required!">
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
                            <Button type="submit" label="Sign in"></Button>
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
import { inject } from 'vue';
interface LoginForm {
    email: string;
    password: string;
}
const api = inject('api');
const email = ref('');
const password = ref('');
const requiredFields = [
    { key: 'email', value: 'Email' },
    { key: 'password', value: 'Password' }
]

const { errors, validateForm } = useFormValidation(requiredFields);
const { createData, loading, error } = useApi('');
const router = useRouter();

const handleLogin = async (e: any) => {
    e.preventDefault();
    const formData: LoginForm = {
        email: email.value,
        password: password.value
    };
    console.log("formData", formData)
    if (!validateForm(formData)) return;

    try {
        await createData(formData);
        router.push('/');
    } catch (err) {
        errors.value.general = error.value || 'Login failed.';
    }
};
</script>

<style scoped></style>