import {Container} from "@radix-ui/themes";
import React from "react";
import PublicationList from "../../components/Publications/PublicationList.tsx";

const PublicationsCatalogPage: React.FC = () => {
    return (
        <section className='catalog'>
            <Container>
                <PublicationList/>
            </Container>
        </section>
    );
};

export default PublicationsCatalogPage;
