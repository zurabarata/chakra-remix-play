import type { Note } from "@prisma/client";
import { db } from "~/utils/db.server";
import {ActionFunction, LoaderFunction, redirect} from "@remix-run/node";
import {useCatch, useLoaderData, useParams} from "@remix-run/react";
import {Box, Center, Heading, Button, Stack, Text, Image, useColorModeValue} from "@chakra-ui/react";

type LoaderData = { note: Note };

export const action: ActionFunction = async ({
                                                 request,
                                                 params
                                             }) => {
    const form = await request.formData();
    if (form.get("_method") === "delete") {
        const note = await db.note.findUnique({
            where: { id: params.noteId }
        });
        if (!note) {
            throw new Response(
                "Can't delete what does not exist",
                { status: 404 }
            );
        }
        await db.note.delete({ where: { id: params.noteId } });
        return redirect("/notes");
    }
};


export const loader: LoaderFunction = async ({
                                                 params
                                             }) => {
    const note = await db.note.findUnique({
        where: { id: params.noteId }
    });
    if (!note) throw new Error("Note not found");
    const data: LoaderData = { note };
    return data;
};

export default function NoteRoute() {
    const data = useLoaderData<LoaderData>();

    return (
        <div className="main-container">
            <Center py={6}>
                <Box
                    maxW={'1200px'}
                    w={'full'}
                    bg={useColorModeValue('white', 'gray.900')}
                    boxShadow={'2xl'}
                    rounded={'md'}
                    p={6}
                    overflow={'hidden'}>
                        {data.note?.image && (
                            <Image
                                mb={6}
                                w={'full'}
                                maxH={'400px'}
                                maxW={'1200px'}
                                rounded={'md'}
                                src={data.note?.image}
                            />
                        )}
                    <Stack spacing={3}>
                        <Heading
                            whiteSpace={'pre-wrap'}
                            color={useColorModeValue('gray.700', 'white')}
                            fontSize={'2xl'}
                            fontFamily={'body'}>
                            {data.note.name}
                        </Heading>
                        <Text color={'gray.500'} whiteSpace={'pre-wrap'}
                        >
                            {data.note.content}
                        </Text>
                        <form method="post">
                            <input
                                type="hidden"
                                name="_method"
                                value="delete"
                            />
                            <Button
                                colorScheme={'red'}
                                type="submit"
                                bg={'red.400'}
                                px={6}
                                _hover={{
                                    bg: 'red.500',
                                }}>
                                Delete note
                            </Button>
                        </form>
                    </Stack>
                </Box>
            </Center>
        </div>
    );
}

export function CatchBoundary() {
    const caught = useCatch();
    const params = useParams();
    switch (caught.status) {
        case 404: {
            return (
                <div className="error-container">
                    Huh? What the heck is {params.noteId}?
                </div>
            );
        }
        case 401: {
            return (
                <div className="error-container">
                    Sorry, but {params.noteId} is not your note.
                </div>
            );
        }
        default: {
            throw new Error(`Unhandled error: ${caught.status}`);
        }
    }
}

export function ErrorBoundary({ error }: { error: Error }) {
    console.error(error);
    const { noteId } = useParams();
    return (
        <div className="error-container">{`There was an error loading note by the id ${noteId}. Sorry.`}</div>
    );
}
