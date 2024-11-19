import { Monster } from "@models/Monster";
import { MonsterFactory } from "../monster/MonsterFactory";

export type WaveFactory = Monster[];
export function WaveFactory(factory: Partial<Record<MonsterType, number>>) {
  return Object.entries(factory).flatMap(([name, amount]) => {
    return Array.from(Array(amount), () => MonsterFactory(name as MonsterType));
  });
}
