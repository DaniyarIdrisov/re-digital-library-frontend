import React, {useEffect, useState} from "react";
import {Badge, Box, Button, Container, Flex, Grid, Heading, Section, TextField} from "@radix-ui/themes";
import {MagnifyingGlassIcon} from "@radix-ui/react-icons";
import {usePublications} from "../../QueryHooks/Publication/usePublications.ts";
import PublicationCard from "./PublicationCard.tsx";

interface ISearch {
    topic: string
    keywords: string
}

const PublicationList: React.FC = () => {
    const [publications, setPublications] = useState<IPublication[]>([]);

    const [keywords, setKeywords] = useState<string[]>([]);

    const [wait, setWait] = useState<boolean>(true);

    const [search, setSearch] = useState<ISearch>({
        topic: '',
        keywords: '',
    });

    const {mutate, isPending} = usePublications({
        onSuccess: (data) => {
            setWait(false);

            setPublications(data.data);

            setSearch({
                topic: '',
                keywords: ''
            });

            setKeywords([]);
        }
    });

    const onSubmitHandle = (event) => {
        event.preventDefault();

        let body = {
            state: 'CREATED',
            keywords: keywords,
        }

        if (search.topic) {
            body.topic = search.topic;
        }

        mutate(body)
    }

    useEffect(() => {
        if (search.keywords.includes(',') && search.keywords.length > 1) {
            setKeywords((prev) => [...prev, search.keywords.split(',')[0]])

            setSearch((prev) => ({
                ...prev,
                keywords: ''
            }))
        }

    }, [search.keywords]);

    const onSearchHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value,
            }
        })
    }

    // const onClickRemoveKeyword = (index) => {
    //
    // }

    return (
        <Section>
            <Container>
                <Flex justify='start' gap={"4"} direction={"column"} align={'center'} mb={"32px"}>
                    <Heading size={"7"}>Каталог публикаций</Heading>

                    <Box width={'100%'}>
                        <form onSubmit={(e) => onSubmitHandle(e)}>
                            <Flex width={'100%'} gap={'2'} direction={'column'}>
                                <Box>
                                    <TextField.Root name={'topic'} placeholder="Поиск работы по названию темы"
                                                    value={search.topic}
                                                    onChange={(e) => onSearchHandle(e)}>
                                        <TextField.Slot>
                                            <MagnifyingGlassIcon height="16" width="16"/>
                                        </TextField.Slot>
                                    </TextField.Root>
                                </Box>

                                <Box>
                                    <TextField.Root name={'keywords'}
                                                    placeholder="Поиск работы по ключевым словам (через запятую)"
                                                    value={search.keywords}
                                                    onChange={(e) => onSearchHandle(e)}>
                                        <TextField.Slot>
                                            <MagnifyingGlassIcon height="16" width="16"/>
                                        </TextField.Slot>
                                    </TextField.Root>

                                    <Flex>
                                        {
                                            keywords.map((keyword) => {
                                                return (
                                                    <Badge>{keyword}</Badge>
                                                )
                                            })
                                        }
                                    </Flex>
                                </Box>

                                <Button>Найти</Button>
                            </Flex>
                        </form>
                    </Box>
                </Flex>

                {
                    wait && <Flex direction={'column'} align={'center'} justify={'center'}>
                        <Heading>Введите поисковое значение</Heading>
                    </Flex>
                }

                {
                    isPending && !wait ? <Flex direction={'column'} align={'center'} justify={'center'}>
                        <Heading>Загрузка...</Heading>
                    </Flex> : <Grid className={'publications'} columns={'3'} gap={'3'}>
                        {
                            publications.map((publication: IPublication) => {
                                return <PublicationCard
                                    key={publication.id}
                                    publication={publication}
                                />
                            })
                        }
                    </Grid>
                }


            </Container>
        </Section>
    )
}

export default PublicationList;