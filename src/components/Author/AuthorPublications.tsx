import {Box, Flex, Heading, Text} from "@radix-ui/themes";
import React, {useEffect, useState} from "react";
import PublicationService from "../../services/PublicationService.ts";
import {truncate} from "../../utils/tools.ts";
import {NavLink} from "react-router-dom";

interface AuthorPublications {
    authorId: string
}

const AuthorPublications: React.FC<AuthorPublications> = ({authorId}) => {
    const [publications, setPublications] = useState<IPublication[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        setIsLoading(true);

        PublicationService
            .getPublicationByAuthorId(authorId)
            .then(r => setPublications(r.data))
            .then(() => setIsLoading(false))
    }, [authorId]);

    if (isLoading) {
        return (
            <Box>
                <Heading>Загрузка публикаций с автором</Heading>
            </Box>
        )
    }

    return (
        <Box mt={'3'}>
            <Heading as={'h4'} size={'4'}>Публикации с автором</Heading>

            <Flex direction={'column'}>
                {
                    publications.map((publication) => {
                        return (
                            <Box>
                                <Text>{truncate(publication.topic, 80)}</Text>
                                <NavLink to={`/publications/${publication.id}`}>Читать подробнее</NavLink>
                            </Box>
                        )
                    })
                }
            </Flex>
        </Box>
    );
}

export default AuthorPublications;