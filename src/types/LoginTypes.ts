import { ProfileType} from "./ClientTypes";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface User {
    id: string;
    email: string;
    username: string;
    profile: ProfileType;
}

export interface LoginResponse {
    success?: boolean;
}
