import {
  ATTACK_TICK,
  DIST_SIZE,
  GRAVITY,
  GROUND_LEVEL,
  UNIT_SIZE,
} from "@common/variables";
import { v4 } from "uuid";
import { Stat } from "./Stat";

export class Unit {
  id: string;
  name: string;

  location: {
    x: number;
    y: number;
  };

  size: {
    x: number;
    y: number;
  };

  moveSpeed: number;
  attackSpeed: number;

  color: string;
  stat: Stat;

  hp: number;
  maxHp: number;
  guard: number;
  criticalPercent: number;
  criticalProbability: number;

  velocity: {
    x: number;
    y: number;
  };

  isFighting: boolean = false;
  isKnockedBack: boolean = false;
  isJumping: boolean = false;

  attackDelayTime: number = 0;

  constructor(nameOrUnit: string|Unit) {
    if(typeof nameOrUnit === 'string' ){

      this.id = v4();
      this.name = nameOrUnit;
      this.stat = Stat.create();
      this.color = "#000000";
  
      this.hp = 100;
      this.maxHp = 100;
      this.guard = 0;
      this.criticalPercent = 0;
      this.criticalProbability = 0;
      this.velocity = {
        x: 0,
        y: 0,
      };
      this.location = {
        x: 0,
        y: 0,
      };
      this.size = {
        x: UNIT_SIZE,
        y: UNIT_SIZE,
      };
  
      this.moveSpeed = UNIT_SIZE * 0.05;
      this.attackSpeed = 100;
    } else {
      this.id = nameOrUnit.id;
      this.name = nameOrUnit.name;
      this.stat = Stat.copy(nameOrUnit.stat);

      this.color = nameOrUnit.color;
      this.hp = nameOrUnit.hp;
      this.maxHp = nameOrUnit.maxHp;
      this.guard = nameOrUnit.guard;
      this.criticalPercent = nameOrUnit.criticalPercent;
      this.criticalProbability = nameOrUnit.criticalProbability;
      this.velocity = {
        x: nameOrUnit.velocity.x,
        y: nameOrUnit.velocity.y,
      };
      this.location = {
        x: nameOrUnit.location.x,
        y: nameOrUnit.location.y,
      };
      this.size = {
        x: nameOrUnit.size.x,
        y: nameOrUnit.size.y,
      };
      this.moveSpeed = nameOrUnit.moveSpeed;
      this.attackSpeed = nameOrUnit.attackSpeed;
    }
  }

  setHp(hp: number) {
    this.hp = hp;
    this.maxHp = hp;
  }

  setGuard(guard: number) {
    this.guard = guard;
  }

  setCriticalPercent(criticalPercent: number) {
    this.criticalPercent = criticalPercent;
  }

  setCriticalProbability(criticalProbability: number) {
    this.criticalProbability = criticalProbability;
  }

  setStat(stat: Stat) {
    this.stat = stat;
  }

  setLocation(x: number, y: number) {
    this.setLocationX(x);
    this.setLocationY(y);
  }

  setLocationX(x: number) {
    this.location.x = x;
  }
  setLocationY(y: number) {
    this.location.y = y;
  }

  setSize(x: number, y: number) {
    this.setSizeX(x);
    this.setSizeY(y);
  }

  setSizeX(x: number) {
    this.size.x = x;
  }
  setSizeY(y: number) {
    this.size.y = y;
  }

  setMoveSpeed(moveSpeed: number) {
    this.moveSpeed = moveSpeed;
  }

  setAttackSpeed(attackSpeed: number) {
    this.attackSpeed = attackSpeed;
  }

  get attackedDamage() {
    const { str, dex } = this.stat;
    const { criticalPercent, criticalProbability } = this;

    // 데미지 계산 공식: (힘 * 2 + 민첩) / 3
    // 이 공식은 힘에 더 큰 가중치를 두면서도 민첩성을 고려합니다.
    // 힘은 주요 공격력을, 민첩은 정확성과 약간의 추가 데미지를 나타냅니다.
    const baseDamage = (str * 2 + dex) / 3;

    // 변동성 추가: 기본 데미지의 80% ~ 120% 사이의 랜덤 값
    const variability = 0.4; // 40% 변동성
    const randomFactor = 1 + (Math.random() * 2 - 1) * variability;
    const damage = baseDamage * randomFactor;

    // 주석: 이 방식은 데미지에 일정한 변동성을 추가하여 게임플레이를 더 흥미롭게 만듭니다.
    // 또한 힘과 민첩 스탯 모두가 중요하지만, 힘에 더 큰 비중을 둡니다.

    const randomCritical = Math.random() * 100;

    if (randomCritical < criticalProbability) {
      return damage * (1 + criticalPercent);
    }

    return Math.round(damage);
  }

  attack(mob: Unit) {
    const attackedDamage = this.attackedDamage;
    this.attackDelayTime += ATTACK_TICK;
    // console.log(
    //   `${this.name}이(가) ${mob.name}에게 ${attackedDamage} 데미지를 주었습니다.`
    // );
    mob.damaged(attackedDamage);
    return attackedDamage;
  }

  attackDelay() {
    const isReadyToAttack = this.attackDelayTime >= this.attackSpeed;
    if (isReadyToAttack) {
      this.attackDelayTime = 0;
    }
    return isReadyToAttack;
  }

  damaged(damage: number) {
    // // 가드 계산 방식 1: 방어 스탯당 1 데미지 감소
    // const guardReduction = this.stat.dex; // 민첩성을 방어력으로 사용
    // const damageAfterGuard1 = Math.max(damage - guardReduction, 0);

    // 가드 계산 방식 2: 퍼센트로 데미지 감소
    const guardPercentReduction = this.guard / 100;
    const damageAfterGuard2 = damage * (1 - guardPercentReduction);

    // 두 방식 중 더 유리한 것을 선택
    // const finalDamage = Math.min(damageAfterGuard1, damageAfterGuard2);
    const finalDamage = damageAfterGuard2;

    // 최종 데미지 적용
    this.hp -= Math.floor(finalDamage);
    if (this.hp < 0) {
      this.hp = 0;
    }

    // console.log(
    //   `${this.name}이(가) ${Math.floor(finalDamage)} 데미지를 받았습니다. ${
    //     this.hp
    //   }가 남았습니다.`
    // );
  }

  isAvailableFightBoundary(player: Unit) {
    return this.location.x - UNIT_SIZE * 2 < player.location.x;
  }

  moveX(direction: "left" | "right") {
    if (this.isFighting || this.isKnockedBack || this.isJumping) return;

    if (direction === "left") {
      this.location.x -= this.moveSpeed;
    } else {
      this.location.x += this.moveSpeed;
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    // 게임 화면 영역과 주변 배경 그리기
    const gameWidth = UNIT_SIZE * 15;
    const gameHeight = window.innerHeight * 0.8;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    ctx.fillStyle = this.color;

    ctx.fillRect(
      centerX - gameWidth / 2 + this.location.x,
      centerY + gameHeight / 2 - this.location.y - this.size.y,
      this.size.x,
      this.size.y
    );

    if (this.constructor.name !== "Player") {
      ctx.textAlign = "center";
      ctx.font = "14px Arial";
      const hp = this.hp.toString();
      const textHeight = ctx.measureText(hp).actualBoundingBoxDescent;
      const height =
        centerY + gameHeight / 2 - this.location.y - this.size.y*1.8;
      const maxHpBarWidth = this.size.x + 10;
      const hpBarWidth = (this.hp / this.maxHp) * maxHpBarWidth;
      ctx.fillStyle = "gray";
      // hp bg bar
      ctx.fillRect(
        centerX - gameWidth / 2 + this.location.x - 5,
        height - 3,
        maxHpBarWidth,
        this.size.y / 3 + 6
      );
      ctx.fillStyle = "red";
      // hp bar
      ctx.fillRect(
        centerX - gameWidth / 2 + this.location.x - 5,
        height - 3,
        hpBarWidth,
        this.size.y / 3 + 6
      );
      ctx.lineWidth = 3;
      ctx.strokeStyle = "black";
      ctx.fillStyle = "white";
      ctx.strokeText(
        hp,
        centerX - gameWidth / 2 + this.location.x + this.size.x / 2,
        height + 12
      );
      ctx.fillText(
        hp,
        centerX - gameWidth / 2 + this.location.x + this.size.x / 2,
        height + 12
      );
    }
  }

  jump() {
    if (this.location.y === GROUND_LEVEL * UNIT_SIZE) {
      this.velocity.y = 10; // 점프 초기 속도 설정
      this.isJumping = true;
    }
  }

  knockback(power: number, direction: "left" | "right") {
    const knockbackPower = direction === "left" ? -power : power;

    // 넉백으로 인한 약간의 점프 효과
    if (this.location.y === GROUND_LEVEL * UNIT_SIZE) {
      this.velocity.y = 15;
      this.isJumping = true;
    }

    this.location.x += knockbackPower;

    this.isKnockedBack = true;
  }

  update() {
    // 중력 적용
    this.velocity.y -= GRAVITY;
    this.location.y += this.velocity.y;

    // 바닥에 닿으면 멈추기
    if (this.location.y <= GROUND_LEVEL * UNIT_SIZE) {
      this.location.y = GROUND_LEVEL * UNIT_SIZE;
      this.velocity.y = 0;
      this.isJumping = false;
      this.isKnockedBack = false;
    }
  }
}
