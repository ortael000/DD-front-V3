import { updateCharacterDB } from "./characterAPI";

const noCharacteristics = {
  Strength: 10,
  Intelligence: 10,
  Constitution: 10,
  Charisma: 10,
  Dexterity: 10,
  Agility: 10,
  Perception: 10,
  Power: 10,
};

const noSkills = {
  skill1ID: 1,
  skill2ID: 1,
  skill3ID: 1,
  skill4ID: 1,
  skill5ID: 1,
  skill6ID: 1,
};

const noPassives = {
  passive1ID: 1,
  passive2ID: 1,
  passive3ID: 1,
  passive4ID: 1,
};

export const resetCharPassive = (charId : number) => {
  updateCharacterDB(charId, noPassives);
};

export const resetCharSkills = (charId : number) => {
  updateCharacterDB(charId, noSkills);
};

export const resetCharCharacteristics = (charId : number) => {
  updateCharacterDB(charId, noCharacteristics);
};
