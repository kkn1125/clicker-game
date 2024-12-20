import { GAME_HEIGHT, SCREEN_RATIO, SLOT_HEIGHT } from "@common/variables";
import SlotItem from "@components/moleculars/SlotItem";
import SlotQuest from "@components/moleculars/SlotQuest";
import { useGame } from "@hooks/useGame";
import { Box, Paper, Stack, Tab, Tabs } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

interface ScrollableProps {
  children: React.ReactNode;
}
const Scrollable = ({ children }: ScrollableProps) => {
  return (
    <Stack
      height={SLOT_HEIGHT}
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
  const { game, updateGame } = useGame();
  const [gaugeValue, setGaugeValue] = useState<Record<string, number>>({});
  const [intervalId, setIntervalId] = useState<
    Record<string, NodeJS.Timeout | number>
  >({});
  const [value, setValue] = useState(0);

  useEffect(() => {
    updateGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    game.quests.forEach((quest) => {
      if (quest.isRunning && gaugeValue[quest.id] >= quest.time * 1000) {
        quest.complete(game);
        updateGame();
        setGaugeValue((gaugeValue) => {
          gaugeValue[quest.id] = 0;
          return gaugeValue;
        });
      }
    });
  }, [game, gaugeValue, updateGame, setGaugeValue]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleStart = (id: string) => {
    if (intervalId[id]) return;

    const intervalLoop = () => {
      setGaugeValue((prev) => ({
        ...prev,
        [id]: (prev[id] || 0) + 10,
      }));
    };

    const number = setInterval(intervalLoop, 10);

    setIntervalId((prev) => ({
      ...prev,
      [id]: number,
    }));

    game.quests.find((quest) => quest.id === id)?.start();
    updateGame();
  };

  const removeInterval = (id: string) => {
    if (intervalId[id]) clearInterval(intervalId[id]);

    setIntervalId((prev) => {
      delete prev[id];
      return prev;
    });
  };

  return (
    <Paper
      sx={{
        width: `calc(${GAME_HEIGHT * 100}vh * ${SCREEN_RATIO})`,
        position: "absolute",
        bottom: `calc(${(1 - GAME_HEIGHT) * 100}vh / 2)`,
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
        <Tab label='퀘스트' {...a11yProps(0)} />
        <Tab label='능력치' {...a11yProps(1)} />
        <Tab label='스킬' {...a11yProps(2)} />
      </Tabs>

      {/* Quest */}
      <CustomTabPanel value={value} index={0}>
        <Scrollable>
          <Stack p={2} gap={2}>
            {game.quests.map((quest, index) => (
              <SlotQuest
                key={quest.title + index}
                quest={quest}
                gaugeValue={gaugeValue[quest.id]}
                setGaugeValue={setGaugeValue}
                // removeInterval={removeInterval}
                handleStart={handleStart}
              />
            ))}
          </Stack>
        </Scrollable>
      </CustomTabPanel>

      {/* Stat */}
      <CustomTabPanel value={value} index={1}>
        <Scrollable>
          <Stack p={2} gap={2}>
            {game.upgrades.map((upgrade, index) => (
              <SlotItem key={upgrade.title + index} upgrade={upgrade} />
            ))}
          </Stack>
        </Scrollable>
      </CustomTabPanel>

      {/* Skill */}
      <CustomTabPanel value={value} index={2}>
        <Scrollable>
          <Stack p={2} gap={2}>
            <SlotItem upgrade={game.upgrades[0]} />
          </Stack>
        </Scrollable>
      </CustomTabPanel>
    </Paper>
  );
};

export default ControlPanel;
