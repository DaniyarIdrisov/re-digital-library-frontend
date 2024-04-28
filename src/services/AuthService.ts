import {api} from "../configs/api.ts";
import {AxiosResponse} from "axios";

interface AuthServiceInterface {
    signUp(data: SignUpDto): Promise<AxiosResponse>;

    signIn(data: SignInDto): Promise<AxiosResponse>;

    getAccountByToken(): Promise<AxiosResponse<IUser>>;

    refreshToken(data: RefreshTokenDto): Promise<AxiosResponse<IToken>>
}

class AuthService implements AuthServiceInterface {
    async signUp(data: SignUpDto): Promise<AxiosResponse<IUser>> {
        return await api.post('/api/v1/auth/signUp', data);
    }

    async signIn(data: SignInDto): Promise<AxiosResponse<IToken>> {
        return await api.post('/api/v1/auth/signIn', data)
    }

    async getAccountByToken(): Promise<AxiosResponse<IUser>> {
        return await api.get('/api/v1/account/token');
    }

    async refreshToken(data: RefreshTokenDto): Promise<AxiosResponse<IToken>> {
        return await api.post('/api/v1/auth/refresh-token', data)
    }
}

export default new AuthService();
