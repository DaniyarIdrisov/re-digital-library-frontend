declare interface SignUpDto {
    email: string;
    password: string;
    fullName: string;
}

declare interface SignInDto {
    email: string;
    password: string;
}

declare interface IToken {
    accessToken: string;
    refreshToken: string;
}

declare interface IUser {
    id: string
    createdAt: string
    updatedAt: string
    email: string
    fullName: string
    roles: string[]
}

declare interface RefreshTokenDto {
    refreshToken: string
}