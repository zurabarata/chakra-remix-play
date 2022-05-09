import { ReactNode } from 'react';
import {
    Box,
    Flex,
    Avatar,
    Link,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    useColorMode,
    Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const NavLink = ({ children }: { children: ReactNode }) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={'#'}>
        {children}
    </Link>
);

export default function NavBarDarkThemeSwitcher() {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Button onClick={toggleColorMode}>
                        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    </Button>

                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>

                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={'full'}
                                    variant={'link'}
                                    cursor={'pointer'}
                                    minW={0}>
                                    <Avatar
                                        size={'sm'}
                                        src={'https://scontent.ftxl3-2.fna.fbcdn.net/v/t1.6435-9/80679191_10212511923913467_3015189078992748544_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=174925&_nc_ohc=dBpRfDeJdj4AX8lGUMJ&_nc_ht=scontent.ftxl3-2.fna&oh=00_AT-PipysJh41aBY7VKqsDLJueTsbrxrL5keVLsqxrSAKcQ&oe=628129A3'}
                                    />
                                </MenuButton>
                                <MenuList alignItems={'center'}>
                                    <br />
                                    <Center>
                                        <Avatar
                                            size={'2xl'}
                                            src={'https://scontent.ftxl3-2.fna.fbcdn.net/v/t1.6435-9/80679191_10212511923913467_3015189078992748544_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=174925&_nc_ohc=dBpRfDeJdj4AX8lGUMJ&_nc_ht=scontent.ftxl3-2.fna&oh=00_AT-PipysJh41aBY7VKqsDLJueTsbrxrL5keVLsqxrSAKcQ&oe=628129A3'}
                                        />
                                    </Center>
                                    <br />
                                    <Center>
                                        <p>Zurab</p>
                                        <p>ზურაბ</p>
                                    </Center>
                                    <br />
                                    <MenuDivider />
{/*
                                    <MenuItem>Your Servers</MenuItem>
*/}
                                    <MenuItem>Account Settings</MenuItem>
                                    <MenuItem>Logout</MenuItem>
                                </MenuList>
                            </Menu>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}
