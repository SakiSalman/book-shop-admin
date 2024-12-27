import { ref } from 'vue';

interface Field {
    key: string;
    value: string;
}
  
interface ValidationErrors {
    [key: string]: string;
}

export function useFormValidation(requiredFields: Field[]) {
    const errors = ref<ValidationErrors>({});
    const loading = ref<boolean>(false);

    const validateEmail = (email: string): boolean => {
        return !!email
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const validateForm = (data: Record<string, any>): boolean => {
        loading.value = true;
        errors.value = {};

        for (const field of requiredFields) {
            if (!data[field.key]) {
                errors.value[field.key] = `${field.value} is required.`;
            }
        }

        if (data.email && !validateEmail(data.email)) {
            errors.value.email = 'Invalid email format.';
        }

        loading.value = false;

        return Object.keys(errors.value).length === 0;
    };

    const resetErrors = (): void => {
        errors.value = {};
    };

    return {
        errors,
        loading,
        validateForm,
        resetErrors
    };
}
