import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
    await Promise.all(
        getNotes().map(note => {
            return db.note.create(
                {
                    data: note
                }
            );
        })
        //create selfInvoice
    );
    await Promise.all(
        getSelfInvoices().map((selfInvoice) => {
            return db.selfInvoice.create(
                {
                    data: selfInvoice
                }
            );
        })
    );
}

seed();

function getNotes() {
    return [
        {
            title: "Note 1",
            content: "This is note 1",}
    ];
}
function getSelfInvoices() {
    return [
        {
            contact: "Note 1",
            reason: "This is note 1",
            number: "This is note 1"
        }
    ];
}
