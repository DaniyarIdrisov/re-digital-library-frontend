import {QueryOptions, useQuery} from "@tanstack/react-query";
import PublicationService from "../../services/PublicationService.ts";

const key = 'getPublication';

export const usePublication = (options?: QueryOptions) => {
    return useQuery({
        queryKey: [key],
        queryFn: (publicationId: string) => PublicationService.getById(publicationId),
        ...options
    });
}