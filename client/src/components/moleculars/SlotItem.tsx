import { DEFAULT_SLOT_IMAGE } from "@common/variables";
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
  currentValue=0,
  handleControl,
}) => {
  const RECT_SIZE = 40;

  return (
    <Paper
      component={Stack}
      direction='row'
      alignItems='center'
      gap={2}
      p={1}
      sx={{ backgroundColor: "inherit" }}>
      <Box
        component='img'
        src={image || DEFAULT_SLOT_IMAGE}
        sx={{
          width: RECT_SIZE,
          height: RECT_SIZE,
          backgroundColor: "grey",
          borderRadius: 1,
        }}
      />
      <Stack alignItems='flex-end' flex={1}>
        <Typography fontWeight={700}>{title}</Typography>
        <Typography variant='caption'>{content}</Typography>
      </Stack>

      <Stack direction='row' gap={1}>
        <Typography>{currentValue}</Typography>
        <Button
          variant='contained'
          size='small'
          onClick={handleControl}
          sx={{ width: RECT_SIZE, height: RECT_SIZE, minWidth: 0 }}>
          +1
        </Button>
        <Button
          variant='contained'
          size='small'
          onClick={() => {
            for (let i = 0; i < 10; i++) handleControl();
          }}
          sx={{ width: RECT_SIZE, height: RECT_SIZE, minWidth: 0 }}>
          +10
        </Button>
      </Stack>
    </Paper>
  );
};

export default SlotItem;
