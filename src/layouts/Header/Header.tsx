import {Box, Container, Flex, Heading, Link} from "@radix-ui/themes";
import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {GlobeIcon,} from '@radix-ui/react-icons';
import AuthContext, {IAuthContext} from "../../context/AuthContext.ts";
import MenuPopover from "../../components/Menu/MenuPopover.tsx";

const Header: React.FC = () => {
    const navigate = useNavigate();

    const {user} = useContext<IAuthContext | object>(AuthContext);

    return (
        <header className='header'>
            <Container>
                <Flex className='header__wrapper' justify={'between'} style={{
                    padding: 16,
                }}>

                    <Link onClick={() => navigate('/')} style={{
                        cursor: 'pointer'
                    }}>
                        <Flex align={'center'} gap={'2'}>
                            <GlobeIcon width={32} height={32}/>
                            <Heading>RE Digital Library</Heading>
                        </Flex>
                    </Link>

                    <Box>
                        {user ? <MenuPopover/> :
                            <Link onClick={() => navigate('/sign-up')} style={{cursor: 'pointer'}}>Регистрация</Link>}
                    </Box>

                </Flex>
            </Container>
        </header>
    );
};

export default Header;
