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
    return [{
        name: "Road worker",
        content: `I never wanted to believe that my Dad was stealing from his job as a road worker. But when I got home, all the signs were there.`,
    }
    ];
}
