import { SLOT_IMAGE_SIZE } from "@common/variables";
import { Box, Paper, Stack, Typography } from "@mui/material";

interface SlotProps {
  image: string;
  title: string;
  content: string;
  cost: number;
  children: React.ReactNode | React.ReactNode[];
  gauge?: boolean;
  gaugeSlot?: React.ReactNode;
}
const Slot: React.FC<SlotProps> = ({
  image,
  title,
  content,
  cost,
  children,
  gauge = false,
  gaugeSlot,
}) => {
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
        src={image}
        sx={{
          width: SLOT_IMAGE_SIZE,
          height: SLOT_IMAGE_SIZE,
          backgroundColor: "grey",
          borderRadius: 1,
        }}
      />
      <Stack alignItems='flex-end' flex={1}>
        <Typography fontWeight={700}>{title}</Typography>
        <Typography variant='caption'>{content}</Typography>
        {gauge && gaugeSlot}
      </Stack>
      <Stack direction='row' alignItems='center' gap={1}>
        <Typography>🪙{cost}</Typography>
      </Stack>
      {children}
    </Paper>
  );
};

export default Slot;
