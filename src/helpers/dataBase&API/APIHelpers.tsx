import { dataBaseCall, Characteristic } from '../../types/stringLists'
import { InventoryItem, WeaponBaseType, EquipmentType, CharacterBasetype, PassiveType, SkillBaseType } from '../../types/character';
import { Ennemy, Loot } from '../../types/ennemy';
import { ObjectMainType } from '../../types/stringLists';

type Updates = Partial<Omit<CharacterBasetype, 'id'>>;

export async function fetchItem (type: ObjectMainType, id: number | string) {

  const path = process.env.backEndAdress || 'http://localhost:3000';

  const res = await fetch(`${path}/${type}/${id}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch ${type} ${id}: ${res.status} ${res.statusText}`)
  }

  // parse the raw JSON
    const raw = await res.json()
  return raw
}

export async function fetchPassive (id: number | string) {

  const path = process.env.backEndAdress || 'http://localhost:3000';
  
const res = await fetch(`${path}/passive/${id}`)

  if (!res.ok) {
    throw new Error(`Failed to fetch passive ${id}: ${res.status} ${res.statusText}`)
  }

  // parse the raw JSON
    const raw = await res.json()
  return raw
}

export async function fetchSkill (id: number | string) {

  const path = process.env.backEndAdress || 'http://localhost:3000';
  
const res = await fetch(`${path}/skill/${id}`)

  if (!res.ok) {
    throw new Error(`Failed to fetch skill ${id}: ${res.status} ${res.statusText}`)
  }

  // parse the raw JSON
    const raw = await res.json()
  return raw
}

export async function fetchArrayOfObjects (ids: (number | string)[], databaseName: dataBaseCall) {
  const path = process.env.backEndAdress || 'http://localhost:3000';
  const url = `${path}/${databaseName}?ids=${ids.join(',')}`;
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
  const path = process.env.backEndAdress || 'http://localhost:3000';
  
  const res = await fetch(`${path}/inventory/${characterID}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch inventory for character ${characterID}: ${res.status} ${res.statusText}`);
  }

  // parse the raw JSON
  const raw = await res.json();
  const inventory = Array.isArray(raw) ? raw : [];

  console.log(`Fetched inventory for character ${characterID}:`, inventory);
  return inventory;
}

export async function updateInventoryDB (inventoryUpdate : InventoryItem) {

  console.log("Updating inventory with:", inventoryUpdate);

  const path = process.env.backEndAdress || 'http://localhost:3000';
  fetch(`${path}/inventoryupdate`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    inventoryUpdate
    })
  })
  .then(res => res.json())
  .then(console.log)
  .catch(console.error);
  
  console.log("Inventory updated successfully");
}

export async function fetchAllWeapons () : Promise<WeaponBaseType[]> {

  const path = process.env.backEndAdress || 'http://localhost:3000';
  
const res = await fetch(`${path}/weapons/all`)

  if (!res.ok) {
    throw new Error(`Failed to fetch all weapons: ${res.status} ${res.statusText}`)
  }

  // parse the raw JSON
    const raw = await res.json()
  return raw
}

export async function fetchAllEquipment () : Promise<EquipmentType[]> {

  const path = process.env.backEndAdress || 'http://localhost:3000';
  
const res = await fetch(`${path}/equipments/all`)

  if (!res.ok) {
    throw new Error(`Failed to fetch all equipments: ${res.status} ${res.statusText}`)
  }

  // parse the raw JSON
    const raw = await res.json()
  return raw
}

export async function fetchAllPassive () : Promise<PassiveType[]> {

  const path = process.env.backEndAdress || 'http://localhost:3000';

  const res = await fetch(`${path}/passives/all`);

  if (!res.ok) {
    throw new Error(`Failed to fetch all passives: ${res.status} ${res.statusText}`);
  }

  // parse the raw JSON
  const raw = await res.json();
  return raw;
}

export async function fetchAllSkills () : Promise<SkillBaseType[]> {

  const path = process.env.backEndAdress || 'http://localhost:3000';

  const res = await fetch(`${path}/skills/all`);

  if (!res.ok) {
    throw new Error(`Failed to fetch all skills: ${res.status} ${res.statusText}`);
  }

  // parse the raw JSON
  const raw = await res.json();
  return raw;
}

export async function fetchAllEnnemies () : Promise<Ennemy[]> {

  const path = process.env.backEndAdress || 'http://localhost:3000';

  const res = await fetch(`${path}/ennemies/all`);

  if (!res.ok) {
    throw new Error(`Failed to fetch all skills: ${res.status} ${res.statusText}`);
  }

  // parse the raw JSON
  const raw = await res.json();
  return raw;
}

export async function fetchLootByType(lootTypeId: number | string): Promise<Loot[]> {
  const path = process.env.backEndAdress || "http://localhost:3000";
  const res = await fetch(`${path}/loot/${lootTypeId}`);
  if (!res.ok) throw new Error(`Failed to fetch loot type ${lootTypeId}: ${res.status} ${res.statusText}`);
  return res.json();
}