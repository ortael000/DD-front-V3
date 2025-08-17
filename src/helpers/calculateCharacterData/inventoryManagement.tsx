import { updateInventory } from "../APIHelpers";

import { CharacterFulltype, CharacterBasetype, EquipmentType, WeaponBaseType, PassiveType, SkillBaseType, EquipmentDisplayed, PassiveDisplayed, InventoryItem } from "../../types/character";
import {Characteristic, BonusKey, WeaponCategory, Element} from "../../types/stringLists";

import { fetchCharacter, fetchEquipment, fetchPassive, fetchWeapon, fetchSkill } from "../APIHelpers";

export async function UpdateItemToInventory(item: InventoryItem): Promise<any> {

  console.log("UpdateItemToInventory...", item);

  const path = process.env.backEndAdress || 'http://localhost:3000';


  return fetch(`${path}/inventoryupdate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }
      return res.json();
    });
}

export function addOneItemToInventory(item: InventoryItem): InventoryItem {
  const updatedItem = { ...item, Quantity: item.Quantity + 1 };
  return updatedItem;
}

export function removeOneItemFromInventory(item: InventoryItem): InventoryItem {
  const updatedItem = { ...item, Quantity: item.Quantity - 1 };
  return updatedItem;
}

export function removeAllItemsFromInventory(item: InventoryItem): InventoryItem {
  const updatedItem = { ...item, Quantity: 0 };
  return updatedItem;
}
