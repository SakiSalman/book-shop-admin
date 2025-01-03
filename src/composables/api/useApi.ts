import { inject, reactive, ref } from 'vue';
import axios, { AxiosError } from 'axios';
import api from '../../../config/api.json'
import useToast from '../utils/useToast';
import { getToken } from '@/utils/commonUtils';
export function useApi<T>() {
    const data = ref<T | null>(null);
    const loading = ref<Boolean>(false);
    const error = ref<string | null>(null);
    const serverURL = inject<string>('serverURL');
    const token = getToken()
    const getHeaders = (isFormData: boolean = false): Record<string, string> => ({
        'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
    });

    const fetchData = async (url:string): Promise<void> => {
        loading.value = true;
        try {
            const response = await axios.get(`${serverURL}/api/v1/${url}`, {
                headers: getHeaders()
            });
            return response.data
        } catch (err) {
            const axiosError = err as AxiosError;
            error.value = axiosError.response ? JSON.stringify(axiosError.response.data) : axiosError.message;
        } finally {
            loading.value = false;
        }
    };
    
    const createData = async (
        { url, payload, isFormData = false }: { url: string; payload: Record<string, any>; isFormData?: boolean }
    ): Promise<any> => {  
        loading.value = true;
        try {
            let formData: FormData | Record<string, any> = payload;
            if (isFormData && !(payload instanceof FormData)) {
                formData = new FormData();
                Object.keys(payload).forEach((key) => {
                    formData.append(key, payload[key]);
                });
            }
            const response = await axios.post(`${serverURL}/api/v1/${url}`, formData, {
                headers: getHeaders(isFormData),
            });
    
            data.value = response.data;
            error.value = null;
    
            return response; 
        } catch (err) {
            const axiosError = err as AxiosError;
            error.value = axiosError.response ? JSON.stringify(axiosError.response.data) : axiosError.message;
            return axiosError.response || err; 
        } finally {
            loading.value = false;
        }
    };
    

    const updateData = async (url: string | number, payload: Record<string, any>, isFormData: boolean = false): Promise<void> => {
        loading.value = true;
        try {
            let formData: FormData | Record<string, any> = payload;
            if (isFormData && !(payload instanceof FormData)) {
                formData = new FormData();
                Object.keys(payload).forEach((key) => {
                    formData.append(key, payload[key]);
                });
            }
            const response = await axios.put(`${serverURL}/api/v1/${url}`, formData, {
                headers: getHeaders(isFormData)
            });
            data.value = response.data;
            error.value = null;
        } catch (err) {
            const axiosError = err as AxiosError;
            error.value = axiosError.response ? JSON.stringify(axiosError.response.data) : axiosError.message;
        } finally {
            loading.value = false;
        }
    };

    const deleteData = async (url: string | number): Promise<void> => {
        loading.value = true;
        try {
            await axios.delete(`${serverURL}/api/v1/${url}`, {
                headers: getHeaders()
            });
            error.value = null;
        } catch (err) {
            const axiosError = err as AxiosError;
            error.value = axiosError.response ? JSON.stringify(axiosError.response.data) : axiosError.message;
        } finally {
            loading.value = false;
        }
    };

    return {
        data,
        loading,
        error,
        fetchData,
        createData,
        updateData,
        deleteData,
        api
    };
}
