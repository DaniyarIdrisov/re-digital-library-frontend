import {QueryOptions, useQuery} from '@tanstack/react-query';
import AuthService from "../services/AuthService.ts";

const key = 'getAccount';

export const useAccount = (options?: QueryOptions) => {
    return useQuery({
        queryKey: [key],
        queryFn: () => AuthService.getAccountByToken(),
        ...options,
    });
}