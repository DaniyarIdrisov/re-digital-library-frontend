import {MutationOptions, useMutation} from "@tanstack/react-query";
import {AxiosResponse} from "axios";
import PublicationService from "../../services/PublicationService.ts";

const key = 'createNewPublication';

export const useCreatePublication = (options?: MutationOptions<AxiosResponse<IPublication>, AxiosResponse<IException>, CreateNewPublicationDto>) => {
    return useMutation({
        mutationKey: [key],
        mutationFn: (publication: CreateNewPublicationDto) => {
            return PublicationService.createNewPublication(publication)
        },
        ...options
    });
}