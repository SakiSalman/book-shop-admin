import { isFile } from "./validations"

export const convertFilPreview = (file:File) => {
    if (isFile(file)) {
        return URL.createObjectURL(file)
    }
}