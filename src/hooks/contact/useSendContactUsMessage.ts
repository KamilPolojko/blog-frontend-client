import { useMutation } from '@tanstack/react-query';
import { api } from '@/request';
import {ContactUsRequest, ContactUsResponse} from "@/types/ContactUsTypes";
import {API_ROUTES} from "@/routes/api_routes";

export const sendContactUsMessage = async (payload: ContactUsRequest) => {
    try {
        const { data } = await api.post<ContactUsResponse>(
            API_ROUTES.CONTACT.CONTACT_US,
            payload
        );
        return data;
    } catch (error) {
        console.error('Send contact message error:', error);
        throw error;
    }
};

export const useSendContactUsMessage = () => {
    return useMutation({
        mutationFn: (payload: ContactUsRequest) => sendContactUsMessage(payload),
    });
};
