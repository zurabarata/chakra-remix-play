import {Box} from "@chakra-ui/react";
import SidebarWithHeader from "~/routes/SidebarWithHeader";
import {Outlet} from "@remix-run/react";

export default function Index() {
  return (
      <SidebarWithHeader>
        <Box p={4}>
          <Outlet />
        </Box>
      </SidebarWithHeader>
  );
}
