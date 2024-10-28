import { Box, Stack } from "@mui/material";
import { useEffect, useRef, useState } from "react";
// import { Game } from "@models/Game";
import { UnitBuilder } from "@models/UnitBuilder";
import { DEFAULT_SLOT_IMAGE, GROUND_LEVEL, UNIT_SIZE } from "@common/variables";
import { Monster } from "@models/Monster";
import { StatBuilder } from "@models/StatBuilder";
import { Player } from "@models/Player";
import { useGame } from "@hooks/useGame";
import { Quest } from "@models/Quest";

// const game = new Game();

interface CanvasProps {}
const Canvas: React.FC<CanvasProps> = () => {
  const { game /* update */ } = useGame();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hitCanvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [hitCtx, setHitCtx] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (hitCanvasRef.current) {
      const hitCanvas = hitCanvasRef.current;
      const hitCtx = hitCanvas.getContext("2d") as CanvasRenderingContext2D;

      hitCtx.imageSmoothingEnabled = true;
      hitCtx.imageSmoothingQuality = "high";

      setHitCtx(hitCtx);
    }

    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      game.addQuest(
        new Quest({
          id: "quest",
          slotImage: DEFAULT_SLOT_IMAGE,
          title: "퀘스트",
          description: "퀘스트 설명",
          reward: 100,
        })
      );

      game.setPlayer(
        UnitBuilder.create(Player, "player")
          .setLocation(6 * UNIT_SIZE, GROUND_LEVEL * 5)
          .build()
      );

      game.addMonster(
        UnitBuilder.create(Monster, "monster")
          .setHp(10)
          .setLocation(12 * UNIT_SIZE, GROUND_LEVEL * 5)
          .setStat(StatBuilder.create().setStr(10).setDex(10).build())
          .build()
      );
      game.addMonster(
        UnitBuilder.create(Monster, "monster")
          .setHp(20)
          .setLocation(12 * UNIT_SIZE, GROUND_LEVEL * 5)
          .setStat(StatBuilder.create().setStr(10).setDex(10).build())
          .build()
      );
      game.addMonster(
        UnitBuilder.create(Monster, "monster")
          .setHp(100)
          .setLocation(12 * UNIT_SIZE, GROUND_LEVEL * 5)
          .setStat(StatBuilder.create().setStr(10).setDex(10).build())
          .build()
      );

      setCtx(ctx);
    }

    function resizeCanvas() {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        hitCanvasRef.current!.width = window.innerWidth;
        hitCanvasRef.current!.height = window.innerHeight;
      }
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [game]);

  useEffect(() => {
    let renderGameId: number;

    function renderGame() {
      if (ctx && hitCtx) {
        ctx.clearRect(
          0,
          0,
          canvasRef.current!.width,
          canvasRef.current!.height
        );
        game.render(ctx, hitCtx);
      }
      renderGameId = requestAnimationFrame(renderGame);
    }

    renderGameId = requestAnimationFrame(renderGame);

    return () => {
      cancelAnimationFrame(renderGameId);
    };
  }, [ctx, game, hitCtx]);

  return (
    <Stack>
      <Box
        position='absolute'
        top={0}
        left={0}
        zIndex={10}
        component='canvas'
        ref={canvasRef}
      />
      <Box
        position='absolute'
        top={0}
        left={0}
        zIndex={50}
        component='canvas'
        ref={hitCanvasRef}
      />
    </Stack>
  );
};

export default Canvas;
