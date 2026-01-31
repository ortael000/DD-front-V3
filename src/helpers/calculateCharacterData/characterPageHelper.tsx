import { CharacterFulltype, CharacterBasetype, EquipmentType, WeaponBaseType, PassiveType, SkillBaseType, EquipmentDisplayed, PassiveDisplayed, SkillDisplayed } from "../../types/character";
import {Characteristic, BonusKey, WeaponCategory, Element} from "../../types/stringLists";

import { fetchPassive, fetchItem, fetchSkill } from "../dataBase&API/APIHelpers";
import { updateCharacterDB } from "../dataBase&API/characterAPI";

function calculateCharacteristicBonus (charac : Characteristic, basecharacter: number, temporary: number, equipments : EquipmentType[], weapons: WeaponBaseType[], passives: PassiveType[]) {

    let equipmentBonus = 0;
    let passiveBonus = 0;

    equipments.forEach(equipment => {
        if (equipment[charac] !== undefined) {
            equipmentBonus += equipment[charac];
        }
    });


    passives.forEach(passiveSkill => {
        if (passiveSkill[charac] !== undefined) {
            passiveBonus += passiveSkill[charac];
        }
    });

    return {
      Base: basecharacter,
      Equipment: equipmentBonus,
      Passive: passiveBonus,
      Temporary: temporary,
      Total: basecharacter + equipmentBonus + passiveBonus + temporary,
      Modifier: Math.floor((basecharacter + equipmentBonus + passiveBonus + temporary - 10) / 2)
      };
} 

function calculateFlatBonus (bonusKey :BonusKey, basecharacter: number, equipments : EquipmentType[], weapons: WeaponBaseType[], passives: PassiveType[]) : number {

    let equipmentBonus = 0;
    let passiveBonus = 0;

    equipments.forEach(equipment => {

        if (bonusKey !== "None" && equipment[bonusKey] !== undefined) {
            equipmentBonus += equipment[bonusKey];
        }
    });

    passives.forEach(passiveSkill => {
        if (bonusKey !== "None" && passiveSkill[bonusKey] !== undefined) {
            passiveBonus += passiveSkill[bonusKey];
        }
    });

    if (bonusKey === 'Martial') {
        console.log("Calculating Martial bonus:", "Base:", basecharacter, "EquipmentBonus:", equipmentBonus, "PassiveBonus:", passiveBonus);
    }

    return (basecharacter + equipmentBonus + passiveBonus)
}

function calculateWeaponFull(weapons: WeaponBaseType[], fullCharacteristics: CharacterFulltype['Characteristics'], equipments : EquipmentType[], passives: PassiveType[]) : CharacterFulltype['Weapon1'][] {
  
    let weaponsFull: CharacterFulltype['Weapon1'][] = [];

    for (let i = 0; i < weapons.length; i++) {
    const weapon = weapons[i];
    const weaponBonus = findWeaponBonus(weapon.Type, equipments, passives);

    let minDam = weapon.BaseMinDam + (fullCharacteristics[weapon.StatDam1].Modifier + fullCharacteristics[weapon.StatDam2].Modifier + weaponBonus.DamBonus)*weapon.MinDamRatio/2;
    let maxDam = weapon.BaseMaxDam + (fullCharacteristics[weapon.StatDam1].Modifier + fullCharacteristics[weapon.StatDam2].Modifier + weaponBonus.DamBonus)*weapon.MaxDamRatio/2;
    
    let precision = weapon.BasePrecision + (fullCharacteristics[weapon.StatPrecision1].Modifier + fullCharacteristics[weapon.StatPrecision2].Modifier)*weapon.PrecisionRatio/2 + weaponBonus.PrecisionBonus;

    if (i === 0 && weapons[1].id !== 1 && weapons[0].id !== 1) {
      precision -= 4;
    }

    if (i === 1 && weapons[0].id !== 1 && weapons[1].id !== 1) {
      precision -= 4;
    }

    const weaponFull : CharacterFulltype['Weapon1']= {
        id: weapon.id,
        Name: weapon.Name,
        type: weapon.Type,
        subtype: weapon.Subtype,
        element: weapon.Element,
        minDamage: Math.floor(minDam),
        maxDamage: Math.floor(maxDam),
        precision: Math.floor(precision),
        critical: weapon.CriticScore,
        OtherEffects: weapon.OtherEffects,
    }
    weaponsFull.push(weaponFull);
  }
    return weaponsFull
}

function calculateSkillFull(skill: SkillBaseType, fullCharacteristics: CharacterFulltype['Characteristics'], equipments : EquipmentType[], passives: PassiveType[]) : CharacterFulltype['Skill1'] {

    const elementBonus = findElementBonus(skill.Element, equipments, passives);

    let minDam = skill.BaseMinDam + (fullCharacteristics[skill.StatDam1].Modifier + fullCharacteristics[skill.StatDam2].Modifier + elementBonus)*skill.MinDamRatio/2;
    let maxDam = skill.BaseMaxDam + (fullCharacteristics[skill.StatDam1].Modifier + fullCharacteristics[skill.StatDam2].Modifier + elementBonus)*skill.MaxDamRatio/2;

    let precision = skill.BasePrecision + (fullCharacteristics[skill.StatPrecision1].Modifier + fullCharacteristics[skill.StatPrecision2].Modifier)*skill.PrecisionRatio/2;


     const manacostTest = (skill.ManaCost + (fullCharacteristics[skill.StatDam1].Modifier + fullCharacteristics[skill.StatDam2].Modifier)*skill.ManaCostRatio)/2;


    const skillFull : SkillDisplayed= {

        name: skill.Name,
        type: skill.Type,
        Id: skill.id,
        skillLevel: skill.SkillLevel,
        element: skill.Element,
        manaCost: Math.floor (skill.ManaCost+(fullCharacteristics[skill.StatDam1].Modifier + fullCharacteristics[skill.StatDam2].Modifier)*skill.ManaCostRatio/2),
        minDamage: Math.floor(minDam),
        maxDamage: Math.floor(maxDam),
        precision: Math.floor(precision),
        critical: skill.CriticScore,
        additionalEffect: skill.OtherEffects,
    }

    return skillFull
}

function findWeaponBonus (weaponCategory : any, equipments : EquipmentType[], passives: PassiveType[]) : { DamBonus: number, PrecisionBonus: number } {

    let damBonus = 0;
    let precisionBonus = 0;

    equipments.forEach(equipment => {
        if (equipment.WeaponType == weaponCategory) {
            damBonus += equipment.WeaponDamageBonus;
            precisionBonus += equipment.WeaponPrecisionBonus;
        }
    });

    passives.forEach(passiveSkill => {
        if (passiveSkill.WeaponType == weaponCategory) {
            damBonus += passiveSkill.WeaponDamageBonus;
            precisionBonus += passiveSkill.WeaponPrecisionBonus;
        }
    });

    return {
        DamBonus: damBonus,
        PrecisionBonus: precisionBonus
        }
}

function findElementBonus (element: Element, equipments : EquipmentType[], passives: PassiveType[]) : number {
    
    let damBonus = 0;
    const key = `Dam${element}` as keyof EquipmentType;
    const key2 = `Dam${element}` as keyof PassiveType;

    equipments.forEach(equipment => {
        if (equipment[key] !== undefined && typeof equipment[key] === "number") {
            const bonus = equipment[key];
            if (typeof bonus === "number"){
                damBonus += bonus;
            }
        }
    }); 

    passives.forEach(passiveSkill => {
        if (passiveSkill[key2] !== undefined && typeof passiveSkill[key2] === "number") {
            const bonus = passiveSkill[key2];
            if (typeof bonus === "number"){
                damBonus += bonus;
            }
        }
    }); 

    return damBonus
}

function findCharacterLevel (xpPoint: number): {level: number, xpNeeded: number} {
    let totalxpNeeded = 350;
    let level = 1;

    while (totalxpNeeded < xpPoint) {

    const nextLevelXp = 300*level + 100*(level**2);

    totalxpNeeded += nextLevelXp;
    level++;
    }

    return {
        level: level,
        xpNeeded: totalxpNeeded - xpPoint
    }
}  

export function transformEquipment(equipment: EquipmentType): EquipmentDisplayed {
  // 1. Extract the two groups of stats
  const defensiveStats = {
    DefenseRange: equipment.DefenseRange,
    DefenseMelee: equipment.DefenseMelee,
    ResPhysical: equipment.ResPhysical,
  };

  const characteristics = {
    Strength: equipment.Strength,
    Intelligence: equipment.Intelligence,
    Constitution: equipment.Constitution,
    Charisma: equipment.Charisma,
    Dexterity: equipment.Dexterity,
    Agility: equipment.Agility,
    Perception: equipment.Perception,
    Power: equipment.Power,
  };

  // 2. Collect all numeric bonuses outside the two main groups
  const defensiveKeys = new Set<keyof typeof defensiveStats>([
    'DefenseRange',
    'DefenseMelee',
    'ResPhysical',
  ]);

  const characteristicKeys = new Set<keyof typeof characteristics>([
    'Strength',
    'Intelligence',
    'Constitution',
    'Charisma',
    'Dexterity',
    'Agility',
    'Perception',
    'Power',
  ]);

  const positives: string[] = [];
  const negatives: string[] = [];

  for (const [key, rawVal] of Object.entries(equipment)) {
    // skip non-numbers and the Name / OtherEffect
    if (typeof rawVal !== 'number') continue;
    // skip the stats we've already grouped
    if (key === 'id') continue;
    if (key === 'Value') continue;
    if (
      defensiveKeys.has(key as any) ||
      characteristicKeys.has(key as any)
    ) {
      continue;
    }

    // we have a “bonus” field
    const val = rawVal as number;
    const formatted = `${key}: ${val >= 0 ? '+' + val : val}`;

    if (val > 0) {
      positives.push(formatted);
    } else if (val < 0) {
      negatives.push(formatted);
    }
    // zero would be omitted
  }

  return {
    ID : equipment.id,
    Subtype: equipment.Subtype,
    Name: equipment.Name,
    Value: equipment.Value,

    DefensiveStats: defensiveStats,
    Characteristics: characteristics,

    positiveBonus: positives.join(', '),
    negativeBonus: negatives.join(', '),
  }
}

export function transformPassive(passive: PassiveType): PassiveDisplayed {

  const characteristics = {
    Strength: passive.Strength,
    Intelligence: passive.Intelligence,
    Constitution: passive.Constitution,
    Charisma: passive.Charisma,
    Dexterity: passive.Dexterity,
    Agility: passive.Agility,
    Perception: passive.Perception,
    Power: passive.Power,
  };

  const characteristicKeys = new Set<keyof typeof characteristics>([
    'Strength',
    'Intelligence',
    'Constitution',
    'Charisma',
    'Dexterity',
    'Agility',
    'Perception',
    'Power',
  ]);

  const positives: string[] = [];
  const negatives: string[] = [];

  for (const [key, rawVal] of Object.entries(passive)) {

    let toBePutInText = true
    // skip non-numbers and the Name / OtherEffect
    // if (typeof rawVal !== 'number') toBePutInText = false;
    // skip the stats we've already grouped
    if (key === 'id' ) toBePutInText = false;
    if (key === 'LevelRequired') toBePutInText = false;
    if (key === 'OtherEffect') toBePutInText = false;
    if (key === 'ParentPassive') toBePutInText = false;
    if (key === 'PassiveLevel') toBePutInText = false;
    if (key === 'Value') toBePutInText = false;
    if (characteristicKeys.has(key as any)) {
      toBePutInText = false;
    }

    // we have a “bonus” field
    const val = rawVal as number;
    const formatted = `${key}: ${val >= 0 ? '+' + val : val}`;

    if (toBePutInText) {
      if (val > 0) {
        positives.push(formatted);
      } else if (val < 0) {
        negatives.push(formatted);
      }
    }
    // zero would be omitted
  }

  return {
    Name: passive.Name,
    Id: passive.id,
    PassiveLevel: passive.PassiveLevel,

    Characteristics: characteristics,

    positiveBonus: positives.join(', '),
    negativeBonus: negatives.join(', '),
  }

}

function calculateMaxHP(base: CharacterBasetype, fullCharacteristics: CharacterFulltype['Characteristics'], equipments : EquipmentType[], weapons: WeaponBaseType[], passives: PassiveType[]): number {
  return (
    10 
    + fullCharacteristics.Constitution.Modifier * 4 
    + fullCharacteristics.Strength.Modifier 
    + findCharacterLevel(base.XpPoint).level * 2
    + calculateFlatBonus('HitPoint', 0, equipments, weapons, passives)
  );
}

function calculateMaxMana(base: CharacterBasetype, fullCharacteristics: CharacterFulltype['Characteristics'], equipments : EquipmentType[], weapons: WeaponBaseType[], passives: PassiveType[]): number {
  return (
    6
    + fullCharacteristics.Power.Modifier * 6 
    + fullCharacteristics.Intelligence.Modifier 
    + fullCharacteristics.Constitution.Modifier
    + findCharacterLevel(base.XpPoint).level * 2
    + calculateFlatBonus('Mana', 0, equipments, weapons, passives)
  );
}

export function buildNonZeroStatsString(obj: any): string {
  return Object.entries(obj)
    .filter(([, value]) => typeof value === "number" && value !== 0)
    .map(([key, value]) => `"${key}": ${value}`)
    .join(" / ");
}