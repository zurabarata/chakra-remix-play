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
            contact: "This is contact 1",
            address: "This is address 1",
            reason: "This is reason 1",
            number: "This is number 1",
        }
    ];
}
