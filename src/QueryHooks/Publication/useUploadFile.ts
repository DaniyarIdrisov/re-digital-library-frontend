import {MutationOptions, useMutation} from '@tanstack/react-query';
import {AxiosResponse} from "axios";
import PublicationService from "../../services/PublicationService.ts";

const key = 'uploadPublicationFile';

export const useUploadFile = (options?: MutationOptions<AxiosResponse<string>, AxiosResponse<IException>, File>) => {
    return useMutation({
        mutationKey: [key],
        mutationFn: (file: File) => PublicationService.uploadPublicationFile(file),
        ...options,
    });
}