import { dataBaseCall, Characteristic } from '../../types/stringLists'
import { InventoryItem, WeaponBaseType, EquipmentType, CharacterBasetype, PassiveType, SkillBaseType } from '../../types/character';
import { Ennemy, Loot } from '../../types/ennemy';
import { ObjectMainType } from '../../types/stringLists';
import { API_BASE_URL } from '../../config/api'; 

type Updates = Partial<Omit<CharacterBasetype, 'id'>>;

export async function fetchItem (type: ObjectMainType, id: number | string) {

  const res = await fetch(`${API_BASE_URL}/${type}/${id}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch ${type} ${id}: ${res.status} ${res.statusText}`)
  }

  // parse the raw JSON
    const raw = await res.json()
  return raw
}

export async function fetchPassive (id: number | string) {
  
const res = await fetch(`${API_BASE_URL}/passive/${id}`)

  if (!res.ok) {
    throw new Error(`Failed to fetch passive ${id}: ${res.status} ${res.statusText}`)
  }

  // parse the raw JSON
    const raw = await res.json()
  return raw
}

export async function fetchSkill (id: number | string) {

const res = await fetch(`${API_BASE_URL}/skill/${id}`)

  if (!res.ok) {
    throw new Error(`Failed to fetch skill ${id}: ${res.status} ${res.statusText}`)
  }

  // parse the raw JSON
    const raw = await res.json()
  return raw
}

export async function fetchArrayOfObjects (ids: (number | string)[], databaseName: dataBaseCall) {

  const url = `${API_BASE_URL}/${databaseName}?ids=${ids.join(',')}`;
  console.log(`Fetching objects from ${url}`);

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch objects from ${databaseName}: ${res.status} ${res.statusText}`);
  }

  // parse the raw JSON
  const raw = await res.json();
  return raw;
}

export async function fetchInventory(characterID: number | string) {
  
  const res = await fetch(`${API_BASE_URL}/inventory/${characterID}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch inventory for character ${characterID}: ${res.status} ${res.statusText}`);
  }

  // parse the raw JSON
  const raw = await res.json();
  const inventory = Array.isArray(raw) ? raw : [];

  console.log(`Fetched inventory for character ${characterID}:`, inventory);
  return inventory;
}

export async function updateInventoryDB(inventoryUpdate: InventoryItem) {
  console.log("Updating inventory with:", inventoryUpdate);

  const res = await fetch(`${API_BASE_URL}/inventoryupdate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      CharacterID: inventoryUpdate.CharacterID,
      ObjectType: inventoryUpdate.ObjectType,
      ObjectSubType: inventoryUpdate.ObjectSubType,
      ObjectID: inventoryUpdate.ObjectID,
      Name: inventoryUpdate.Name,
      Quantity: inventoryUpdate.Quantity
    })
  });

  if (!res.ok) {
    throw new Error(
      `Failed to update inventory: ${res.status} ${res.statusText}`
    );
  }

  const raw = await res.json();
  console.log("Inventory updated successfully", raw);
  return raw;
}


export async function fetchAllWeapons () : Promise<WeaponBaseType[]> {

  const res = await fetch(`${API_BASE_URL}/weapons/all`)

  if (!res.ok) {
    throw new Error(`Failed to fetch all weapons: ${res.status} ${res.statusText}`)
  }

  // parse the raw JSON
    const raw = await res.json()
  return raw
}

export async function fetchAllEquipment () : Promise<EquipmentType[]> {
  
  const res = await fetch(`${API_BASE_URL}/equipments/all`)

  if (!res.ok) {
    throw new Error(`Failed to fetch all equipments: ${res.status} ${res.statusText}`)
  }

  // parse the raw JSON
    const raw = await res.json()
  return raw
}

export async function fetchAllPassive () : Promise<PassiveType[]> {

  const res = await fetch(`${API_BASE_URL}/passives/all`);

  if (!res.ok) {
    throw new Error(`Failed to fetch all passives: ${res.status} ${res.statusText}`);
  }

  // parse the raw JSON
  const raw = await res.json();
  return raw;
}

export async function fetchAllSkills () : Promise<SkillBaseType[]> {

  const res = await fetch(`${API_BASE_URL}/skills/all`);

  if (!res.ok) {
    throw new Error(`Failed to fetch all skills: ${res.status} ${res.statusText}`);
  }

  // parse the raw JSON
  const raw = await res.json();
  return raw;
}

export async function fetchAllEnnemies () : Promise<Ennemy[]> {

  const res = await fetch(`${API_BASE_URL}/ennemies/all`);

  if (!res.ok) {
    throw new Error(`Failed to fetch all skills: ${res.status} ${res.statusText}`);
  }

  // parse the raw JSON
  const raw = await res.json();
  return raw;
}

export async function fetchLootByType(lootTypeId: number | string): Promise<Loot[]> {
  const res = await fetch(`${API_BASE_URL}/loot/${lootTypeId}`);
  if (!res.ok) throw new Error(`Failed to fetch loot type ${lootTypeId}: ${res.status} ${res.statusText}`);
  return res.json();
}