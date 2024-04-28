import {MutationOptions, useMutation} from "@tanstack/react-query";
import {AxiosError, AxiosResponse} from "axios";
import AuthorService from "../../services/AuthorService.ts";

const key = 'getAllAuthors';

export const useGetAllAuthors = (options?: MutationOptions<AxiosResponse<IAuthor[]>, AxiosError<IException>, GetAuthorsDto>) => {
    return useMutation({
        mutationKey: [key],
        mutationFn: (data: GetAuthorsDto) => AuthorService.getAllAuthors(data),
        ...options
    });
}