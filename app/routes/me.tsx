import NavBarDarkThemeSwitcher from "~/routes/NavBarDarkThemeSwitcher";
import {Box} from "@chakra-ui/react";
import {Outlet} from "@remix-run/react";


export default function MeRoute() {
  return (
      <>
          <NavBarDarkThemeSwitcher />
          <Box p={4}>
              <Outlet />
          </Box>
      </>
  )
}
