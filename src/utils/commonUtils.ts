import router from "@/router"

export const goRoute = (path:string) => {

    if (path) {
        router.push(path)
    }else{
        alert('path not defined!')
    }
}


export const getToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return token
    }else{
        return null
    }
}