import NavBarDarkThemeSwitcher from "~/components/NavBarDarkThemeSwitcher";
import {Box} from "@chakra-ui/react";
import {Outlet} from "@remix-run/react";
import SidebarWithHeader from "~/components/SidebarWithHeader";


export default function MeRoute() {
  return (
      <>
          <NavBarDarkThemeSwitcher />
              <Box p={4}>
              <Outlet />
          </Box></>
  );
}
