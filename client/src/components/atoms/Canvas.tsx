import { Box, Stack } from "@mui/material";
import { memo, useEffect, useRef, useState } from "react";
// import { Game } from "@models/Game";
import { WaveFactory } from "@/entity/waves/factory";
import { DEFAULT_SLOT_IMAGE, GROUND_LEVEL, UNIT_SIZE } from "@common/variables";
import { useGame } from "@hooks/useGame";
import { Player } from "@models/Player";
import { Quest } from "@models/Quest";
import { UnitBuilder } from "@models/UnitBuilder";
import { Upgrade } from "@models/Upgrade";

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

      /* Upgrades */
      game.addUpgrade(
        new Upgrade({
          type: "stat",
          slotImage: DEFAULT_SLOT_IMAGE,
          name: "str",
          title: "Strength",
          description: "힘이 좋으면 기본 데미지가 증가합니다.",
          price: 1,
          grade: 5,
        })
      );
      game.addUpgrade(
        new Upgrade({
          type: "stat",
          slotImage: DEFAULT_SLOT_IMAGE,
          name: "dex",
          title: "Dexterity",
          description: "민첩이 좋으면 최소 데미지가 증가합니다.",
          price: 1,
          grade: 5,
        })
      );
      game.addUpgrade(
        new Upgrade({
          type: "stat",
          slotImage: DEFAULT_SLOT_IMAGE,
          name: "int",
          title: "Intelligence",
          description: "지능이 좋으면 마력이 강해집니다.",
          price: 1,
          grade: 5,
        })
      );
      game.addUpgrade(
        new Upgrade({
          type: "stat",
          slotImage: DEFAULT_SLOT_IMAGE,
          name: "lck",
          title: "Luck",
          description: "운이 좋으면 획득 경험치가 증가합니다.",
          price: 1,
          grade: 5,
        })
      );

      /* Quests */
      game.addQuest(
        new Quest({
          slotImage: DEFAULT_SLOT_IMAGE,
          title: "퀘스트",
          description: "퀘스트 설명",
          reward: 100,
          time: 1,
        })
      );

      game.setPlayer(
        UnitBuilder.create(Player, "Player")
          .setLocation(6 * UNIT_SIZE, GROUND_LEVEL * 5)
          .build()
      );

      game.addWave(
        WaveFactory({
          slime: 45,
        }),
        WaveFactory({
          devilGoo: 30,
        }),
        WaveFactory({
          poisonMushroom: 27,
        }),
        WaveFactory({
          golem: 15,
        })
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
      console.log("initialize:", renderGameId);
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

export default memo(Canvas);
