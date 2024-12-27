// src/utils/useSwal.ts
import { inject } from 'vue';
import Swal from 'sweetalert2'; // Import SweetAlert2 for typing

const useToast = () => {
  const swal = inject('$swal') as typeof Swal | undefined; 

  if (!swal) {
    throw new Error('VueSweetalert2 is not properly injected');
  }

const success = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    swal.fire({
        title: '',
        text: message,
        icon: type,
        confirmButtonText: 'OK',
      });
}
const error = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'error') => {
    swal.fire({
        title: '',
        text: message,
        icon: type,
        confirmButtonText: 'OK',
      });
}
const warning = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'warning') => {
    swal.fire({
        title: '',
        text: message,
        icon: type,
        confirmButtonText: 'OK',
      });
}
const info = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    swal.fire({
        title: '',
        text: message,
        icon: type,
        confirmButtonText: 'OK',
      });
}


  return {
    success,
    error,
    warning,
    info
  };
};

export default useToast;
