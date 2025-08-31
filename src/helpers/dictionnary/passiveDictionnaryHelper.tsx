import { PassiveType } from "../../types/character";


const displayedBonus = [
  "DefenseMelee",
  "DefenseRange",
  "ResPhysical",
  "Strength",
  "Intelligence",
  "Constitution",
  "Charisma",
  "Dexterity",
  "Agility",
  "Perception",
  "Power",
];

const transformPassiveToDic = (passive: PassiveType) => {

  const positives: string[] = [];
  const negatives: string[] = [];

  for (const [key, rawVal] of Object.entries(passive)) {

    let toBePutInText = true

    if (key === 'id' ) toBePutInText = false;
    if (key === 'LevelRequired') toBePutInText = false;
    if (key === 'OtherEffect') toBePutInText = false;
    if (key === 'ParentPassive') toBePutInText = false;
    if (key === 'PassiveLevel') toBePutInText = false;
    if (key === 'Value') toBePutInText = false;
    if (displayedBonus.includes(key)) {
      toBePutInText = false;
    }


    if (key === 'WeaponPrecisionBonus') {
      toBePutInText = false;
      if (rawVal > 0) {
        const formatted = `Precision for ${passive.WeaponType}: ${'+' + rawVal}`;
        positives.push(formatted);
      } else if (rawVal < 0) {
        const formatted = `Precision for ${passive.WeaponType}: ${'-' + rawVal}`;
        negatives.push(formatted);
      }
    }
    if (key === 'WeaponDamageBonus') {
      toBePutInText = false;
      if (rawVal > 0) {
        const formatted = `Damage for ${passive.WeaponType}: ${'+' + rawVal}`;
        positives.push(formatted);
      } else if (rawVal < 0) {
        const formatted = `Damage for ${passive.WeaponType}: ${'-' + rawVal}`;
        negatives.push(formatted);
      }
    }
    // we have a “bonus” field


    if (toBePutInText) {
      const val = rawVal as number;
    const formatted = `${key}: ${val >= 0 ? '+' + val : val}`;
      if (val > 0) {
        positives.push(formatted);
      } else if (val < 0) {
        negatives.push(formatted);
      }
    }
  }

    const characteristics: Record<string, number> = {};
    for (const key of displayedBonus) {
        characteristics[key] = (passive[key as keyof PassiveType] || 0) as number;
    }

  return {
    Name: passive.Name,
    Id: passive.id,
    LevelRequired: passive.LevelRequired,
    ParentPassive: passive.ParentPassive,

    Characteristics: characteristics,

    positiveBonus: positives.join(', '),
    negativeBonus: negatives.join(', '),
  }

};

export default transformPassiveToDic;
