import {AxiosResponse} from "axios";
import {api} from "../configs/api.ts";

interface AuthorServiceInterface {
    createNewAuthor(data: CreateNewAuthorDto): Promise<AxiosResponse<IAuthor>>

    getAllAuthors(data: GetAuthorsDto): Promise<AxiosResponse<IAuthor[]>>

    getAuthorByAuthorId(authorId: string): Promise<AxiosResponse<IAuthor>>
}

class AuthorService implements AuthorServiceInterface {
    async createNewAuthor(data: CreateNewAuthorDto): Promise<AxiosResponse<IAuthor>> {
        return await api.post('/api/v1/author', data);
    }

    async getAllAuthors(data: GetAuthorsDto): Promise<AxiosResponse> {
        return await api.get('/api/v1/author', {
            params: data
        })
    }

    async getAuthorByAuthorId(authorId: string): Promise<AxiosResponse<IAuthor>> {
        return await api.get(`/api/v1/author/${authorId}`)
    }
}

export default new AuthorService();