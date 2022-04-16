import SocialProfileSimple from "~/routes/me/SocialUserProfileSimple";
import { db } from "~/utils/db.server";
import { json } from "@remix-run/node";
import type {
    LoaderFunction,
} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";

type LoaderData = {
    noteListItems: Array<{ id: string; name: string }>;
};

export const loader: LoaderFunction = async () => {
    const data: LoaderData = {
        noteListItems: await db.note.findMany(),
    };
    return json(data);
};


export default function MeIndexRoute() {

    return (
        <div>
            <SocialProfileSimple />
        </div>
    )
}
