import { GAME_HEIGHT, SCREEN_RATIO, VERSION } from "@common/variables";
import { Typography } from "@mui/material";

interface VersionChipProps {}
const VersionChip: React.FC<VersionChipProps> = () => {
  return (
    <Typography
      color='textDisabled'
      fontSize={12}
      sx={{
        position: "absolute",
        top: `calc(${(1 - GAME_HEIGHT) * 100}vh / 2)`,
        left: `calc(50% - ${GAME_HEIGHT * 100}vh * ${SCREEN_RATIO} / 2 + 20px)`,
        zIndex: 110,
        transform: "translateX(-50%)",
      }}>
      v{VERSION}
    </Typography>
  );
};

export default VersionChip;
