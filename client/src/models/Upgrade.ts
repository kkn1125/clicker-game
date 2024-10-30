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
      game.gameMoney -= this.price;
      this.grade += 1;
      this.price = Math.floor(this.price * Math.floor(1 + this.grade / 100));
      game.player[this.type][this.name] += 1;
      return true;
    }
    return false;
  }
}
