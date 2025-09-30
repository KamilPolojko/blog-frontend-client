import { useMutation } from '@tanstack/react-query';
import { api } from '@/request';
import { API_ROUTES } from '@/routes/api_routes';

interface VerifyCodeRequest {
    code: string;
}

interface VerifyCodeResponse {
    success: boolean;
    userId: string | null;
}


export const verifyCode = async (payload: VerifyCodeRequest): Promise<VerifyCodeResponse> => {
    const { data } = await api.post<VerifyCodeResponse>(API_ROUTES.AUTH.VERIFY_CODE, payload);

    if (!data.success) {
        throw new Error();
    }

    return data;
};

export const useVerifyCode = () => {
    return useMutation({
        mutationFn: verifyCode,
    });
};