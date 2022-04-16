import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    Link,
    Badge,
    useColorModeValue,
} from '@chakra-ui/react';
import { db } from "~/utils/db.server";
import { json } from "@remix-run/node";
import type {
    LinksFunction,
    LoaderFunction,
} from "@remix-run/node";
import {useLoaderData, Link as RemixLink} from "@remix-run/react";

type LoaderData = {
    noteListItems: Array<{ id: string; name: string }>;
};

export const loader: LoaderFunction = async () => {
    const data: LoaderData = {
        noteListItems: await db.note.findMany(),
    };
    return json(data);
};

export default function SocialProfileSimple() {
    const data = useLoaderData<LoaderData>();

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
                    <ul>
                        {data?.noteListItems.map(note => (
                            <li key={note.id}>
                                <Text>{note.name}</Text>
                            </li>
                        ))}
                    </ul>
                </Stack>

            </Box>
        </Center>
    );
}
