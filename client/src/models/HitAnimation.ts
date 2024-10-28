import { DIST_SIZE, UNIT_SIZE, GROUND_LEVEL, GAME_HEIGHT } from "@common/variables";

export class HitAnimation {
  damage: number;
  x: number;
  y: number;

  speed: number;

  endTime: number = 500;

  constructor(damage: number, x: number, y: number) {
    this.damage = damage;
    this.x = x;
    this.y = y;

    this.speed = 0.5;
  }

  render(ctx: CanvasRenderingContext2D) {
    const gameWidth = UNIT_SIZE * 15;
    const gameHeight = window.innerHeight * GAME_HEIGHT;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // 게임 화면 영역과 주변 배경 그리기
    const adjustedX = centerX - gameWidth / 2 + this.x;
    const adjustedY = centerY + gameHeight / 2 - this.y - UNIT_SIZE * 1.8; // GROUND_LEVEL을 고려하여 y 위치 조정

    ctx.globalAlpha = this.endTime > 0 ? ((this.endTime / 500) * 100) / 100 : 0;
    ctx.font = "32px Arial";

    // 텍스트 테두리 설정
    ctx.strokeStyle = "#121212";
    ctx.lineWidth = 3;

    const damageText = this.damage.toString();

    const textWidth = ctx.measureText(damageText).width;
    // 그라데이션 생성
    const gradient = ctx.createLinearGradient(
      adjustedX + UNIT_SIZE / 2 - textWidth / 2,
      adjustedY,
      adjustedX + UNIT_SIZE / 2 - textWidth / 2,
      adjustedY + 32
    );
    gradient.addColorStop(0, "blue");
    gradient.addColorStop(1, "white");

    ctx.lineWidth = 3;
    ctx.fillStyle = gradient;
    ctx.strokeText(
      damageText,
      adjustedX + UNIT_SIZE / 2 - textWidth / 2,
      adjustedY
    );
    ctx.fillText(
      damageText,
      adjustedX + UNIT_SIZE / 2 - textWidth / 2,
      adjustedY
    );
    this.y += this.speed;
    this.endTime -= 5;

    ctx.globalAlpha = 1;
  }
}
