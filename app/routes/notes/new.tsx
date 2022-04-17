import type { ActionFunction } from "@remix-run/node";
import { db } from "~/utils/db.server";
import {json, redirect} from "@remix-run/node";
import {useActionData} from "@remix-run/react";

export function ErrorBoundary() {
    return (
        <div className="error-container">
            Something unexpected went wrong. Sorry about that.
        </div>
    );
}

function validateNoteContent(content: string) {
    if (content.length < 10) {
        return `That note is too short`;
    }
}

function validateNoteName(name: string) {
    if (name.length < 2) {
        return `That note's name is too short`;
    }
}

function validateNoteImagee(image: string) {
    if (image.length < 2) {
        return `That note's image url is too short`;
    }
}

type ActionData = {
    formError?: string;
    fieldErrors?: {
        name: string | undefined;
        content: string | undefined;
        image: string | undefined;
    };
    fields?: {
        name: string;
        content: string;
        image: string;
    };
};

const badRequest = (data: ActionData) =>
    json(data, { status: 400 });

export const action: ActionFunction = async ({
                                                 request
                                             }) => {
    const form = await request.formData();
    const name = form.get("name");
    const content = form.get("content");
    const image = form.get("image");
    if (
        typeof name !== "string" ||
        typeof content !== "string" ||
        typeof image !== "string"
    ) {
        return badRequest({
            formError: `Form not submitted correctly.`
        });
    }

    const fieldErrors = {
        name: validateNoteName(name),
        content: validateNoteContent(content),
        image: validateNoteImagee(image)
    };
    const fields = { name, content, image};
    if (Object.values(fieldErrors).some(Boolean)) {
        return badRequest({ fieldErrors, fields });
    }

    const note = await db.note.create({ data: fields });

    return redirect(`/notes/${note.id}`);
};

export default function NewNoteRoute() {
    const actionData = useActionData<ActionData>();

    return (
        <div className="main-container">
            <h3>Add your own note</h3>
            <form method="post">
                <div>
                    <label>
                        Title:{" "}
                        <input
                            type="text"
                            defaultValue={actionData?.fields?.name}
                            name="name"
                            aria-invalid={
                                Boolean(actionData?.fieldErrors?.name) ||
                                undefined
                            }
                            aria-describedby={
                                actionData?.fieldErrors?.name
                                    ? "name-error"
                                    : undefined
                            }
                        />
                    </label>
                    {actionData?.fieldErrors?.name ? (
                        <p
                            className="form-validation-error"
                            role="alert"
                            id="name-error"
                        >
                            {actionData.fieldErrors.name}
                        </p>
                    ) : null}
                </div>
                <div>
                    <label>
                        Content:{" "}
                        <textarea
                            defaultValue={actionData?.fields?.content}
                            name="content"
                            aria-invalid={
                                Boolean(actionData?.fieldErrors?.content) ||
                                undefined
                            }
                            aria-describedby={
                                actionData?.fieldErrors?.content
                                    ? "content-error"
                                    : undefined
                            }
                        />
                    </label>
                    {actionData?.fieldErrors?.content ? (
                        <p
                            className="form-validation-error"
                            role="alert"
                            id="content-error"
                        >
                            {actionData.fieldErrors.content}
                        </p>
                    ) : null}
                </div>
                <div>
                    <label>
                        Image URL:{" "}
                        <input
                            type="url"
                            defaultValue={actionData?.fields?.image}
                            name="image"
                            aria-invalid={
                                Boolean(actionData?.fieldErrors?.image) ||
                                undefined
                            }
                            aria-describedby={
                                actionData?.fieldErrors?.image
                                    ? "image-error"
                                    : undefined
                            }
                        />
                    </label>
                    {actionData?.fieldErrors?.image ? (
                        <p
                            className="form-validation-error"
                            role="alert"
                            id="image-error"
                        >
                            {actionData.fieldErrors.image}
                        </p>
                    ) : null}
                </div>
                <div>
                    <button type="submit" className="custom-btn btn-1">
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
}


