import {
  ATTACK_TICK,
  DIST_SIZE,
  GROUND_LEVEL,
  UNIT_SIZE,
} from "@common/variables";
import { HitAnimation } from "./HitAnimation";
import { Monster } from "./Monster";
import { Player } from "./Player";
import { UnitBuilder } from "./UnitBuilder";



export class Game {
  monsters: Monster[] = [];
  player: Player;
  hitAnimations: HitAnimation[] = [];
  wave: number = 0;
  nextWave:number= 1
  backgroundOffset: number = 0;

  constructor() {
    this.player = UnitBuilder.create(Player, "player")
      .setLocation(4 * UNIT_SIZE, GROUND_LEVEL * UNIT_SIZE)
      .build();
  }

  addMonster(monster: Monster) {
    this.monsters.push(monster);
  }

  addHitAnimation(damage: number, x: number, y: number) {
    this.hitAnimations.push(new HitAnimation(damage, x, y));
  }

  renderBackground(ctx: CanvasRenderingContext2D) {
    const gameWidth = DIST_SIZE * 15;
    const gameHeight = DIST_SIZE * 23;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // 주변 배경 그리기
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    // 게임 화면 영역 지우기
    ctx.clearRect(
      centerX - gameWidth / 2,
      centerY - gameHeight / 2,
      gameWidth,
      gameHeight
    );

    // 게임 화면 영역 클리핑 설정
    ctx.save();
    ctx.beginPath();
    ctx.rect(
      centerX - gameWidth / 2,
      centerY - gameHeight / 2,
      gameWidth,
      gameHeight
    );
    ctx.clip();

    // 하늘 그리기
    ctx.fillStyle = "skyblue";
    ctx.fillRect(
      centerX - gameWidth / 2,
      centerY - gameHeight / 2,
      gameWidth,
      gameHeight
    );

    // 바닥 그리기
    const restHeight = (window.innerHeight - gameHeight) / 2;
    const groundLevel = GROUND_LEVEL * UNIT_SIZE - UNIT_SIZE;
    const groundHeight =
      gameHeight - (centerY + gameHeight / 2 - groundLevel) + restHeight;
    ctx.fillStyle = "brown";

    // 타일 크기 설정
    const tileWidth = UNIT_SIZE * 2;

    // 화면에 보이는 타일의 개수 계산 (여유 있게 1개 더 추가)
    const visibleTiles = Math.ceil(gameWidth / tileWidth) + 1;

    // 타일 그리기
    for (let i = 0; i < visibleTiles; i++) {
      const tileX = centerX - gameWidth / 2 + i * tileWidth - (this.backgroundOffset % tileWidth);
      ctx.fillRect(
        tileX,
        centerY + gameHeight / 2 - groundLevel,
        tileWidth,
        groundHeight
      );
    }
  }

  render(ctx: CanvasRenderingContext2D, hitCtx: CanvasRenderingContext2D) {
    this.renderBackground(ctx);
    this.player.render(ctx);

    hitCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (const hitAnimation of this.hitAnimations) {
      if (hitAnimation.endTime <= 0) {
        this.hitAnimations = this.hitAnimations.filter(
          (animation) => animation !== hitAnimation
        );
        continue;
      } else {
        hitAnimation.render(hitCtx);
      }
    }

    const monster = this.monsters[0];
    if (monster) {
      if (!monster.isAvailableFightBoundary(this.player)) {
        monster.moveX("left");
        this.backgroundOffset += monster.moveSpeed; // 배경 이동
      }
      if (monster.isAvailableFightBoundary(this.player)) {
        monster.isFighting = true;
      }
      if (monster.isFighting) {
        if (!this.player.attackDelay()) {
          if (this.player.attackDelayTime > 0) {
            this.player.attackDelayTime += ATTACK_TICK;
          } else {
            const attackedDamage = this.player.attack(monster);
            this.addHitAnimation(
              attackedDamage,
              monster.location.x,
              monster.location.y
            );
            if (monster.hp === 0) {
              this.monsters = this.monsters.filter((m) => m !== monster);
              this.player.attackDelayTime = 0;
              this.wave = this.nextWave;
            }
          }
        }
      }
      monster.render(ctx);
    }

    // this.players.attack(this.monsters[0]);
  }
}
