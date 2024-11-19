import { DevilGooFactory } from "./DevilGoo";
import { GolemFactory } from "./Golem";
import { PoisonMushroomFactory } from "./PoisonMushroomFactory";
import { SlimeFactory } from "./Slime";

export function MonsterFactory(type: MonsterType) {
  switch (type) {
    case "slime":
      return SlimeFactory();
    case "golem":
      return GolemFactory();
    case "poisonMushroom":
      return PoisonMushroomFactory();
    case "devilGoo":
      return DevilGooFactory();
    default:
      return SlimeFactory();
  }
}
