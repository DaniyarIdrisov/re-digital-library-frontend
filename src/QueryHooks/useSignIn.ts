import {MutationOptions, useMutation} from '@tanstack/react-query';
import AuthService from "../services/AuthService.ts";
import {AxiosResponse} from "axios";

const key = 'signIn';

export const useSignIn = (options?: MutationOptions<AxiosResponse<IToken>, AxiosResponse<IException>, SignInDto>) => {
    return useMutation({
        mutationKey: [key],
        mutationFn: (data: SignInDto): Promise<AxiosResponse<IToken>> => {
            return AuthService.signIn({
                email: data.email,
                password: data.password,
            })
        },
        ...options
    });
}