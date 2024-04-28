import {faker} from "@faker-js/faker/locale/ru";

export const getAuthor = (): IAuthor => {
    return {
        createdAt: faker.date.anytime().toDateString(),
        updatedAt: faker.date.anytime().toDateString(),
        positionAndTitles: faker.lorem.words(10),
        fullName: faker.person.fullName(),
        state: 'ON_APPROVE',
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        patronymic: faker.person.middleName(),
        institution: faker.company.name(),
        id: faker.string.uuid(),
    };
}

export const getAuthors = (size: number): IAuthor[] => {
    return new Array(size).fill(null).map(() => getAuthor());
}

export const getKeyWord = (): IKeyword => {
    return {
        keyword: faker.lorem.word(),
        id: faker.string.uuid(),
    }
}

export const getKeyWords = (size: number): IKeyword[] => {
    return new Array(size).fill(null).map(() => getKeyWord());
}

export const getPublication = (): IPublication => {
    return {
        id: faker.string.uuid(),
        createdAt: faker.date.anytime().toDateString(),
        updatedAt: faker.date.anytime().toDateString(),
        topic: faker.lorem.words(5),
        orderAuthors: getAuthor().fullName,
        resume: faker.word.words(300),
        literaryReferences: faker.commerce.productName(),
        code: faker.definitions.metadata.code,
        filename: faker.system.directoryPath(),
        organization: faker.company.name(),
        state: 'ON_APPROVE',
        keywords: getKeyWords(12),
        authors: getAuthors(3),
    }
}
export const getPublications = (size: number): IPublication[] => {
    return new Array(size).fill(null).map(() => getPublication());
}

export const getUser = (): IUser => {
    return {
        id: faker.string.uuid(),
        createdAt: faker.date.anytime().toDateString(),
        updatedAt: faker.date.anytime().toDateString(),
        email: faker.internet.email(),
        fullName: faker.person.fullName(),
        roles: [
            'USER'
        ],
    }
}