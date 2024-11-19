import { GolemFactory } from "./golem";
import { SlimeFactory } from "./slime";

export type MonsterType = "slime" | "golem";
export function MonsterFactory(type: MonsterType) {
  switch (type) {
    case "slime":
      return SlimeFactory();
    case "golem":
      return GolemFactory();
    default:
      return SlimeFactory();
  }
}
