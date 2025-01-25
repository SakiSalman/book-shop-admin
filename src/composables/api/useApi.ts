import { inject, reactive, ref } from "vue";
import axios, { AxiosError } from "axios";
import api from "../../../config/api.json";
import useToast from "../utils/useToast";
import { getToken } from "@/utils/commonUtils";
import { useFormValidation } from "../form/useFormValidation";
import type { Field } from "@/models/CommonModels";
import Swal from 'sweetalert2'; // Import SweetAlert2 for typing
interface ValidationErrors {
    [key: string]: string;
}
export function useApi<T>() {
    const data = ref<T | null>(null);
    const loading = ref<Boolean>(false);
    const error = ref<string | null>(null);
    const serverURL = inject<string>("serverURL");
    const token = getToken();
    const {warning} = useToast()
    const swal = inject('$swal') as typeof Swal | undefined; 
    const getHeaders = (
        isFormData: boolean = false
    ): Record<string, string> => ({
        "Content-Type": isFormData ? "multipart/form-data" : "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    });

    const fetchData = async (url: string): Promise<void> => {
        loading.value = true;
        try {
            const response = await axios.get(`${serverURL}/api/v1/${url}`, {
                headers: getHeaders(),
            });
            return response.data;
        } catch (err) {
            const axiosError = err as AxiosError;
            error.value = axiosError.response
                ? JSON.stringify(axiosError.response.data)
                : axiosError.message;
        } finally {
            loading.value = false;
        }
    };

    const createData = async ({
        url,
        payload,
        isFormData = false,
    }: {
        url: string;
        payload: Record<string, any>;
        isFormData?: boolean;
    }): Promise<any> => {
        loading.value = true;  try {
            let formData: FormData | Record<string, any> = payload;
            if (isFormData && !(payload instanceof FormData)) {
                formData = new FormData();
                Object.keys(payload).forEach((key) => {
                    formData.append(key, payload[key]);
                });
            }
            const response:any = axios.post(
                `${serverURL}/api/v1/${url}`,
                formData,
                {
                    headers: getHeaders(isFormData),
                }
            );

            data.value = response.data;
            error.value = null;
            return response;
        } catch (err) {
            const axiosError = err as AxiosError;
            error.value = axiosError.response
                ? JSON.stringify(axiosError.response.data)
                : axiosError.message;
            return axiosError.response || err;
        } finally {
            loading.value = false;
        }

    };

    const updateData = async (
       {
        url,
        payload,
        isFormData=false
       }:{
        url: string | number,
        payload: Record<string, any>,
        isFormData: boolean
       }
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
            const response = await axios.patch(
                `${serverURL}/api/v1/${url}`,
                formData,
                {
                    headers: getHeaders(isFormData),
                }
            );
            data.value = response.data;
            error.value = null;
            return response;
        } catch (err) {
            const axiosError = err as AxiosError;
            error.value = axiosError.response
                ? JSON.stringify(axiosError.response.data)
                : axiosError.message;
        } finally {
            loading.value = false;
        }
    };

    const deleteData = async (url: string | number): Promise<any> => {
        const result = await Swal.fire({
            title: "Are you sure you want to delete this item?",
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            icon: "error",
        });
        if (result.isConfirmed) {
            loading.value = true; // Start loading only if confirmed
            try {
               let response =  await axios.delete(`${serverURL}/api/v1/${url}`, {
                    headers: getHeaders(),
                });
                error.value = null;
                Swal.fire("Deleted!", "The item has been successfully deleted.", "success");
                return response
            } catch (err) {
                const axiosError = err as AxiosError;
                error.value = axiosError.response
                    ? JSON.stringify(axiosError.response.data)
                    : axiosError.message;
                Swal.fire("Error", "Failed to delete the item. Please try again.", "error");
            } finally {
                loading.value = false; // Stop loading in all cases
            }
        }
    };
    
    const validateForm = (
        data: Record<string, any>,
        requiredFields: Field[]
    ): { isValid: boolean; missingFields: string[] } => {
        const missingFields: string[] = [];
    
        for (const field of requiredFields) {
            if (!data[field.key]) {
                warning(`${field.value} is required.`);
                missingFields.push(field.value);
            }
        }
    
        return { isValid: missingFields.length === 0, missingFields };
    };
    
    const handleSubmit = async ({
        url,
        payload,
        isFormData = false,
        requiredFields,
    }: {
        url: string;
        payload: any;
        isFormData: boolean;
        requiredFields: Field[];
    }) => {
        loading.value = true;
    
        try {
            const { isValid, missingFields } = validateForm(payload, requiredFields);
    
            if (!isValid) {
                return {
                    status: 'validation_failed',
                    message: `Validation failed. Please fill all required fields: ${missingFields.join(', ')}.`,
                    missingFields,
                };
            }
    
            let formData: FormData | Record<string, any> = payload;
    
            if (isFormData && !(payload instanceof FormData)) {
                formData = new FormData();
                Object.keys(payload).forEach((key) => {
                    formData.append(key, payload[key]);
                });
            }

            const response = await createData({
                url: url,
                payload: formData,
                isFormData: isFormData,
            });
    
            error.value = null;
            return response;
        } catch (err) {
            const axiosError = err as AxiosError;
            error.value = axiosError.response
                ? JSON.stringify(axiosError.response.data)
                : axiosError.message;
            throw axiosError;
        } finally {
            loading.value = false;
        }
    };
    const handleUpdate = async ({
        url,
        payload,
        isFormData = false,
        requiredFields,
    }: {
        url: string;
        payload: any;
        isFormData: boolean;
        requiredFields: Field[];
    }) => {
        loading.value = true;
        try {
            const { isValid, missingFields } = validateForm(payload, requiredFields);
    
            if (!isValid) {
                return {
                    status: 'validation_failed',
                    message: `Validation failed. Please fill all required fields: ${missingFields.join(', ')}.`,
                    missingFields,
                };
            }
    
            let formData: FormData | Record<string, any> = payload;
    
            if (isFormData && !(payload instanceof FormData)) {
                formData = new FormData();
                Object.keys(payload).forEach((key) => {
                    formData.append(key, payload[key]);
                });
            }
    
            const response = await updateData({
                url: url,
                payload: formData,
                isFormData: isFormData,
            });
    
            error.value = null;
            return response;
        } catch (err) {
            const axiosError = err as AxiosError;
            error.value = axiosError.response
                ? JSON.stringify(axiosError.response.data)
                : axiosError.message;
            throw axiosError;
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
        api,
        handleSubmit,
        handleUpdate
    };
}
