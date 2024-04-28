import {MutationOptions, useMutation} from '@tanstack/react-query';
import PublicationService from "../../services/PublicationService.ts";
import {AxiosResponse} from "axios";

const key = 'getAllPublications';

export const usePublications = (options?: MutationOptions<AxiosResponse<IPublication[]>, AxiosResponse<IException>, GetPublications>) => {
    return useMutation({
        mutationKey: [key],
        mutationFn: (filter: GetPublications) => {
            return PublicationService.getAll(filter)
        },
        ...options
    });
}