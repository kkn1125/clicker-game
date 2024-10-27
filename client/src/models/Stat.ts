export class Stat {
  str: number = 5;
  dex: number = 5;
  int: number = 5;
  lck: number = 5;

  static create() {
    return Object.assign({}, new Stat());
  }

  static copy(stat: Stat) {
    return Object.assign({}, stat);
  }
}
