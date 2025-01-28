export interface AuthorItemModel {
    name: string;
    slug?: string;
    bio: string;
    photo?: string | File | null | undefined;
    genres?: string[];
    books?: string[];
    website?: string;
    email?: string;
    socialLinks?: string[];
    createdAt?: Date;
    updatedAt?: Date;
  }
  