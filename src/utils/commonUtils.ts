import router from "@/router"

export const goRoute = (path:string) => {

    if (path) {
        router.push(path)
    }else{
        alert('path not defined!')
    }
}