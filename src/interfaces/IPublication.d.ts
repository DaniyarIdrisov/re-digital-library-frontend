declare enum PublicationStateTypes {
    ON_APPROVE = 'ON_APPROVE',
    CREATED = 'CREATED',
    REJECTED = 'REJECTED',
}

declare interface IPublication {
    id: string;
    createdAt: string;
    updatedAt: string;
    topic: string;
    orderAuthors: string;
    resume: string;
    literaryReferences: string;
    code: string;
    filename: string;
    organization: string;
    state: string;
    keywords: IKeyword[],
    authors: IAuthor[],
}

declare interface CreateNewPublicationDto {
    topic: string;
    filename: ?string;
    literaryReferences: string;
    organization: string;
    resume: string;
    authorIds: string[],
}