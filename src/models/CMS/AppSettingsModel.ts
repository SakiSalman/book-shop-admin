export interface AppSettingsModel {
    _id?: string;
    logo: string | File | null | undefined;
    primaryColor : string;
    secondaryColor : string;
    grayBg:string;
    createdAt?: string;
    updatedAt?: string;
}
