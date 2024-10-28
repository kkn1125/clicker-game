import { Game } from "./Game";

export class Upgrade {
  id: string;
  slotImage: string;
  title: string;
  description: string;
  price: number;

  constructor(
    id: string,
    slotImage: string,
    title: string,
    description: string,
    price: number
  ) {
    this.id = id;
    this.slotImage = slotImage;
    this.title = title;
    this.description = description;
    this.price = price;
  }

  upgrade(game: Game) {
    if (game.gameMoney >= this.price) {
      game.gameMoney -= this.price;
    }
  }
}
