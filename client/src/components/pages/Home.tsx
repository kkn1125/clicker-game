import Canvas from "@atoms/Canvas";
import ControlPanel from "@organisms/ControlPanel";
import { Stack } from "@mui/material";

const Home: React.FC = () => {
  return (
    <Stack flex={1}>
      <Canvas />
      <ControlPanel />
    </Stack>
  );
};

export default Home;
