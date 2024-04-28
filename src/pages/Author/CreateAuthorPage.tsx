import {Box, Button, Container, Flex, Heading, Section, TextField} from "@radix-ui/themes";
import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useCreateAuthor} from "../../QueryHooks/Author/useCreateAuthor.ts";
import {toast} from "react-toastify";

interface ICreatePublicationForm {
    firstName: string
    lastName: string
    patronymic: string
    institution: string
    positionAndTitles: string
}

const CreateAuthorPage: React.FC = () => {
    const {register, handleSubmit, reset} = useForm<ICreatePublicationForm>();

    const {mutate, isPending} = useCreateAuthor({
        onSuccess: (data) => {
            toast.success(`Автор ${data.data.fullName} успешно создан!`)

            reset()
        },
        onError: (data) => toast.error(data.response?.data.message),
    });

    const onSubmitHandle: SubmitHandler<ICreatePublicationForm> = async (data: CreateNewAuthorDto) => {
        mutate({
            firstName: data.firstName,
            lastName: data.lastName,
            positionAndTitles: data.positionAndTitles,
            patronymic: data.patronymic,
            institution: data.institution
        });
    }

    return (
        <Section>
            <Container>
                <Flex direction={'column'} gap={'4'}>
                    <Heading>Создание нового автора</Heading>
                    <Box>
                        <form onSubmit={handleSubmit(onSubmitHandle)}>
                            <Flex direction={'column'} gap={"3"}>
                                <TextField.Root placeholder={"Имя"} {...register('firstName', {required: true})} />

                                <TextField.Root placeholder={"Фамилия"} {...register('lastName', {required: true})} />

                                <TextField.Root
                                    placeholder={"Отчество"} {...register('patronymic', {required: true})} />

                                <TextField.Root
                                    placeholder={"Положение и титулы"} {...register('positionAndTitles', {required: true})} />

                                <TextField.Root
                                    placeholder={"Учреждение"} {...register('institution', {required: true})} />

                                <Button disabled={isPending} style={{cursor: 'pointer'}}>Создать нового автора</Button>
                            </Flex>
                        </form>
                    </Box>
                </Flex>
            </Container>
        </Section>
    )
}

export default CreateAuthorPage;