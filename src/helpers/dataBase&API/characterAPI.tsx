import { dataBaseCall, Characteristic } from '../../types/stringLists'
import { InventoryItem, WeaponBaseType, EquipmentType, CharacterBasetype, PassiveType, SkillBaseType } from '../../types/character';
import { ObjectMainType } from '../../types/stringLists';

type Updates = Partial<Omit<CharacterBasetype, 'id'>>;

export async function updateCharacterDB (charID: number, updates: Updates): Promise<any> {

  console.log("Updating character:", charID, updates);

  const path = process.env.backEndAdress || 'http://localhost:3000';

  const requestBody = {
    id: charID,
    updates: updates
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

export async function fetchCharacter(id: number | string) {
  
  const path = process.env.backEndAdress || 'http://localhost:3000';
  
const res = await fetch(`${path}/character/${id}`)

  if (!res.ok) {
    throw new Error(`Failed to fetch character ${id}: ${res.status} ${res.statusText}`)
  }

  // parse the raw JSON
    const raw = await res.json()
  return raw
}

export async function createCharacter  (name : string, password: string) {

  console.log("Creating character:", name);

  const path = process.env.backEndAdress || 'http://localhost:3000';

  const requestBody = {
    name: name,
    password: password
  };

  return fetch(`${path}/charactercreate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody)
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }
      return res.json();
    });
}

export async function fetchAllCharacter () {

  console.log("Fetching all characters");
  const path = process.env.backEndAdress || 'http://localhost:3000';

  const res = await fetch(`${path}/characters/all`);

  if (!res.ok) {
    throw new Error(`Failed to fetch all characters: ${res.status} ${res.statusText}`);
  }
  const raw = await res.json();
  console.log("Fetched characters:", raw);
  return raw;
}