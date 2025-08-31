import { dataBaseCall, Characteristic } from '../types/stringLists'
import { InventoryItem, WeaponBaseType, EquipmentType, CharacterBasetype, PassiveType, SkillBaseType } from '../types/character';
import { ObjectMainType } from '../types/stringLists';


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

export async function updateCharacterDB (charID: number, charKey: keyof CharacterBasetype, newValue: number): Promise<any> {

  console.log("Updating character:", charID, charKey, newValue);

  const path = process.env.backEndAdress || 'http://localhost:3000';

  const requestBody = {
    id: charID,
    charKey: charKey,
    value: newValue
  };

  return fetch(`${path}/characterupdate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody)
  })
    .then(res => {
    if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }
      // If there's no content, don't try to parse it
      if (res.status === 204) {
        return null;
      }
      return res.json();
    });

}
