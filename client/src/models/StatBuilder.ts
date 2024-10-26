import { Stat } from "./Stat";

export class StatBuilder {
  static create() {
    return new StatBuilder();
  }

  private stat: Stat;

  constructor() {
    this.stat = new Stat();
  }

  setStr(str: number) {
    if (!this.stat) return this;
    this.stat.str = str;
    return this;
  }
  setDex(dex: number) {
    if (!this.stat) return this;
    this.stat.dex = dex;
    return this;
  }
  setInt(int: number) {
    if (!this.stat) return this;
    this.stat.int = int;
    return this;
  }
  setLck(lck: number) {
    if (!this.stat) return this;
    this.stat.lck = lck;
    return this;
  }
  build() {
    const stat = this.stat;
    return stat;
  }
}
