import { SCREEN_RATIO } from "@common/variables";
import SlotItem from "@components/moleculars/SlotItem";
import { Box, Paper, Stack, Tab, Tabs } from "@mui/material";
import {
  GameContext,
  GameDispatchContext,
  GameType,
} from "@providers/GameContext";
import { useContext, useEffect, useState } from "react";

interface ScrollableProps {
  children: React.ReactNode;
}
const Scrollable = ({ children }: ScrollableProps) => {
  return (
    <Stack
      height={250}
      overflow='auto'
      sx={{
        backgroundColor: "#e9dcba",
        ["&::-webkit-scrollbar"]: {
          width: 3,
        },
        ["&::-webkit-scrollbar-thumb"]: {
          backgroundColor: "grey",
        },
      }}>
      {children}
    </Stack>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface ControlPanelProps {}
const ControlPanel: React.FC<ControlPanelProps> = () => {
  const gameState = useContext(GameContext);
  const dispatch = useContext(GameDispatchContext);
  const [value, setValue] = useState(0);

  useEffect(() => {
    dispatch({ type: GameType.Update });
  }, [dispatch]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const update = () => {
    dispatch({ type: GameType.Update });
  };

  const increaseStr = () => {
    dispatch({ type: GameType.IncreaseStr, payload: 1 });
  };

  const increaseDex = () => {
    dispatch({ type: GameType.IncreaseDex, payload: 1 });
  };

  const increaseInt = () => {
    dispatch({ type: GameType.IncreaseInt, payload: 1 });
  };

  const increaseLck = () => {
    dispatch({ type: GameType.IncreaseLck, payload: 1 });
  };

  return (
    <Paper
      sx={{
        width: `calc(80vh * ${SCREEN_RATIO})`,
        position: "absolute",
        bottom: `calc(100vh / 2 - 80vh / 2)`,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
        overflow: "hidden",
      }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label='basic tabs example'
        sx={{
          minHeight: "auto",
          ["& .MuiTab-root"]: {
            p: 1,
          },
        }}>
        <Tab label='Item 1' {...a11yProps(0)} />
        <Tab label='Item 2' {...a11yProps(1)} />
      </Tabs>

      <CustomTabPanel value={value} index={0}>
        <Scrollable>
          <Stack p={2} gap={2}>
            <SlotItem
              image=''
              title='Strength'
              content='힘이 좋으면 기본 데미지가 증가합니다.'
              currentValue={gameState.player?.stat.str}
              handleControl={increaseStr}
            />
            <SlotItem
              image=''
              title='Dexterity'
              content='민첩이 좋으면 최소 데미지가 증가합니다.'
              currentValue={gameState.player?.stat.dex}
              handleControl={increaseDex}
            />
            <SlotItem
              image=''
              title='Intelligence'
              content='지능이 좋으면 마력이 강해집니다.'
              currentValue={gameState.player?.stat.int}
              handleControl={increaseInt}
            />
            <SlotItem
              image=''
              title='Luck'
              content='운이 좋으면 획득 경험치가 증가합니다.'
              currentValue={gameState.player?.stat.lck}
              handleControl={increaseLck}
            />
          </Stack>
        </Scrollable>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Scrollable>
          <Stack p={2} gap={2}>
            <SlotItem
              image=''
              title='Skill'
              content='스킬을 배워 더 강력한 공격을 할 수 있습니다.'
              currentValue={0}
              handleControl={() => {}}
            />
          </Stack>
        </Scrollable>
      </CustomTabPanel>
    </Paper>
  );
};

export default ControlPanel;
