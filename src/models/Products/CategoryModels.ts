export interface CategoryItemModel {
    _id?: string;
    name: string;
    slug?:string
    description: string;
    icon : File | string | null | undefined;
    parentCategory? : string | null
  }
  