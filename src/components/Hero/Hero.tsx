import {Button, Container, Flex, Heading, Section, Text} from "@radix-ui/themes";
import React from "react";
import {NavLink} from "react-router-dom";

const Hero: React.FC = () => {
    return (
        <Section className='hero' style={{
            margin: '192px 48px',
            padding: 32,
        }}>
            <Container>
                <Flex direction={'column'} align={'center'} justify={'center'} gap={'6'} className='hero__wrapper'>
                    <Heading as={'h1'} size={"9"}>RE Digital Library</Heading>

                    <Text style={{
                        maxWidth: 560,
                        textAlign: 'center'
                    }}>
                        Научная библиотек с возможность хранения публикаций и с рекомендательной системой к подбору
                        ключевых слов
                    </Text>

                    <Flex gap={'4'}>
                        <Button>
                            <NavLink to={'/publications'}>
                                Перейти к публикациям
                            </NavLink>
                        </Button>
                        <Button>
                            <NavLink to={'/authors'}>
                                Перейти к авторам
                            </NavLink>
                        </Button>
                    </Flex>
                </Flex>
            </Container>
        </Section>
    );
};

export default Hero;
