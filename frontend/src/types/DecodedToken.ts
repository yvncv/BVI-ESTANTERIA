import { User } from "./User";

export interface DecodedToken {
    user: User;
    // Puedes agregar más propiedades si tu token las tiene
}