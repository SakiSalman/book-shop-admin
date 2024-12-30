export function useGuard(to: any, from: any, next: any) {
    const token = localStorage.getItem('token');
    if(token) {
        next();
    }
    else {
        next('/login');
    }
}

export function useGuestGuard(to: any, from: any, next: any) {
    const token = localStorage.getItem('token');
    if (token) {
        next('/');
    } else {
        next();
    }
}
