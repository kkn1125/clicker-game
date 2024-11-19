import { UnitBuilder } from "@models/UnitBuilder";
import { Monster } from "@models/Monster";
import { StatBuilder } from "@models/StatBuilder";
import { GROUND_LEVEL, UNIT_SIZE } from "@common/variables";

export function DevilGooFactory() {
  return UnitBuilder.create(Monster, "devilGoo")
    .setHp(80)
    .setLocation(12 * UNIT_SIZE, GROUND_LEVEL * 5)
    .setStat(StatBuilder.create().setStr(10).setDex(10).build())
    .build();
}
