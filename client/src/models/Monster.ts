import { Unit } from "./Unit";

export class Monster extends Unit {
  constructor(name: string) {
    super(name);
    this.color = "yellow";
  }
}
