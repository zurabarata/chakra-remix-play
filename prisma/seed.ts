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
    );
}

seed();

function getNotes() {
    return [
    ];
}
