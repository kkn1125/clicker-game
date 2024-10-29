import Slot from "@atoms/Slot";
import { useGame } from "@hooks/useGame";
import { Quest } from "@models/Quest";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function globalUpdate(setGaugeValue: React.Dispatch<React.SetStateAction<number>>) {
  
}
const data = {
  isRunning:false,
}

interface SlotQuestProps {
  quest: Quest;
  handleContinue: (type:string) => void; 
}
const SlotQuest: React.FC<SlotQuestProps> = ({ quest, handleContinue }) => {
  const { game, updateGame } = useGame();
  const [gaugeValue, setGaugeValue] = useState(0);
  const [isRunning, setIsRunning] = useState(data.isRunning);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const handleStart = () => {
    if (isRunning) return;
    setIsRunning(true);
    const id = handleContinue(quest.type);
    data.isRunning = true;
    setIntervalId(id);
  };

  useEffect(() => {
    if (gaugeValue >= quest.time * 1000) {
      quest.complete(game);
      updateGame();
      setGaugeValue(0);
    }
  }, [game, gaugeValue, quest, updateGame]);

  const handleStop = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setIsRunning(false);
  };

  const handleReset = () => {
    handleStop();
    setGaugeValue(0);
  };

  // 컴포넌트가 언마운트될 때 인터벌 정리
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <Slot
      image={quest.slotImage}
      title={quest.title}
      content={quest.description}
      gauge
      gaugeSlot={
        <Box
          position='relative'
          width='100%'
          height={10}
          bgcolor='grey.300'
          overflow='hidden'
          borderRadius={0.5}>
          <Box
            sx={{
              width: `${(gaugeValue / (quest.time * 1000)) * 100}%`,
              height: "100%",
              backgroundColor: (theme) => theme.palette.primary.main,
              transition: "width 0.1s linear",
            }}
          />
          <Typography
            align='center'
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: 10,
              color: "text.primary",
              whiteSpace: "nowrap",
            }}>
            {((gaugeValue / (quest.time * 1000)) * 100).toFixed(1)}%
          </Typography>
        </Box>
      }>
      <Stack direction='row' gap={1}>
        <Button
          variant='contained'
          onClick={isRunning ? handleStop : handleStart}
          color={isRunning ? "error" : "primary"}>
          {isRunning ? "정지" : "시작"}
        </Button>
        <Button variant='outlined' onClick={handleReset} disabled={isRunning}>
          초기화
        </Button>
      </Stack>
    </Slot>
  );
};

export default SlotQuest;
