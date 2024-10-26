import { Unit } from "./Unit";

export class Player extends Unit {
  constructor(name: string) {
    super(name);
  }

  setChangeName(name: string) {
    this.name = name;
  }
}
