import { Stat } from "./Stat";
import { Unit } from "./Unit";

export class UnitBuilder<T extends Unit> {
  static create<U extends Unit>(Class: new (name: string) => U, name: string): UnitBuilder<U> {
    return new UnitBuilder(new Class(name));
  }

  private unitClass: T;

  constructor(unitClass: T) {
    this.unitClass = unitClass;
  }

  setName(name: string) {
    if (!this.unitClass) return this;
    this.unitClass.name = name;
    return this;
  }
  setHp(hp: number) {
    if (!this.unitClass) return this;
    this.unitClass.hp = hp;
    this.unitClass.maxHp = hp;
    return this;
  }
  setStat(stat: Stat) {
    if (!this.unitClass) return this;
    this.unitClass.stat = stat;
    return this;
  }
  setLocation(x: number, y: number) {
    if (!this.unitClass) return this;
    this.unitClass.setLocation(x, y);
    return this;
  }
  setLocationX(x: number) {
    if (!this.unitClass) return this;
    this.unitClass.location.x = x;
    return this;
  }
  setLocationY(y: number) {
    if (!this.unitClass) return this;
    this.unitClass.location.y = y;
    return this;
  }
  setSize(x: number, y: number) {
    if (!this.unitClass) return this;
    this.unitClass.setSize(x, y);
    return this;
  }
  setSizeX(x: number) {
    if (!this.unitClass) return this;
    this.unitClass.size.x = x;
    return this;
  }
  setSizeY(y: number) {
    if (!this.unitClass) return this;
    this.unitClass.size.y = y;
    return this;
  }
  build(): T {
    const unitClass = this.unitClass;
    return unitClass;
  }
}
