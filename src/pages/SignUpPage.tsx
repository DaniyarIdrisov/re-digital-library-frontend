import React from "react";
import {Box, Button, Container, Flex, Heading, Link, Section, Text, TextField} from "@radix-ui/themes";
import {useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {useSignUp} from "../QueryHooks/useSignUp.ts";
import {toast} from "react-toastify";

type ISignUpPage = {
    email: string
    password: string
    fullName: string
}

const SignUpPage: React.FC = () => {
    const navigate = useNavigate();

    const {register, handleSubmit} = useForm<ISignUpPage>();

    const {isPending, mutate} = useSignUp({
        onSuccess: () => navigate('/sign-in'),
        onError: (error) => toast.error(error.data.message),
    });

    const onSubmit: SubmitHandler<ISignUpPage> = async (data: SignUpDto) => {
        mutate({
            email: data.email,
            password: data.password,
            fullName: data.fullName,
        });
    }

    return (
        <Section className={'section sign-up'}>
            <Container>
                <Flex align={'center'} justify={'center'}>
                    <Flex direction={'column'} gap={"4"} maxWidth={"620px"} width={'100%'} align={'stretch'}>
                        <Box className={'form-header'}>
                            <Heading align={'center'}>Регистрация</Heading>
                        </Box>

                        <Box>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Flex direction={'column'} gap={"2"}>
                                    <TextField.Root
                                        placeholder={"Фамилия Имя"} {...register('fullName', {required: true})} />
                                    <TextField.Root
                                        placeholder={"Электронная почта"} {...register('email', {required: true})} />
                                    <TextField.Root
                                        placeholder={"Пароль"} {...register('password', {required: true})} />

                                    <Button disabled={isPending}>Регистрация</Button>
                                </Flex>
                            </form>
                        </Box>

                        <Flex justify={'center'}>
                            <Text>Уже есть аккаунт? <Link onClick={() => navigate('/sign-in')}>Авторизация</Link></Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Container>
        </Section>
    )
}

export default SignUpPage;