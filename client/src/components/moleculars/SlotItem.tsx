import Slot from "@atoms/Slot";
import { SLOT_IMAGE_SIZE } from "@common/variables";
import { useGame } from "@hooks/useGame";
import { Upgrade } from "@models/Upgrade";
import { Button, Stack, Typography } from "@mui/material";

interface SlotItemProps {
  upgrade: Upgrade;
}
const SlotItem: React.FC<SlotItemProps> = ({ upgrade }) => {
  const { game, updateGame } = useGame();

  return (
    <Slot
      image={upgrade.slotImage}
      title={upgrade.title}
      content={upgrade.description}
      cost={upgrade.price}>
      <Stack direction='row' gap={1} alignItems='center'>
        <Typography>Lv.{upgrade.grade}</Typography>
        <Button
          variant='contained'
          size='small'
          onClick={() => {
            upgrade.upgrade(game);
            updateGame();
          }}
          sx={{ width: SLOT_IMAGE_SIZE, height: SLOT_IMAGE_SIZE, minWidth: 0 }}>
          +1
        </Button>
        <Button
          variant='contained'
          size='small'
          onClick={() => {
            if (upgrade.canUpgrade(game.gameMoney)) {
              for (let i = 0; i < 10; i++) {
                upgrade.upgrade(game);
              }
              updateGame();
            }
          }}
          sx={{ width: SLOT_IMAGE_SIZE, height: SLOT_IMAGE_SIZE, minWidth: 0 }}>
          +10
        </Button>
      </Stack>
    </Slot>
  );
};

export default SlotItem;
