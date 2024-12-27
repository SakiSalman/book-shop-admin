import type { UserRole } from "./Enums";

export interface User {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    books: string[];
}
