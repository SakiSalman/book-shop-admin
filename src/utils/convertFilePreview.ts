import { isFile } from "./validations"

export const convertFilPreview = (file:File | String) => {
    if (isFile(file)) {
        return URL.createObjectURL(file)
    }else{
        return file as string
    }
}