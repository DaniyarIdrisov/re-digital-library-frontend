declare interface IAuthor {
    id: string
    createdAt: string | null
    updatedAt: string | null
    firstName: string
    lastName: string
    patronymic: string
    institution: string
    positionAndTitles: string
    fullName: string
    state: string
    request?: IRequest
}

declare interface CreateNewAuthorDto {
    firstName: string
    lastName: string
    patronymic: string
    institution: string
    positionAndTitles: string
}

declare interface GetAuthorsDto {
    state: string
    fullName?: string
}