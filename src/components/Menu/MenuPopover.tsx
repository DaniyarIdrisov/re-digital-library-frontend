import * as Popover from '@radix-ui/react-popover';
import {AvatarIcon, ExitIcon, FileTextIcon, GearIcon, PersonIcon, StarIcon} from '@radix-ui/react-icons';
import './MenuPopover.css';
import {Avatar, Box, Flex, Text} from "@radix-ui/themes";
import {NavLink} from "react-router-dom";
import {useContext} from "react";
import AuthContext, {IAuthContext} from "../../context/AuthContext.ts";
import Cookies from "js-cookie";

const MenuPopover = () => {
    const {user, setUser} = useContext<IAuthContext | object>(AuthContext)

    const isRoot = user?.roles.includes('SUPER_ADMIN')

    const MENU_ITEMS = [
        {
            url: `/account/${user.id}`,
            name: "Мой профиль",
            onlyRoot: false,
            icon: <StarIcon/>,
            onClick: null
        },

        {
            url: "/publications/create",
            name: "Создать публикацию",
            onlyRoot: false,
            icon: <FileTextIcon/>,
            onClick: null
        },

        {
            url: "/authors/create",
            name: "Создать автора",
            onlyRoot: false,
            icon: <PersonIcon/>,
            onClick: null
        },
        {
            url: "/dashboard",
            name: "Панель администратора",
            onlyRoot: true,
            icon: <GearIcon/>,
            onClick: null
        },

        {
            url: "/",
            name: "Выйти",
            onlyRoot: false,
            icon: <ExitIcon/>,
            onClick: () => {
                setUser(null)

                Cookies.remove('token');

                window.location.href = "/";
            }
        },
    ]

    const items = MENU_ITEMS.map((item, index) => {
        if (item.onlyRoot && !isRoot) return;

        return (
            <li key={`menu-item-${index}`}>
                <NavLink to={item.url} onClick={item.onClick} style={{
                    textDecoration: 'none'
                }}>
                    <Box style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 8,
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                    }}>
                        <Box>{item.icon}</Box>
                        <Text>{item.name}</Text>
                    </Box>
                </NavLink>
            </li>
        )
    })

    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <Flex align={'center'} gap={"2"}>
                    <Avatar radius="full" fallback={<AvatarIcon width={18} height={18}/>}/>
                    <Text>{user?.email}</Text>
                </Flex>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content className="PopoverContent" sideOffset={5}>
                    <ul>{items}</ul>
                    <Popover.Arrow className="PopoverArrow"/>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}

export default MenuPopover;
