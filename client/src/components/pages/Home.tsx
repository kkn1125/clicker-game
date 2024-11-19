import Canvas from "@atoms/Canvas";
import ControlPanel from "@organisms/ControlPanel";
import { Stack } from "@mui/material";
import MenuButton from "@atoms/MenuButton";
import VersionChip from "@atoms/VersionChip";

const Home: React.FC = () => {
  return (
    <Stack flex={1}>
      <VersionChip />
      <MenuButton />
      <Canvas />
      <ControlPanel />
    </Stack>
  );
};

export default Home;
