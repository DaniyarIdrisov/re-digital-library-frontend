import {MutationOptions, useMutation} from '@tanstack/react-query';
import AuthService from "../services/AuthService.ts";
import {AxiosResponse} from "axios";

const key = 'signUp';

export const useSignUp = (options?: MutationOptions<AxiosResponse<IUser>, AxiosResponse<IException>, SignUpDto>) => {
    return useMutation({
        mutationKey: [key],
        mutationFn: (data: SignUpDto) => {
            return AuthService.signUp({
                email: data.email,
                password: data.password,
                fullName: data.fullName,
            })
        },
        ...options,
    });
}