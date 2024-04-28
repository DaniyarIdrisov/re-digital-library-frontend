import {Badge, Box, Container, Flex, Heading, Link, Popover, Section, Skeleton, Text} from "@radix-ui/themes";
import React, {useEffect, useState} from "react";
import {NavLink, useParams} from "react-router-dom";
import PublicationService from "../../services/PublicationService.ts";
import {isNull} from "lodash";
import {BASE_URL} from "../../configs/api.ts";

interface IKeyWords {
    keywords: IKeyword[],
    isLoading: boolean,
}

const KeyWords = ({keywords, isLoading}: IKeyWords) => {
    if (!keywords.length) {
        return;
    }

    const items = keywords.map((keyword: IKeyword) => (
        <Skeleton loading={isLoading}>
            <Badge key={keyword.id}>{keyword.keyword}</Badge>
        </Skeleton>
    ));

    return (
        <Flex mt={'3'} gap={'3'} direction={'column'} className={'keywords'}>
            <Heading size={"2"}>
                Ключевые слова
            </Heading>

            <Flex gap={'2'} wrap={'wrap'}>
                {items}
            </Flex>
        </Flex>
    )
}

interface IAuthors {
    authors: IAuthor[],
    isLoading: boolean
}

const Authors = ({authors, isLoading}: IAuthors) => {
    const items = authors.map((author: IAuthor) => (
            <Skeleton loading={isLoading}>
                <Popover.Root>
                    <Popover.Trigger>
                        <Badge style={{
                            cursor: 'pointer'
                        }} key={author.id}>{author.fullName} - {author.institution} - {author.positionAndTitles}</Badge>
                    </Popover.Trigger>

                    <Popover.Content>
                        <Flex direction={'column'} gap={'2'}>
                            <Heading size={'2'}>Информация об авторе</Heading>

                            <Text size={'2'}>ФИО: {author.fullName}</Text>
                            <Text size={'2'}>Учреждение: {author.institution}</Text>
                            <Text size={'2'}>Должность: {author.positionAndTitles}</Text>
                        </Flex>
                    </Popover.Content>
                </Popover.Root>
            </Skeleton>
        )
    );

    return (
        <Flex mt={'3'} gap={'3'} direction={'column'} className={'keywords'}>
            <Heading size={"2"}>
                Авторы
            </Heading>

            <Flex gap={'2'} wrap={'wrap'}>
                {items}
            </Flex>
        </Flex>
    )
}
const PublicationPage: React.FC = () => {

    const params = useParams();

    const publicationId = params.publicationId;

    const [publication, setPublication] = useState<IPublication | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true)

        PublicationService.getById(publicationId as string)
            .then(response => setPublication(response.data))
            .then(() => setIsLoading(false))

    }, [publicationId])

    if (isNull(publication)) {
        return (
            <Section>
                <Container>
                    <Heading size={'9'} mb={'2'}>Публикация не найдена!</Heading>

                    <NavLink to={'/publications'}>Вернутся к списку публикаций</NavLink>
                </Container>
            </Section>
        )
    }

    return (
        <Section className='publication'>
            <Container>
                <Box>
                    <Heading size={'9'} mb={'2'}>{publication.topic}</Heading>

                    <Flex direction={'column'} mt={'4'}>
                        <Box>
                            <Heading size={'2'}>Учреждение: {publication.organization}</Heading>
                        </Box>
                    </Flex>

                    <Box py={'6'}>
                        <Text size={'5'} style={{lineHeight: '1.75'}}>{publication.resume}</Text>
                    </Box>
                    <Authors isLoading={isLoading} authors={publication.authors}/>
                    <KeyWords keywords={publication.keywords} isLoading={isLoading}/>
                    <Box mt={'5'}>
                        <Link download={true} href={`${BASE_URL}/api/v1/file?filename=${publication.filename}`}>
                            Скачать файл публикации
                        </Link>
                    </Box>
                </Box>
            </Container>
        </Section>
    );
};

export default PublicationPage;
