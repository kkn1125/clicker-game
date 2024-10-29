import { DEFAULT_SLOT_IMAGE } from "@common/variables";
import { v4 } from "uuid";
import { Game } from "./Game";

interface QuestProps {
  slotImage: string;
  title: string;
  description: string;
  time: number;
  reward: number;
}
export class Quest {
  id: string;
  slotImage: string;
  title: string;
  description: string;
  reward: number;
  time: number;
  isCompleted: boolean;

  constructor({ slotImage, title, description, time, reward }: QuestProps) {
    this.id = "quest-" + v4();
    this.slotImage = slotImage || DEFAULT_SLOT_IMAGE;
    this.title = title;
    this.description = description;
    this.reward = reward;
    this.time = time;
    this.isCompleted = false;
  }

  complete(game: Game) {
    this.isCompleted = true;
    game.earnMoney(this.reward);
    return this.reward;
  }

  unComplete() {}
}
