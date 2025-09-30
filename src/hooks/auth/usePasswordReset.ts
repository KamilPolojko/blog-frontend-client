import { api } from '@/request';
import { useMutation } from '@tanstack/react-query';
import { API_ROUTES } from '@/routes/api_routes';

interface PasswordResetRequest {
    email: string;
}


export const sendPasswordResetCode = async (payload: PasswordResetRequest): Promise<void> => {
    await api.post<void>(API_ROUTES.AUTH.RESET_PASSWORD, payload);

};

export const usePasswordReset = () => {

    return useMutation({
        mutationFn: sendPasswordResetCode,
        onSuccess: () => {
            console.log('Kod weryfikacyjny został wysłany');
        },
        onError: (error) => {
            console.error('Błąd przy wysyłaniu kodu weryfikacyjnego:', error);
        }
    });
};