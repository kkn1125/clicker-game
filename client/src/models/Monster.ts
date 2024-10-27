import { Unit } from "./Unit";

export class Monster extends Unit {
  constructor(name: string);
  constructor(monster: Monster);
  constructor(nameOrMonster: string | Monster) {
    super(nameOrMonster);
    this.color = "yellow";
  }
}
