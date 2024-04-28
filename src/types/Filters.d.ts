// declare type FilterState = "ON_APPROVE" | "CREATED" | "REJECTED" | "ALL"

declare enum FilterState {
    ON_APPROVE = 'ON_APPROVE',
    CREATED = 'CREATED',
    REJECTED = 'REJECTED',
    ALL = 'ALL',
}

declare interface GetPublications {
    state: FilterState
    topic?: string
    keywords: string[]
}