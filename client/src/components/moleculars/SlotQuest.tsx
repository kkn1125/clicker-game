import Slot from "@atoms/Slot";
import { useGame } from "@hooks/useGame";
import { Quest } from "@models/Quest";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

// const data = {
//   isRunning: false,
// };

interface SlotQuestProps {
  quest: Quest;
  gaugeValue: number;
  setGaugeValue: Dispatch<SetStateAction<Record<string, number>>>;
  // removeInterval: (id: string) => void;
  handleStart: (id: string) => void;
}
const SlotQuest: React.FC<SlotQuestProps> = ({
  quest,
  gaugeValue,
  handleStart,
}) => {
  return (
    <Slot
      image={quest.slotImage}
      title={quest.title}
      content={quest.description}
      cost={quest.reward}
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
              width: `${((gaugeValue || 0) / (quest.time * 1000)) * 100}%`,
              height: "100%",
              backgroundColor: (theme) => theme.palette.primary.main,
              // transition: "width 0.1s linear",
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
            {(((gaugeValue || 0) / (quest.time * 1000)) * 100).toFixed(1)}%
          </Typography>
        </Box>
      }>
      <Stack direction='row' gap={1}>
        <Button
          variant='contained'
          onClick={quest.isRunning ? undefined : () => handleStart(quest.id)}
          color={quest.isRunning ? "inherit" : "primary"}>
          {quest.isRunning ? "진행 중..." : "시작"}
        </Button>
      </Stack>
    </Slot>
  );
};

export default SlotQuest;
