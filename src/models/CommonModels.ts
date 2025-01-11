import type { User } from "./UserModels";

export interface ImageInterface {
    path: File | string;
}

export interface GlobalInterface {
    loading : boolean
    user : User | null
}

export interface Field {
    key: string;
    value: string;
}