import NavBarDarkThemeSwitcher from "~/components/NavBarDarkThemeSwitcher";
import {Box} from "@chakra-ui/react";
import {Outlet} from "@remix-run/react";
import SidebarWithHeader from "~/routes/notes/SidebarWithHeader";
import {Note} from "@prisma/client";
import {LoaderFunction} from "@remix-run/node";
import {db} from "~/utils/db.server";

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


export default function NotesRoute() {
  return (
          <SidebarWithHeader>
              <Box p={4}>
                  <Outlet />
              </Box>
          </SidebarWithHeader>

  );
}
