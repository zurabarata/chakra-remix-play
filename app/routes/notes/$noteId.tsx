import type { Note } from "@prisma/client";
import { db } from "~/utils/db.server";
import {ActionFunction, LoaderFunction, redirect} from "@remix-run/node";
import {useCatch, useLoaderData, useParams} from "@remix-run/react";
import {Box, Center, Heading, Button, Stack, Text, useColorModeValue} from "@chakra-ui/react";

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
                            <Button type="submit" className="custom-btn btn-1" >
                                Delete the note!
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
