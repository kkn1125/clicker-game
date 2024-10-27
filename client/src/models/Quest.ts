export class Quest {
  id: string;
  title: string;
  description: string;
  reward: number;
  isCompleted: boolean;

  constructor(id: string, title: string, description: string, reward: number) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.reward = reward;
    this.isCompleted = false;
  }

  complete() {}

  unComplete() {}
}
