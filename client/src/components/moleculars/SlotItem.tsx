import Slot from "@atoms/Slot";
import { DEFAULT_SLOT_IMAGE, SLOT_IMAGE_SIZE } from "@common/variables";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";

interface SlotItemProps {
  image: string;
  title: string;
  content: string;
  currentValue: number;
  handleControl: () => void;
}
const SlotItem: React.FC<SlotItemProps> = ({
  image,
  title,
  content,
  currentValue = 0,
  handleControl,
}) => {
  return (
    <Slot image={image} title={title} content={content}>
      <Stack direction='row' gap={1}>
        <Typography>{currentValue}</Typography>
        <Button
          variant='contained'
          size='small'
          onClick={handleControl}
          sx={{ width: SLOT_IMAGE_SIZE, height: SLOT_IMAGE_SIZE, minWidth: 0 }}>
          +1
        </Button>
        <Button
          variant='contained'
          size='small'
          onClick={() => {
            for (let i = 0; i < 10; i++) handleControl();
          }}
          sx={{ width: SLOT_IMAGE_SIZE, height: SLOT_IMAGE_SIZE, minWidth: 0 }}>
          +10
        </Button>
      </Stack>
    </Slot>
  );
};

export default SlotItem;
