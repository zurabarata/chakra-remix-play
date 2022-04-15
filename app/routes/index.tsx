import NavBarDarkThemeSwitcher from "~/routes/NavBarDarkThemeSwitcher";
import {Box} from "@chakra-ui/react";

export default function Index() {
  return (
      <>
  <NavBarDarkThemeSwitcher />
  <Box p={4}>
    Hello there! 🍻
  </Box>
      </>
  );
}
