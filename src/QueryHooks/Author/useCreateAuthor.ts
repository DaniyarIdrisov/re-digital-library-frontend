import {MutationOptions, useMutation} from "@tanstack/react-query";
import {AxiosError, AxiosResponse} from "axios";
import AuthorService from "../../services/AuthorService.ts";

const key = 'createAuthor';

export const useCreateAuthor = (options?: MutationOptions<AxiosResponse<IAuthor>, AxiosError<IException>, CreateNewAuthorDto>) => {
    return useMutation({
        mutationKey: [key],
        mutationFn: (data: CreateNewAuthorDto) => {
            return AuthorService.createNewAuthor(data)
        },
        ...options
    });
}