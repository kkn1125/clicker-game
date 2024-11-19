import { GAME_HEIGHT, SCREEN_RATIO } from "@common/variables";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, IconButton, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface MenuButtonProps {}
const MenuButton: React.FC<MenuButtonProps> = () => {
  const [open, setOpen] = useState(false);

  function handleOpenModal() {
    setOpen(true);
  }

  function handleCloseModal() {
    setOpen(false);
  }

  function handleToggleModal() {
    setOpen(!open);
  }

  useEffect(() => {
    function handleCloseModal() {
      setOpen(false);
    }
    function handleKeyEventOpenedCloseModal(e: KeyboardEvent) {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    }
    function handleMouseEventOpenedCloseModal(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (
        !target ||
        target.closest("#menu-modal") ||
        target.closest("#menu-btn")
      )
        return;
      handleCloseModal();
    }
    window.addEventListener("click", handleMouseEventOpenedCloseModal);
    window.addEventListener("keydown", handleKeyEventOpenedCloseModal);
    return () => {
      window.removeEventListener("keydown", handleKeyEventOpenedCloseModal);
      window.removeEventListener("click", handleMouseEventOpenedCloseModal);
    };
  }, []);

  function handleCloseGame() {
    if (confirm("게임을 종료하시겠습니까?")) window.close();
  }

  return (
    <Stack position='relative'>
      {open && (
        <Paper
          id='menu-modal'
          sx={{
            position: "absolute",
            top: `calc(${(1 - GAME_HEIGHT) * 100}vh / 2 + 40px)`,
            right: `calc(50% - ${
              GAME_HEIGHT * 100
            }vh * ${SCREEN_RATIO} / 2 - 73px)`,
            zIndex: 100,
            transform: "translateX(-50%)",
            backgroundColor: (theme) => theme.palette.background.paper,
          }}>
          <Stack p={1} gap={1} sx={{ textAlign: "right" }}>
            <Button>New Game</Button>
            <Button>Game Options</Button>
            <Button onClick={handleCloseGame}>Exit</Button>
          </Stack>
        </Paper>
      )}

      <IconButton
        id='menu-btn'
        onClick={handleToggleModal}
        sx={{
          position: "absolute",
          top: `calc(${(1 - GAME_HEIGHT) * 100}vh / 2)`,
          left: `calc(50% + ${
            GAME_HEIGHT * 100
          }vh * ${SCREEN_RATIO} / 2 - 20px)`,
          zIndex: 100,
          transform: "translateX(-50%)",
        }}>
        <MenuIcon />
      </IconButton>
    </Stack>
  );
};

export default MenuButton;
