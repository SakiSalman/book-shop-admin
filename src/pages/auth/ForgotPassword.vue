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
                        <div class="flex justify-center items-center">
                            <Button
                              type="submit" 
                              :label="loading ? 'Processing...' : 'Send Verfication Code'"
                              buttonClass="w-full"
                              ></Button>
                        </div>
                    </div>

                </form>
            </div>
            <p class="flex gap-2 text-sm text-zinc-400">Have Password?<router-link to="/login"
                    class="hover:text-zinc-600 text-primaryBlue">login</router-link>
            </p>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useApi, useFormValidation } from '@/composables';
import { RouterLink, useRouter } from 'vue-router';
import InputField from '@/components/Inputs/InputField.vue';
import Button from '@/components/buttons/ButtonStyleOne.vue';
import useToast from '@/composables/utils/useToast';
import useGlobalStore from '@/composables/globalStore/useGlobalStore';
import type { User } from '@/models/UserModels';
import type { Field } from '@/models/CommonModels';
interface ResetForm {
    email: string;
}
const email = ref('');
const requiredFields:Field[] = [
    { key: 'email', value: 'Email' },
]

const { validateForm } = useFormValidation(requiredFields);
const { createData, loading, api } = useApi();
const router = useRouter();
const { success, error } = useToast()
const handleLogin = async (e: any) => {
    e.preventDefault();
    const formData: ResetForm = {
        email: email.value,
    };
    if (!validateForm(formData)) return;
    try {
        const res = await createData({
            url: api.sendVerificationCode,
            payload: formData,
        });
        if (res.status === 201) {
            if (res?.data?.data?.token) {
                router.push(`/reset-password?token=${res?.data?.data?.token}`);
            }
        } else {
            error(res?.data?.message ?? "Failed!")
        }
    } catch (err: any) {
        error(err?.message ?? "")
    }
};
</script>

<style scoped></style>