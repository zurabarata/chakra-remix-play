import type { SelfInvoice } from "@prisma/client";
import { db } from "~/utils/db.server";
import {ActionFunction, LoaderFunction, redirect} from "@remix-run/node";
import {useCatch, useLoaderData, useParams} from "@remix-run/react";
import {Box, Center, Heading, Button, Stack, Text, Image, useColorModeValue} from "@chakra-ui/react";

type LoaderData = { selfInvoice: SelfInvoice };

export const action: ActionFunction = async ({
                                                 request,
                                                 params
                                             }) => {
    const form = await request.formData();
    if (form.get("_method") === "delete") {
        const selfInvoice = await db.selfInvoice.findUnique({
            where: { id: params.selfInvoiceId }
        });
        if (!selfInvoice) {
            throw new Response(
                "Can't delete what does not exist",
                { status: 404 }
            );
        }
        await db.selfInvoice.delete({ where: { id: params.selfInvoiceId } });
        return redirect("/invoices");
    }
};


export const loader: LoaderFunction = async ({
                                                 params
                                             }) => {
    const selfInvoice = await db.selfInvoice.findUnique({
        where: { id: params.selfInvoiceId }
    });
    if (!selfInvoice) throw new Error("SelfInvoice not found");
    const data: LoaderData = { selfInvoice };
    return data;
};

export default function SelfInvoiceRoute() {
    const data = useLoaderData<LoaderData>();

    console.log(data);

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
{/*                        {data.selfInvoice?.image && (
                            <Image
                                mb={6}
                                w={'full'}
                                maxH={'400px'}
                                maxW={'1200px'}
                                rounded={'md'}
                                src={data.selfInvoice?.image}
                            />
                        )}*/}
                    <Stack spacing={3}>
                        <Heading
                            whiteSpace={'pre-wrap'}
                            color={useColorModeValue('gray.700', 'white')}
                            fontSize={'2xl'}
                            fontFamily={'body'}>
                            {data.selfInvoice.contact}
                        </Heading>
                        <Text color={'gray.500'} whiteSpace={'pre-wrap'}
                        >
                            {data.selfInvoice.reason}
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
                                Delete selfInvoice
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
                    Huh? What the heck is {params.selfInvoiceId}?
                </div>
            );
        }
        case 401: {
            return (
                <div className="error-container">
                    Sorry, but {params.selfInvoiceId} is not your selfInvoice.
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
    const { id } = useParams();
    return (
        <div className="error-container">{`There was an error loading selfInvoice by the id ${id}. Sorry.`}</div>
    );
}
