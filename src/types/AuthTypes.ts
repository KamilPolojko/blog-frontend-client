export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface RegisterResponse {
    success: boolean;
    message: string;
}
