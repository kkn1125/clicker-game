import { Monster } from "@models/Monster";
import { MonsterFactory, MonsterType } from "../monster/factory";

export type WaveFactory = Monster[];
export function WaveFactory(factory: Partial<Record<MonsterType, number>>) {
  return Object.entries(factory).flatMap(([name, amount]) => {
    return Array.from(Array(amount), () => MonsterFactory(name as MonsterType));
  });
  // return [
  //   MonsterFactory("slime"),
  //   MonsterFactory("slime"),
  //   MonsterFactory("slime"),
  //   MonsterFactory("slime"),
  //   MonsterFactory("slime"),
  //   MonsterFactory("slime"),
  //   MonsterFactory("slime"),
  //   MonsterFactory("slime"),
  //   MonsterFactory("slime"),
  //   MonsterFactory("golem"),
  // ];
}
