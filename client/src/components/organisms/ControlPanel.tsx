import SlotItem from "@components/moleculars/SlotItem";
import { Paper, Stack } from "@mui/material";

interface ControlPanelProps {}
const ControlPanel: React.FC<ControlPanelProps> = () => {
  return (
    <Paper
      sx={{
        width: "calc(100% / 4 - 40px)",
        position: "absolute",
        bottom: 160,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
        overflow: "hidden",
      }}>
      <Stack
        p={2}
        gap={2}
        height={200}
        overflow='auto'
        sx={{
          ["&::-webkit-scrollbar"]: {
            width: 3,
          },
          ["&::-webkit-scrollbar-thumb"]: {
            backgroundColor: "grey",
          },
        }}>
        <SlotItem />
        <SlotItem />
        <SlotItem />
        <SlotItem />
        <SlotItem />
        <SlotItem />
        <SlotItem />
        <SlotItem />
        <SlotItem />
        <SlotItem />
      </Stack>
    </Paper>
  );
};

export default ControlPanel;
