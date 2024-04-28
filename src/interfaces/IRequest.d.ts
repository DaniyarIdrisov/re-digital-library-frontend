declare interface IRequest {
    id: string;
    createdAt: string;
    updatedAt: string;
    state: string;
    comment: string;
    type: string;
    createdBy: IAuthor;
}