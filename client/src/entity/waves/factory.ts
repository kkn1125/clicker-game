import { MonsterFactory } from "../monster/factory";

export function WaveFactory() {

  return [
    MonsterFactory("slime"),
    MonsterFactory("slime"),
    MonsterFactory("slime"),
    MonsterFactory("slime"),
    MonsterFactory("slime"),
    MonsterFactory("slime"),
    MonsterFactory("slime"),
    MonsterFactory("slime"),
    MonsterFactory("slime"),
    MonsterFactory("golem"),
  ]
}
