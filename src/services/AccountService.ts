import {AxiosResponse} from "axios";
import {api} from "../configs/api.ts";

interface AccountServiceInterface {
    getAllAccounts(): Promise<AxiosResponse>

    getAccountById(id: string): Promise<AxiosResponse>

    getAccountByToken(): Promise<AxiosResponse>

    setRoleAdmin(id: string): Promise<AxiosResponse>
}

class AccountService implements AccountServiceInterface {
    async getAccountById(id: string): Promise<AxiosResponse> {
        return await api.get(`/api/v1/account/${id}`);
    }

    async getAccountByToken(): Promise<AxiosResponse> {
        return await api.get(`/api/v1/account/token`);
    }

    async getAllAccounts(): Promise<AxiosResponse> {
        return await api.get(`/api/v1/account`);
    }

    async setRoleAdmin(id: string): Promise<AxiosResponse> {
        return await api.get(`/api/v1/account/${id}/appointAdmin`);
    }
}

export default new AccountService();