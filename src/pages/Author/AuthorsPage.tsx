import {Button, Card, Container, Flex, Grid, Heading, Section, Text, TextField} from "@radix-ui/themes";
import {useGetAllAuthors} from "../../QueryHooks/Author/useGetAllAuthors.ts";
import {useState} from "react";
import {MagnifyingGlassIcon} from "@radix-ui/react-icons";
import {NavLink} from "react-router-dom";

const AuthorsPage = () => {
    const [searchValue, setSearchValue] = useState<string>('');

    const [wait, setWait] = useState<boolean>(true);

    const {data, mutate, isPending} = useGetAllAuthors();

    const onClickHandle = () => {
        mutate({
            state: "CREATED",
            fullName: searchValue,
        });

        setWait(false);
    }

    const onChangeHandle = (value: string) => {
        setSearchValue(value.trim() ?? '')
    }

    return (
        <Section>
            <Container>
                <Flex direction={'column'} gap={'4'}>
                    <Flex direction={'column'} align={'center'} gap={'4'} justify={'center'}>
                        <Heading as={'h2'}>Список авторов</Heading>

                        <Flex minWidth={'420px'} width={"100%"} gap={'3'} justify={'center'}>
                            <TextField.Root
                                style={{
                                    minWidth: '300px'
                                }}
                                size={'2'}
                                onChange={(event) => onChangeHandle(event.target.value)}
                                placeholder="Поиск работы">
                                <TextField.Slot>
                                    <MagnifyingGlassIcon height="16" width="16"/>
                                </TextField.Slot>
                            </TextField.Root>

                            <Button onClick={onClickHandle}>Найти</Button>
                        </Flex>
                    </Flex>

                    {
                        wait && <Flex direction={'column'} align={'center'} justify={'center'}>
                            <Heading>Введите поисковое значение</Heading>
                        </Flex>
                    }

                    {
                        isPending && !wait ? <Flex direction={'column'} align={'center'} justify={'center'}>
                                <Heading>Загрузка...</Heading>
                            </Flex> :
                            <Grid columns={'3'} gap={'4'}>
                                {
                                    data?.data.map((author) => {
                                        return (
                                            <Card>
                                                <Flex direction={'column'} gap={'3'}>
                                                    <Heading as={'h3'} size={'2'}>
                                                        {author.fullName}
                                                    </Heading>

                                                    <Text>Учреждение: {author.institution}</Text>

                                                    <NavLink to={`/authors/${author.id}`}>
                                                        Ознакомиться с автором
                                                    </NavLink>
                                                </Flex>
                                            </Card>
                                        )
                                    })
                                }
                            </Grid>
                    }


                </Flex>
            </Container>
        </Section>
    )
};

export default AuthorsPage;