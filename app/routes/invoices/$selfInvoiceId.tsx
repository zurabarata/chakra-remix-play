import type { SelfInvoice } from "@prisma/client";
import { db } from "~/utils/db.server";
import {ActionFunction, LinksFunction, LoaderFunction, redirect} from "@remix-run/node";
import {useCatch, useLoaderData, useParams} from "@remix-run/react";
import {Box, Center, Heading, Button, Stack, Text, Image, useColorModeValue} from "@chakra-ui/react";
import invoiceStyles from "~/styles/invoice.css";

export const links: LinksFunction = () => {
    return [
        {
            rel: "stylesheet",
            href: invoiceStyles,
        },
    ];
};

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
                <Box
                    maxW={'400px'}
                    w={'full'}
                    bg={useColorModeValue('white', 'gray.900')}
                    boxShadow={'2xl'}
                    rounded={'md'}
                    p={6}
                    overflow={'hidden'}>
                    <b>
                        Eigenbeleg Nr.: {data.selfInvoice.number}
                    </b>
                    <br/>
                    <br/>
                    <p>Contact     : {data.selfInvoice.contact}</p>
                    <p>Amount      : {data.selfInvoice.amount}</p>
                    <p>Reason      : {data.selfInvoice.reason}</p>
                    <p>Date        : {data.selfInvoice.createdAt}</p>
                    <p>Transaction : {data.selfInvoice.transaction}</p>



                </Box>
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
