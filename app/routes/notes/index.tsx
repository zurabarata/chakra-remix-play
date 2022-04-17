import { db } from "~/utils/db.server";
import type {
    LoaderFunction,
} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import NoteCard from "~/routes/notes/NoteCard";
import type {Note} from "@prisma/client";

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



export default function NotesIndexRoute() {
    const data = useLoaderData<LoaderData>();
    return (
        <div>
            {data ? (<NoteCard/>) : null}
        </div>
    )
}
