import { updateInventoryDB } from "../APIHelpers";

import { CharacterFulltype, CharacterBasetype, EquipmentType, WeaponBaseType, PassiveType, SkillBaseType, EquipmentDisplayed, PassiveDisplayed, InventoryItem } from "../../types/character";
import {Characteristic, BonusKey, WeaponCategory, Element, equipmentType, ObjectMainType} from "../../types/stringLists";

import { fetchCharacter, fetchPassive, fetchSkill, fetchInventory, fetchItem } from "../APIHelpers";

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

export async function addOneItemToInventory(charId: number, objType: ObjectMainType, ObjectID:number): Promise<InventoryItem> {

  console.log("addOneItemToInventory charId", charId, "objType ", objType, "ObjectID ", ObjectID);

  const currentInventory = await fetchInventory(charId);
  const currentQuantity = currentInventory.find(i => i.ObjectID === ObjectID)?.Quantity || 0;
  let updatedItem: InventoryItem = {
    CharacterID: charId,
    ObjectType: objType,
    ObjectSubType: "Armor",
    ObjectID: ObjectID,
    Name: "",
    Quantity: currentQuantity + 1
  };

  const ItemFetch = await fetchItem(objType, ObjectID);
  updatedItem = { ...updatedItem, Name: ItemFetch.Name, ObjectSubType: ItemFetch.Subtype };

  return await UpdateItemToInventory(updatedItem);
}

export async function removeOneItemFromInventory(charId: number, objectType:ObjectMainType, ObjectID:number): Promise<InventoryItem> {

  const currentInventory = await fetchInventory(charId);
  const currentItem = currentInventory.find(i => i.ObjectID === ObjectID && i.ObjectType === objectType);

  if (!currentItem) {
    throw new Error(`Item not found in inventory: ${ObjectID}`);
  }

  const updatedItem = { ...currentItem, Quantity: currentItem.Quantity - 1 };
  return await UpdateItemToInventory(updatedItem);
}

export async function removeAllItemFromInventory(charId: number, objectType:ObjectMainType, ObjectID:number): Promise<InventoryItem> {

  const currentInventory = await fetchInventory(charId);
  const currentItem = currentInventory.find(i => i.ObjectID === ObjectID && i.ObjectType === objectType);

  if (!currentItem) {
    throw new Error(`Item not found in inventory: ${ObjectID}`);
  }

  const updatedItem = { ...currentItem, Quantity: 0 };
  return await UpdateItemToInventory(updatedItem);
}

export function filterInventoryByName(inventory: InventoryItem[], textSearched: string): InventoryItem[] {
  return inventory.filter(item => item.Name.toLowerCase().includes(textSearched.toLowerCase()));
}

export function filterSelectionListByType(BaseList: InventoryItem[], typeFilters : {weapon: boolean, equipment: boolean, accesory: boolean}) : InventoryItem[] {
  return BaseList.filter(item => typeFilters[item.ObjectType as keyof typeof typeFilters]);
}

export function filterEquipmentListBySubType(BaseList: InventoryItem[], subtype : equipmentType) : InventoryItem[] {
  const filteredList = BaseList.filter(item => item.ObjectSubType === subtype || item.ObjectSubType === "All");
  return filteredList;
}
  