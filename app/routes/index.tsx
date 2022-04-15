import {Box} from "@chakra-ui/react";
import SidebarWithHeader from "~/routes/SidebarWithHeader";
import {Outlet} from "@remix-run/react";
import NavBarDarkThemeSwitcher from "~/routes/NavBarDarkThemeSwitcher";

export default function Index() {
  return (
      <>
      <NavBarDarkThemeSwitcher />
        <Box p={4}>
          <Outlet />
        </Box>
      </>
  );
}
