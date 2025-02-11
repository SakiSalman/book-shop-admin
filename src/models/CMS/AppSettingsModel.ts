export interface AppSettingsModel {
    _id?: string;
    logo: string | File | null | undefined;
    desktopLogoWidth : number;
    mobileLogoWidth : number;
    desktopFooterLogoWidth: number;
    mobileFooterLogoWidth: number;
    primaryColor : string;
    secondaryColor : string;
    textColor : string;
    grayBg:string;
    createdAt?: string;
    updatedAt?: string;
}
