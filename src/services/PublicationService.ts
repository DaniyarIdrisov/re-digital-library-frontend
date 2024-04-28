import {AxiosResponse} from "axios";
import {api} from "../configs/api.ts";

interface PublicationServiceInterface {
    getAll(filter: GetPublications): Promise<AxiosResponse<IPublication[]>>

    getById(publicationId: string): Promise<AxiosResponse>

    createNewPublication(publication: CreateNewPublicationDto): Promise<AxiosResponse>

    generateKeywordsByPublicationId(publicationId: string): Promise<AxiosResponse>

    getPublicationByRequestId(requestId: string): Promise<AxiosResponse>

    getPublicationByAuthorId(authorId: string): Promise<AxiosResponse>

    setKeywordsByPublicationId(publicationId: string, keywords: string[]): Promise<AxiosResponse>

    uploadPublicationFile(file: File): Promise<AxiosResponse>;

    getPublicationFile(filename: string): Promise<AxiosResponse>
}

class PublicationService implements PublicationServiceInterface {
    async getAll(filter: GetPublications): Promise<AxiosResponse<IPublication[]>> {
        return await api.post("/api/v1/publication/list", filter)
    }

    async getById(publicationId: string): Promise<AxiosResponse> {
        return await api.get(`/api/v1/publication/${publicationId}`);
    }

    async createNewPublication(publication: CreateNewPublicationDto): Promise<AxiosResponse<IPublication>> {
        return await api.post('/api/v1/publication', publication);
    }

    async generateKeywordsByPublicationId(publicationId: string): Promise<AxiosResponse> {
        return await api.get(`/api/v1/publication/${publicationId}/generateKeywords`);
    }

    async getPublicationByAuthorId(authorId: string): Promise<AxiosResponse> {
        return await api.get(`/api/v1/publication/author/${authorId}`);
    }

    async getPublicationByRequestId(requestId: string): Promise<AxiosResponse> {
        return await api.get(`/api/v1/publication/request/${requestId}`);
    }

    async setKeywordsByPublicationId(publicationId: string, keywords: string[]): Promise<AxiosResponse> {
        return await api.post(`/api/v1/publication/${publicationId}/setKeywords`, keywords);
    }

    async uploadPublicationFile(file: File): Promise<AxiosResponse> {
        const formData = new FormData();

        formData.append('file', file);

        return await api.post('/api/v1/file', formData, {
            headers: {
                'Content-Type': "multipart/form-data",
            }
        })
    }

    async getPublicationFile(filename: string): Promise<AxiosResponse> {
        return await api.get(`/api/v1/file?filename=${filename}`)
    }
}

export default new PublicationService();