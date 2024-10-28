import { DEFAULT_SLOT_IMAGE } from "@common/variables";

interface QuestProps {
  id: string;
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

  constructor({ id, slotImage, title, description, time, reward }: QuestProps) {
    this.id = id;
    this.slotImage = slotImage || DEFAULT_SLOT_IMAGE;
    this.title = title;
    this.description = description;
    this.reward = reward;
    this.time = time;
    this.isCompleted = false;
  }

  complete() {
    this.isCompleted = true;
    return this.reward;
  }

  unComplete() {}
}
