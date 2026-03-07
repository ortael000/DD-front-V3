import { CharacterFulltype } from "./character";
import { Ennemy } from "./ennemy";

export type BattleSide = "character" | "enemy" | "summon";

export type BattleEntity =
  | {
      instanceId: string;
      orderId: number;
      sourceId: number;
      side: "character";
      character: CharacterFulltype;
      name: string;
      currentHp: number;
      maxHp: number;
      currentMana: number;
      maxMana: number;
      initiative: number | null;
      status: string;
    }
  | {
      instanceId: string;
      orderId: number;
      sourceId: number;
      side: "enemy";
      enemy: Ennemy;
      name: string;
      currentHp: number;
      maxHp: number;
      currentMana: number;
      maxMana: number;
      initiative: number | null;
      status: string;
      lootType: number;
      lootValue: number;
    }
  |  {
      instanceId: string;
      orderId: number;
      sourceId: number;
      side: "summon";
      enemy: Ennemy;
      name: string;
      currentHp: number;
      maxHp: number;
      currentMana: number;
      maxMana: number;
      initiative: number | null;
      status: string;
      lootType: number;
      lootValue: number;
    };

export type PlayerRef = {
  id: number;
  Name: string;
};

export type LootObtainedItem = {
  InstanceID: string;
  LootTypeName: string;
  ObjectType: string;
  ObjectID: number;
  ObjectName: string;
};