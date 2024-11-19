import { Monster } from "./Monster";
import { Stat } from "./Stat";
import { Unit } from "./Unit";

export class UnitBuilder<T extends Unit> {
  static create<U extends Unit>(
    Class: new (name: MonsterType) => U,
    name: MonsterType
  ): UnitBuilder<U> {
    return new UnitBuilder(new Class(name));
  }

  static copy<U extends Unit>(
    Class: new (name: U) => U,
    unit: U
  ): UnitBuilder<U> {
    return new UnitBuilder(new Class(unit));
  }

  private unitClass: T;

  constructor(unitClass: T) {
    this.unitClass = unitClass;
  }

  setName(name: MonsterType) {
    if (!this.unitClass) return this;
    this.unitClass.name = name;
    return this;
  }
  setLevel(level: number) {
    if (!this.unitClass) return this;
    this.unitClass.setLevel(level);
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
  setMExp(mexp: number) {
    (this.unitClass as unknown as Monster).setMExp(mexp);
    return this;
  }
  setMoney(money: number) {
    (this.unitClass as unknown as Monster).setMoney(money);
    return this;
  }
  build(): T {
    const unitClass = this.unitClass;
    return unitClass;
  }
}
