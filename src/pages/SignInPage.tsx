import React, {useContext} from "react";
import {Box, Button, Container, Flex, Heading, Link, Section, Text, TextField} from "@radix-ui/themes";
import {useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {useSignIn} from "../QueryHooks/useSignIn.ts";
import Cookies from "js-cookie";
import {toast} from "react-toastify";
import AuthContext from "../context/AuthContext.ts";
import AuthService from "../services/AuthService.ts";

type ISignInInputs = {
    email: string
    password: string
}

const SignInPage: React.FC = () => {
    const navigate = useNavigate();

    const {setUser} = useContext(AuthContext)

    const {register, handleSubmit} = useForm<ISignInInputs>();

    const {mutate} = useSignIn({
        onSuccess: (data) => {
            Cookies.set('token', JSON.stringify(data.data))

            AuthService.getAccountByToken()
                .then(response => setUser(response.data))


            navigate('/');
        },
        onError: (error) => toast.error(error.data.message)
    });

    const onSubmit: SubmitHandler<ISignInInputs> = async (signInData: SignInDto) => {
        mutate({
            email: signInData.email,
            password: signInData.password
        });
    }

    return (
        <Section className={'section sign-up'}>
            <Container>
                <Flex align={'center'} justify={'center'}>
                    <Flex direction={'column'} gap={"4"} maxWidth={"620px"} width={'100%'} align={'stretch'}>
                        <Box className={'form-header'}>
                            <Heading align={'center'}>Авторизация</Heading>
                        </Box>

                        <Box>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Flex direction={'column'} gap={"2"}>
                                    <TextField.Root
                                        placeholder={"Электронная почта"} {...register('email', {required: true})} />
                                    <TextField.Root
                                        placeholder={"Пароль"} {...register('password', {required: true})} />

                                    <Button>Войти</Button>
                                </Flex>
                            </form>
                        </Box>

                        <Flex justify={'center'}>
                            <Text>Нет аккаунта? <Link onClick={() => navigate('/sign-up')}>Регистрация</Link></Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Container>
        </Section>
    )
}

export default SignInPage;