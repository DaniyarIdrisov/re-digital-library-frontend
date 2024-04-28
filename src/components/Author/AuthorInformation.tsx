import React, {useEffect, useState} from "react";
import AuthorService from "../../services/AuthorService.ts";
import {Box, Flex, Heading, Strong, Text} from "@radix-ui/themes";

interface AuthorInformation {
    authorId: string
}

const AuthorInformation: React.FC<AuthorInformation> = ({authorId}) => {
    const [author, setAuthor] = useState<IAuthor>();

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);

        AuthorService
            .getAuthorByAuthorId(authorId)
            .then((response) => {
                setAuthor(response.data);
                setIsLoading(false)
            });
    }, [authorId]);

    if (isLoading) {
        return (
            <Box>
                <Heading as={'h3'} size={'2'}>
                    Загрузка информации об авторе
                </Heading>
            </Box>
        )
    }

    return (
        <Box>
            <Flex direction={'column'} gap={'1'}>
                <Text size={'4'}>Фамилия: <Strong>{author?.lastName}</Strong></Text>
                <Text size={'4'}>Имя: <Strong>{author?.firstName}</Strong></Text>
                <Text size={'4'}>Отчество: <Strong>{author?.patronymic}</Strong></Text>
                <Text size={'4'}>Учреждение: <Strong>{author?.institution}</Strong></Text>
                <Text size={'4'}>Положение: <Strong>{author?.positionAndTitles}</Strong></Text>


            </Flex>
        </Box>
    )
}

export default AuthorInformation;