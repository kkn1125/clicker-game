import { Unit } from "./Unit";

export class Monster extends Unit {
  money: number = 10;
  mexp: number = 1;

  constructor(name: MonsterType);
  constructor(monster: Monster);
  constructor(nameOrMonster: MonsterType | Monster) {
    super(nameOrMonster);
    this.color = "yellow";
  }

  setMoney(money: number) {
    this.money = money;
  }

  setMExp(mexp: number) {
    this.mexp = mexp;
  }
}
