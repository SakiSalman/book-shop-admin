import { ref } from 'vue';
import axios, { AxiosError } from 'axios';

interface ApiResponse<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

export function useApi<T>(url: string, token?: string) {
    const data = ref<T | null>(null);
    const loading = ref<boolean>(false);
    const error = ref<string | null>(null);

    const getHeaders = (isFormData: boolean = false): Record<string, string> => ({
        'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
    });

    const fetchData = async (): Promise<void> => {
        loading.value = true;
        try {
            const response = await axios.get(url, {
                headers: getHeaders()
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

    const createData = async (payload: Record<string, any>, isFormData: boolean = false): Promise<void> => {
        loading.value = true;
        try {
            let formData: FormData | Record<string, any> = payload;
            if (isFormData && !(payload instanceof FormData)) {
                formData = new FormData();
                Object.keys(payload).forEach((key) => {
                    formData.append(key, payload[key]);
                });
            }
            const response = await axios.post(url, formData, {
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

    const updateData = async (id: string | number, payload: Record<string, any>, isFormData: boolean = false): Promise<void> => {
        loading.value = true;
        try {
            let formData: FormData | Record<string, any> = payload;
            if (isFormData && !(payload instanceof FormData)) {
                formData = new FormData();
                Object.keys(payload).forEach((key) => {
                    formData.append(key, payload[key]);
                });
            }
            const response = await axios.put(`${url}/${id}`, formData, {
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

    const deleteData = async (id: string | number): Promise<void> => {
        loading.value = true;
        try {
            await axios.delete(`${url}/${id}`, {
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
        deleteData
    };
}
