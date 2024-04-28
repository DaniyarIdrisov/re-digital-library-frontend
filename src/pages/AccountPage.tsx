import React from "react";
import {useParams} from "react-router-dom";
import {Container, Heading, Section} from "@radix-ui/themes";
import AccountInformation from "../components/Account/AccountInformation.tsx";

const AccountPage: React.FC = () => {
    const params = useParams();

    const accountId: string = params.accountId as string;

    return (
        <Section>
            <Container>
                <Heading as={'h1'} size={'8'}>Личный кабинет</Heading>

                <AccountInformation accountId={accountId}/>
            </Container>
        </Section>
    )
}

export default AccountPage;