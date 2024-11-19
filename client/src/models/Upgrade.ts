import { v4 } from "uuid";
import { Game } from "./Game";
import { Unit } from "./Unit";
import { Stat } from "./Stat";

interface UpgradeProps {
  type: keyof Pick<Unit, "stat">;
  slotImage: string;
  name: keyof Stat;
  title: string;
  description: string;
  price: number;
  grade: number;
}
export class Upgrade {
  id: string;
  type: keyof Pick<Unit, "stat">;
  slotImage: string;
  name: keyof Stat;
  title: string;
  description: string;
  price: number;
  grade: number;

  constructor({
    type,
    slotImage,
    name,
    title,
    description,
    price,
    grade,
  }: UpgradeProps) {
    this.id = "upgrade-" + v4();
    this.type = type;
    this.slotImage = slotImage;
    this.name = name;
    this.title = title;
    this.description = description;
    this.price = price;
    this.grade = grade;
  }

  upgrade(game: Game) {
    if (game.gameMoney >= this.price) {
      // console.log("spendMoney:", this.price);
      game.gameMoney -= this.price;
      this.grade += 1;
      this.price = Math.ceil((this.price * 11) / 10);
      game.player[this.type][this.name] += 1;
      return true;
    }
    return false;
  }

  canUpgrade(gameMoney: number) {
    let cost = this.price;
    let required = 0;

    for (let i = 0; i < 10; i++) {
      required += cost;
      cost = Math.ceil((cost * 11) / 10);
    }
    console.log("update cost:", required);
    return gameMoney >= required;
  }
}
