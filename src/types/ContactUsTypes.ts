// types/ContactUsTypes.ts
export interface ContactUsRequest {
    Name: string;
    Email: string;
    Subject: string;
    Message: string;
}

export interface ContactUsResponse {
    success: boolean;
    message: string;
}
