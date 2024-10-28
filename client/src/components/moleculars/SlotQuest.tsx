import Slot from "@atoms/Slot";
import { useGame } from "@hooks/useGame";
import { Box, Button, keyframes, Stack } from "@mui/material";
import { useState } from "react";

interface SlotQuestProps {
  image: string;
  title: string;
  content: string;
}
const SlotQuest: React.FC<SlotQuestProps> = ({ image, title, content }) => {
  const { completedQuest } = useGame();
  const [gaugeValue, setGaugeValue] = useState(0);

  const gaugeAnimation = keyframes`
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  `;

  function handleGauge() {
    const timeout = 1000;
    setTimeout(() => {
      setGaugeValue(gaugeValue + 1);
      completedQuest(title);
    }, timeout);
  }

  return (
    <Slot
      image={image}
      title={title}
      content={content}
      gauge
      gaugeSlot={
        <Box
          width='100%'
          height={10}
          bgcolor='grey'
          overflow='hidden'
          borderRadius={0.5}>
          <Box
            width={0}
            height='100%'
            bgcolor='greenyellow'
            sx={{
              animation: `${gaugeAnimation} 1s linear infinite`,
            }}
          />
        </Box>
      }>
      <Stack direction='row' gap={1}>
        <Button variant='contained' onClick={handleGauge}>
          시작
        </Button>
      </Stack>
    </Slot>
  );
};

export default SlotQuest;
