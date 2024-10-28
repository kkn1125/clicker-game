// this variable use to unit size and block size
export const GAME_RATIO = window.devicePixelRatio;
export const SCREEN_RATIO = 6 / 9;
export const UNIT_SIZE = 25 * GAME_RATIO;
export const DIST_SIZE = UNIT_SIZE;
export const GROUND_LEVEL = UNIT_SIZE + UNIT_SIZE * 1.2 / GAME_RATIO;
export const GAME_HEIGHT = 0.9;
export const SLOT_HEIGHT = 220;
export const SLOT_IMAGE_SIZE = 40;

export const GAME_TICK = 16;
// 100 최대
// 1.6 최소
export const ATTACK_TICK = 1.6;

export const GRAVITY = 2.1;
export const HEIGHT_RATIO = 13;

/* images */
export const DEFAULT_SLOT_IMAGE = import.meta.resolve("/images/default_slot.png");
