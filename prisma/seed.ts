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
        title: "Note 1",
        name: "Road worker",
        content: `I never wanted to believe that my Dad was stealing from his job as a road worker. But when I got home, all the signs were there.`,
        image: "https://scontent.ftxl3-2.fna.fbcdn.net/v/t1.6435-9/80679191_10212511923913467_3015189078992748544_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=174925&_nc_ohc=dBpRfDeJdj4AX8lGUMJ&_nc_ht=scontent.ftxl3-2.fna&oh=00_AT-PipysJh41aBY7VKqsDLJueTsbrxrL5keVLsqxrSAKcQ&oe=628129A3"
    }
    ];
}
