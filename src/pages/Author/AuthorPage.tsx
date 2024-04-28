import React from "react";
import {Container, Heading, Section} from "@radix-ui/themes";
import AuthorInformation from "../../components/Author/AuthorInformation.tsx";
import {useParams} from "react-router-dom";
import AuthorPublications from "../../components/Author/AuthorPublications.tsx";

const AuthorPage: React.FC = () => {
    const params = useParams();

    const authorId: string = params.authorId as string;

    return (
        <Section>
            <Container>
                <Heading as={'h1'} size={'8'}>Информация об авторе</Heading>

                <AuthorInformation authorId={authorId}/>

                <AuthorPublications authorId={authorId}/>
            </Container>
        </Section>
    )
}

export default AuthorPage;