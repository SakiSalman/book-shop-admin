<template>
    <section class="w-full h-screen flex justify-center items-center px-2">
        <div class="w-full md:w-[350px] grid grid-cols-1 gap-3">
            <img width="100" src="/images/brand-logo.png" class="mx-auto" alt="logo">
            <h2 class="text-4xl font-semibold text-center">Reset Password</h2>
            <div>
                <form v-on:submit="handleResetPassword" class="block">
                    <div class="grid grid-cols-1 gap-4">
                        <PasswordField v-model="password" placeholder="Enter new password" :required="true">
                            <template #icon>
                                <span class="text-gray-500"><i class='bx bxs-key'></i></span>
                            </template>
                        </PasswordField>
                        <PasswordField v-model="confirmPassword" placeholder="Confirm new password" :required="true">
                            <template #icon>
                                <span class="text-gray-500"><i class='bx bxs-key'></i></span>
                            </template>
                        </PasswordField>
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
import { RouterLink, useRoute, useRouter } from 'vue-router';
import Button from '@/components/buttons/ButtonStyleOne.vue';
import useToast from '@/composables/utils/useToast';
import PasswordField from '@/components/Inputs/PasswordField.vue';
interface ResetPasswordForm {
    password: string;
    confirmPassword: string;
}
const password = ref('');
const confirmPassword = ref('');
const requiredFields = [
    { key: 'password', value: 'password' },
    { key: 'confirmPassword', value: 'confirmPassword' },
]

const { validateForm, doPasswordsMatch} = useFormValidation(requiredFields);
const { createData, loading, api } = useApi();
const router = useRouter();
const route = useRoute()
const { success, error } = useToast()
const handleResetPassword = async (e: any) => {
    e.preventDefault();
    try {
        let token = route.query['token']
    const formData: ResetPasswordForm = {
        password: password.value,
        confirmPassword: confirmPassword.value,
    };
    if (!validateForm(formData)) return;
    if (doPasswordsMatch(formData.password, formData.confirmPassword)) {
        const res = await createData({
            url: `${api.resetPassword}/?token=${token}`,
            payload: {
                password : password.value,
            },
        });
        if (res.status === 201) {
            success(res?.data?.message)
            if (res?.data?.data?.token) {
                router.push(`/login`);
            }
        } else {
            console.log(res?.data)
            error(res?.data?.message ?? "Failed!")
        }
      
    }else{
        error('Password Not match.')
        return
    }
    } catch (err:any) {
        error(err?.message ?? "")
    }
};
</script>

<style scoped></style>