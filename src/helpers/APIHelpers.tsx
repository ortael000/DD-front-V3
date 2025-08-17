import { dataBaseCall } from '../types/stringLists'
import { InventoryItem, WeaponBaseType, EquipmentType } from '../types/character';


export async function fetchCharacter(id: number | string) {
  
  const path = process.env.backEndAdress || 'http://localhost:3000';
  
const res = await fetch(`http://localhost:3000/character/${id}`)

  if (!res.ok) {
    throw new Error(`Failed to fetch character ${id}: ${res.status} ${res.statusText}`)
  }

  // parse the raw JSON
    const raw = await res.json()
  return raw
}

export async function fetchWeapon (id: number | string) {
  
  const path = process.env.backEndAdress || 'http://localhost:3000';
  
const res = await fetch(`http://localhost:3000/weapon/${id}`)

  if (!res.ok) {
    throw new Error(`Failed to fetch weapon ${id}: ${res.status} ${res.statusText}`)
  }

  // parse the raw JSON
    const raw = await res.json()
  return raw
}

export async function fetchEquipment (id: number | string) {
  
  const path = process.env.backEndAdress || 'http://localhost:3000';
  
const res = await fetch(`http://localhost:3000/equipment/${id}`)

  if (!res.ok) {
    throw new Error(`Failed to fetch equipment ${id}: ${res.status} ${res.statusText}`)
  }

  // parse the raw JSON
    const raw = await res.json()
  return raw
}

export async function fetchPassive (id: number | string) {

  const path = process.env.backEndAdress || 'http://localhost:3000';
  
const res = await fetch(`http://localhost:3000/passive/${id}`)

  if (!res.ok) {
    throw new Error(`Failed to fetch passive ${id}: ${res.status} ${res.statusText}`)
  }

  // parse the raw JSON
    const raw = await res.json()
  return raw
}

export async function fetchSkill (id: number | string) {

  const path = process.env.backEndAdress || 'http://localhost:3000';
  
const res = await fetch(`http://localhost:3000/skill/${id}`)

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
  return raw;
}

export async function updateInventory (inventoryUpdate : InventoryItem) {

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
  
const res = await fetch(`http://localhost:3000/weapons/all`)

  if (!res.ok) {
    throw new Error(`Failed to fetch all weapons: ${res.status} ${res.statusText}`)
  }

  // parse the raw JSON
    const raw = await res.json()
  return raw
}

export async function fetchAllEquipment () : Promise<EquipmentType[]> {

  const path = process.env.backEndAdress || 'http://localhost:3000';
  
const res = await fetch(`http://localhost:3000/equipments/all`)

  if (!res.ok) {
    throw new Error(`Failed to fetch all equipments: ${res.status} ${res.statusText}`)
  }

  // parse the raw JSON
    const raw = await res.json()
  return raw
}