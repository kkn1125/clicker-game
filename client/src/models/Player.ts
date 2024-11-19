import { Unit } from "./Unit";

export class Player extends Unit {
  constructor(name: MonsterType);
  constructor(player: Unit);
  constructor(nameOrPlayer: MonsterType | Unit) {
    super(nameOrPlayer);
    this.color = "blue";
  }

  setChangeName(name: MonsterType) {
    this.name = name;
  }
}
