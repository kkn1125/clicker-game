import { Box, Button, Stack, Typography } from "@mui/material";

interface SlotItemProps {}
const SlotItem: React.FC<SlotItemProps> = () => {
  return (
    <Stack direction='row' alignItems='center' gap={2}>
      <Box
        sx={{
          width: 50,
          height: 50,
          backgroundColor: "grey",
          borderRadius: 1,
        }}
      />
      <Stack alignItems='flex-end' flex={1}>
        <Typography fontWeight={700}>고블린 퇴치 대작전</Typography>
        <Typography variant='caption'>고블린 잡고 치킨 먹자!</Typography>
      </Stack>

      <Stack direction='row' gap={1}>
        <Button
          variant='contained'
          size='small'
          sx={{ width: 32, height: 32, minWidth: 0 }}>
          +1
        </Button>
        <Button
          variant='contained'
          size='small'
          sx={{ width: 32, height: 32, minWidth: 0 }}>
          +10
        </Button>
      </Stack>
    </Stack>
  );
};

export default SlotItem;
