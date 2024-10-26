import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

interface LayoutProps {}
const Layout: React.FC<LayoutProps> = () => {
  return (
    <Stack height='100%'>
      <Outlet />
    </Stack>
  );
};

export default Layout;
