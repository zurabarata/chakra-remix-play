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

function validateNumber(number: string) {
    if (number.length < 2) {
        return `That number is too short`;
    }
}

function validateContact(contact: string) {
    if (contact.length < 2) {
        return `That contact is too short`;
    }
}

function validateReason(reason: string) {
    if (reason.length < 2) {
        return `That reason is too short`;
    }
}

type ActionData = {
    formError?: string;
    fieldErrors?: {
        contact: string | undefined;
        number: string | undefined;
        reason: string | undefined;

    };
    fields?: {
        contact: string;
        number: string;
        reason: string;
        createdAt: string;
        amount: number;
        transaction: string;
    };
};

const badRequest = (data: ActionData) =>
    json(data, { status: 400 });

export const action: ActionFunction = async ({
                                                 request
                                             }) => {
    const form = await request.formData();
    const contact = form.get("contact");
    const number = form.get("number");
    const reason = form.get("reason");
    const amount = Number(form.get("amount"));
    const createdAt = new Date().toISOString();
    const transaction = form.get("transaction");

    if (
        typeof contact !== "string" ||
        typeof number !== "string" ||
        typeof reason !== "string"
    ) {
        return badRequest({
            formError: `Form not submitted correctly.`
        });
    }

    const fieldErrors = {
        contact: validateContact(contact),
        number: validateNumber(number),
        reason: validateReason(reason)
    };
    const fields = { contact, number,
        reason,
        createdAt, amount, transaction };
    if (Object.values(fieldErrors).some(Boolean)) {
        return badRequest({ fieldErrors, fields });
    }

    const selfInvoice = await db.selfInvoice.create({ data: fields });

    return redirect(`/invoices/${selfInvoice.id}`);
};

export default function NewSelfInvoiceRoute() {
    const actionData = useActionData<ActionData>();

    return (
        <div>
            <form method="post">
                <h1>Eigenbeleg createn:</h1>
                <br/>
                <div>
                    <label>
                        Number:{" "}
                        <input
                            type="text"
                            defaultValue={actionData?.fields?.number}
                            name="number"
                            aria-invalid={
                                Boolean(actionData?.fieldErrors?.number) ||
                                undefined
                            }
                            aria-describedby={
                                actionData?.fieldErrors?.number
                                    ? "number-error"
                                    : undefined
                            }
                        />
                    </label>
                    {actionData?.fieldErrors?.number ? (
                        <p
                            className="form-validation-error"
                            role="alert"
                            id="number-error"
                        >
                            {actionData.fieldErrors.number}
                        </p>
                    ) : null}
                </div>
                <div>
                    <label>
                        Date:{" "}
                        <input
                            type="text"
                            defaultValue={actionData?.fields?.createdAt}
                            name="createdAt"
                        />
                    </label>
                </div>

                <div>
                    <label>
                        Contact:{" "}
                        <input
                            type="text"
                            defaultValue={actionData?.fields?.contact}
                            name="contact"
                            aria-invalid={
                                Boolean(actionData?.fieldErrors?.contact) ||
                                undefined
                            }
                            aria-describedby={
                                actionData?.fieldErrors?.contact
                                    ? "contact-error"
                                    : undefined
                            }
                        />
                    </label>
                    {actionData?.fieldErrors?.contact ? (
                        <p
                            className="form-validation-error"
                            role="alert"
                            id="contact-error"
                        >
                            {actionData.fieldErrors.contact}
                        </p>
                    ) : null}
                </div>
                <br/>
                <div>
                    <label>
                        Total amount:{" "}
                        <input
                            type="text"
                            defaultValue={actionData?.fields?.amount}
                            name="amount"
                        />
                    </label>
                </div>
                <br/>
                <div>
                    <label>
                        Reason:{" "}
                        <textarea
                            defaultValue={actionData?.fields?.reason}
                            name="reason"
                            aria-invalid={
                                Boolean(actionData?.fieldErrors?.reason) ||
                                undefined
                            }
                            aria-describedby={
                                actionData?.fieldErrors?.reason
                                    ? "reason-error"
                                    : undefined
                            }
                        />
                    </label>
                    {actionData?.fieldErrors?.reason ? (
                        <p
                            className="form-validation-error"
                            role="alert"
                            id="reason-error"
                        >
                            {actionData.fieldErrors.reason}
                        </p>
                    ) : null}
                </div>
                <div>
                    <label>
                        Transaction:{" "}
                        <textarea
                            defaultValue={actionData?.fields?.transaction}
                            name="transaction"
                        />
                    </label>
                </div>

                <div>
                    <button type="submit" className="custom-btn btn-1">
                        Add
                    </button>
                </div>
            </form>
            {/*<NewNoteFormCard />*/}
        </div>
    );
}


