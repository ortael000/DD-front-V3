import { CharacterFulltype } from "./character";
import type { Ennemy, Loot } from "./ennemy"; 

export type ElementType = "Physical" | "Chi" | "Fire" | "Lightning" | "Ice" | "Mental";

export type BattleSide = "party" | "monsters";

export type BattleEntity =
  | {
      kind: "character";
      side: BattleSide; // should be "party"
      key: string;      // unique key for React state (ex: "c-12")
      id: number;
      name: string;
      maxHp: number;
      maxMana: number;
      hp: number;
      mana: number;
      full: CharacterFulltype;
    }
  | {
      kind: "enemy";
      side: BattleSide; // should be "monsters"
      key: string;      // ex: "e-5"
      id: number;
      name: string;
      maxHp: number;
      maxMana: number;
      hp: number;
      mana: number;
      enemy: Ennemy;
    };

export type DamagePacket = {
  amount: number; // raw damage before resist
  element: ElementType;
};

export type BattleLogEvent = {
  ts: number;
  text: string;
};

export type LootResult = {
  lootTypeId: string;
  rolls: Array<{
    row: Loot;
    quantity: number;
    won: boolean;
  }>;
};
