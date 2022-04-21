import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    Avatar,
    Image,
    useColorModeValue, Button,
} from '@chakra-ui/react';
import type {
    LoaderFunction,
} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import type { Note } from "@prisma/client";
import { db } from "~/utils/db.server";

type LoaderData = { randomNote: Note };

export const loader: LoaderFunction = async () => {
    const count = await db.note.count();
    const randomRowNumber = Math.floor(Math.random() * count);
    const [randomNote] = await db.note.findMany({
        take: 1,
        skip: randomRowNumber
    });
    const data: LoaderData = { randomNote };
    return data;
};

export default function NoteCard() {
    const data = useLoaderData<LoaderData>();

    return (
        <Center py={6}>
            <Box
                maxW={'890px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'md'}
                p={6}
                overflow={'hidden'}>
                <Box
                    h={'210px'}
                    bg={'gray.100'}
                    mt={-6}
                    mx={-6}
                    mb={6}
                    pos={'relative'}>
{/*                    <img
                        src={
                            'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
                        }
                    />*/}
                </Box>
                <Stack>
                    <Heading
                        whiteSpace={'pre-wrap'}
                        color={useColorModeValue('gray.700', 'white')}
                        fontSize={'2xl'}
                        fontFamily={'body'}>
                        {data.randomNote.name}
                    </Heading>
                    <Text color={'gray.500'} whiteSpace={'pre-wrap'}
                    >
                        {data.randomNote.content}
                    </Text>
                    <Text color={'gray.100'}
                    >
                        {data.randomNote.id}
                    </Text>
                </Stack>
            </Box>
        </Center>
    );
}
