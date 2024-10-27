import { Unit } from "./Unit";

export class Player extends Unit {
  constructor(name: string);
  constructor(player: Unit);
  constructor(nameOrPlayer: string | Unit) {
    super(nameOrPlayer);
    this.color = "blue";
  }

  setChangeName(name: string) {
    this.name = name;
  }
}
