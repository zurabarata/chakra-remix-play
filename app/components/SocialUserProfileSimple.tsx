import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    Button,
    Link,
    Badge,
    useColorModeValue,
} from '@chakra-ui/react';

export default function SocialProfileSimple() {
    return (
        <Center py={6}>
            <Box
                maxW={'320px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'lg'}
                p={6}
                textAlign={'center'}>
                <Avatar
                    size={'xl'}
                    src={'https://scontent.ftxl3-2.fna.fbcdn.net/v/t1.6435-9/80679191_10212511923913467_3015189078992748544_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=174925&_nc_ohc=dBpRfDeJdj4AX8lGUMJ&_nc_ht=scontent.ftxl3-2.fna&oh=00_AT-PipysJh41aBY7VKqsDLJueTsbrxrL5keVLsqxrSAKcQ&oe=628129A3'}
                    mb={4}
                    pos={'relative'}
                    _after={{
                        content: '""',
                        w: 4,
                        h: 4,
                        bg: 'green.300',
                        border: '2px solid white',
                        rounded: 'full',
                        pos: 'absolute',
                        bottom: 0,
                        right: 3,
                    }}
                />
                <Heading fontSize={'2xl'} fontFamily={'body'}>
                    Zurab Baratashvili
                </Heading>
                <Text fontWeight={600} color={'gray.500'} mb={4}>
                    @zurabarata
                </Text>
                <Text
                    textAlign={'center'}
                    color={useColorModeValue('gray.700', 'gray.400')}
                    px={3}>
                    Players' agent, software developer and entrepreneur.{' '}
                    <Link href={'#'} color={'blue.400'}>
                        #tag
                    </Link>{' '}
                </Text>

                <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
                    <Badge
                        px={2}
                        py={1}
                        bg={useColorModeValue('gray.50', 'gray.800')}
                        fontWeight={'400'}>
                        #sports
                    </Badge>
                    <Badge
                        px={2}
                        py={1}
                        bg={useColorModeValue('gray.50', 'gray.800')}
                        fontWeight={'400'}>
                        #technology
                    </Badge>
                </Stack>

                <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
                    <Badge
                        px={2}
                        py={1}
                        bg={useColorModeValue('gray.50', 'gray.800')}
                        fontWeight={'400'}>
                        #entrepreneurship
                    </Badge>
                </Stack>

{/*                <Stack mt={8} direction={'row'} spacing={4}>
                    <Button
                        flex={1}
                        fontSize={'sm'}
                        rounded={'full'}
                        _focus={{
                            bg: 'gray.200',
                        }}>
                        Message
                    </Button>
                    <Button
                        flex={1}
                        fontSize={'sm'}
                        rounded={'full'}
                        bg={'blue.400'}
                        color={'white'}
                        boxShadow={
                            '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                        }
                        _hover={{
                            bg: 'blue.500',
                        }}
                        _focus={{
                            bg: 'blue.500',
                        }}>
                        Follow
                    </Button>
                </Stack>*/}
            </Box>
        </Center>
    );
}
