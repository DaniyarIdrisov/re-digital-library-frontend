import React, {useEffect, useState} from "react";
import {Badge, Box, Flex, Heading, Strong, Text} from "@radix-ui/themes";
import AccountService from "../../services/AccountService.ts";

interface IAccountInformation {
    accountId: string
}

const AccountInformation: React.FC<IAccountInformation> = ({accountId}) => {
    const [account, setAccount] = useState<IUser>();

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);

        AccountService.getAccountById(accountId)
            .then((response) => {
                setAccount(response.data);
                setIsLoading(false)
            });
    }, [accountId]);

    if (isLoading) {
        return (
            <Box>
                <Heading as={'h3'} size={'2'}>
                    Загрузка информации об аккаунте
                </Heading>
            </Box>
        )
    }

    return (
        <Box>
            <Flex direction={'column'} gap={'1'}>
                <Text size={'4'}>ФИО: <Strong>{account?.fullName}</Strong></Text>
                <Text size={'4'}>Адрес электронной почты: <Strong>{account?.email}</Strong></Text>

                <Text>Роли:</Text>
                <Flex>
                    {
                        account?.roles.map((role) => {
                            return (
                                <Badge>
                                    {role}
                                </Badge>
                            )
                        })
                    }
                </Flex>
            </Flex>
        </Box>
    )
}

export default AccountInformation;