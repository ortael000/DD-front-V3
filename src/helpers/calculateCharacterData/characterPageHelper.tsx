import { CharacterFulltype, CharacterBasetype, EquipmentType, WeaponBaseType, PassiveType, SkillBaseType, EquipmentDisplayed, PassiveDisplayed } from "../../types/character";
import {Characteristic, BonusKey, WeaponCategory, Element} from "../../types/stringLists";

import { fetchCharacter, fetchEquipment, fetchPassive, fetchWeapon, fetchSkill } from "../APIHelpers";

export async function calculateFullCharacter(base: CharacterBasetype): Promise<CharacterFulltype | any> { 

    console.log("Calculating full character for base:", base);

    const allEquipments: EquipmentType[] = []
    allEquipments.push(await fetchEquipment(base.equipmentArmorID));
    allEquipments.push(await fetchEquipment(base.equipmentBootsID));
    allEquipments.push(await fetchEquipment(base.equipmentBeltID));
    allEquipments.push(await fetchEquipment(base.equipmentGauntletID));
    allEquipments.push(await fetchEquipment(base.equipmentHelmetID));
    allEquipments.push(await fetchEquipment(base.equipmentPantsID));
    allEquipments.push(await fetchEquipment(base.equipmentRing1ID));
    allEquipments.push(await fetchEquipment(base.equipmentRing2ID));
    allEquipments.push(await fetchEquipment(base.equipmentNecklaceID));
    allEquipments.push(await fetchEquipment(base.equipmentShieldID));

    //console.log("Fetched all equipments:", allEquipments);

    const allWeapons : WeaponBaseType[] = []
    allWeapons.push(await fetchWeapon(base.Weapon1ID));
    allWeapons.push(await fetchWeapon(base.Weapon2ID));
    allWeapons.push(await fetchWeapon(base.Weapon3ID));

    const allPassive : PassiveType[] = []
    allPassive.push(await fetchPassive(base.passive1ID));
    allPassive.push(await fetchPassive(base.passive2ID));
    allPassive.push(await fetchPassive(base.passive3ID));
    allPassive.push(await fetchPassive(base.passive4ID));

    //console.log("Fetched all passive skills:", allPassive);

    const allSkills : SkillBaseType[] = []
    allSkills.push(await fetchSkill(base.skill1ID)); 
    allSkills.push(await fetchSkill(base.skill2ID));
    allSkills.push(await fetchSkill(base.skill3ID));
    allSkills.push(await fetchSkill(base.skill4ID));
    allSkills.push(await fetchSkill(base.skill5ID));
    allSkills.push(await fetchSkill(base.skill6ID));



    const fullCharacteristics : CharacterFulltype['Characteristics']= {
            Strength: calculateCharacteristicBonus('Strength', base.Strength, allEquipments, allWeapons, allPassive),
            Intelligence: calculateCharacteristicBonus('Intelligence', base.Intelligence, allEquipments, allWeapons, allPassive),
            Constitution: calculateCharacteristicBonus('Constitution', base.Constitution, allEquipments, allWeapons, allPassive),
            Charisma: calculateCharacteristicBonus('Charisma', base.Charisma, allEquipments, allWeapons, allPassive),
            Dexterity: calculateCharacteristicBonus('Dexterity', base.Dexterity, allEquipments , allWeapons, allPassive),
            Agility: calculateCharacteristicBonus('Agility', base.Agility, allEquipments, allWeapons, allPassive),
            Perception: calculateCharacteristicBonus('Perception', base.Perception, allEquipments, allWeapons, allPassive),
            Power: calculateCharacteristicBonus('Power', base.Power, allEquipments, allWeapons, allPassive),
    }

    console.log("Calculated all characteristics:", fullCharacteristics);



    const fullCharacter : CharacterFulltype  = {
        General: {
            Id: base.id,
            Name: base.Name,
            XpPoint: base.XpPoint,
            Level: findCharacterLevel(base.XpPoint).level,
            XpToNextLevel: findCharacterLevel(base.XpPoint).xpNeeded,
            HitPoint: 10 + calculateFlatBonus('HitPoint', base.Stealth, allEquipments, allWeapons, allPassive),
            Mana: calculateFlatBonus('Mana', base.Medecine, allEquipments, allWeapons, allPassive),
            CurrentHPLose: base.currentHPLose,
            CurrentManaLose: base.currentManaLose,
            CurrentMoney: base.currentMoney
        },

        Defenses: {
          DefenseRange: 20 + calculateFlatBonus('DefenseRange', 0, allEquipments, allWeapons, allPassive) + Math.floor(fullCharacteristics.Agility.Modifier/2 + fullCharacteristics.Perception.Modifier/2),
          DefenseMelee: 20 + calculateFlatBonus('DefenseMelee', 0, allEquipments, allWeapons, allPassive)+ Math.floor(fullCharacteristics.Dexterity.Modifier/2 + fullCharacteristics.Perception.Modifier/2),
          ResPhysical: calculateFlatBonus('ResPhysical', 0, allEquipments, allWeapons, allPassive),
          ResChi: calculateFlatBonus('ResChi', 0, allEquipments, allWeapons, allPassive),
          ResFire: calculateFlatBonus('ResFire', 0, allEquipments, allWeapons, allPassive),
          ResLightning: calculateFlatBonus('ResLightning', 0, allEquipments, allWeapons, allPassive),
          ResMental: calculateFlatBonus('ResMental', 0, allEquipments, allWeapons, allPassive),
          ResIce: calculateFlatBonus('ResIce', 0, allEquipments, allWeapons, allPassive),
        },

        Characteristics: fullCharacteristics,

        Knowledge: {
            Stealth: calculateFlatBonus('Stealth', base.Stealth, allEquipments, allWeapons, allPassive),
            Medecine: calculateFlatBonus('Medecine', base.Medecine, allEquipments, allWeapons, allPassive),
            Forge: calculateFlatBonus('Forge', base.Forge, allEquipments, allWeapons, allPassive),
            Magic: calculateFlatBonus('Magic', base.Magic, allEquipments, allWeapons, allPassive),
            Demonic: calculateFlatBonus('Demonic', base.Demonic, allEquipments, allWeapons, allPassive),
            Cooking: calculateFlatBonus('Cooking', base.Cooking, allEquipments, allWeapons , allPassive),
            Nature: calculateFlatBonus('Nature', base.Nature, allEquipments, allWeapons, allPassive),
        }, 
        Weapon1: calculateWeaponFull(allWeapons[0], fullCharacteristics, allEquipments, allPassive),
        Weapon2: calculateWeaponFull(allWeapons[1], fullCharacteristics, allEquipments, allPassive),
        Weapon3: calculateWeaponFull(allWeapons[2], fullCharacteristics, allEquipments, allPassive),

        Skill1: calculateSkillFull(allSkills[0], fullCharacteristics, allEquipments, allPassive),
        Skill2: calculateSkillFull(allSkills[1], fullCharacteristics, allEquipments, allPassive),
        Skill3: calculateSkillFull(allSkills[2], fullCharacteristics, allEquipments, allPassive),
        Skill4: calculateSkillFull(allSkills[3], fullCharacteristics, allEquipments, allPassive),
        Skill5: calculateSkillFull(allSkills[4], fullCharacteristics, allEquipments, allPassive),
        Skill6: calculateSkillFull(allSkills[5], fullCharacteristics, allEquipments, allPassive),

        Equipment: {
            Helmet: transformEquipment(allEquipments[0]),
            Armor: transformEquipment(allEquipments[1]),
            Pants: transformEquipment(allEquipments[2]),
            Belt: transformEquipment(allEquipments[3]),
            Gauntlet: transformEquipment(allEquipments[4]),
            Boots: transformEquipment(allEquipments[5]),
            Ring1: transformEquipment(allEquipments[6]),
            Ring2: transformEquipment(allEquipments[7]),
            Necklace: transformEquipment(allEquipments[8]),
            Shield: transformEquipment(allEquipments[9]),
        },

        Passive : {
            passive1: allPassive[0],
            passive2: allPassive[1],
            passive3: allPassive[2],
            passive4: allPassive[3],
        }       
    }

    return fullCharacter

}

function calculateCharacteristicBonus (charac : Characteristic, basecharacter: number, equipments : EquipmentType[], weapons: WeaponBaseType[], passives: PassiveType[]) {

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
      Temporary: 0,
      Total: basecharacter + equipmentBonus + passiveBonus,
      Modifier: Math.floor((basecharacter + equipmentBonus + passiveBonus - 10) / 2)
      };
} 

function calculateFlatBonus (bonusKey :BonusKey, basecharacter: number, equipments : EquipmentType[], weapons: WeaponBaseType[], passives: PassiveType[]) : number {

    let equipmentBonus = 0;
    let passiveBonus = 0;

    equipments.forEach(equipment => {
        if (equipment[bonusKey] !== undefined) {
            equipmentBonus += equipment[bonusKey];
        }
    });

    passives.forEach(passiveSkill => {
        if (passiveSkill[bonusKey] !== undefined) {
            passiveBonus += passiveSkill[bonusKey];
        }
    });

    return (basecharacter + equipmentBonus + passiveBonus)
}

function calculateWeaponFull(weapon: WeaponBaseType, fullCharacteristics: CharacterFulltype['Characteristics'], equipments : EquipmentType[], passives: PassiveType[]) : CharacterFulltype['Weapon1'] {

    const weaponBonus = findWeaponBonus(weapon.Type, equipments, passives);

    let minDam = weapon.BaseMinDam + (fullCharacteristics[weapon.StatDam1].Modifier + fullCharacteristics[weapon.StatDam2].Modifier + weaponBonus.DamBonus)*weapon.MinDamRatio/2;
    let maxDam = weapon.BaseMaxDam + (fullCharacteristics[weapon.StatDam1].Modifier + fullCharacteristics[weapon.StatDam2].Modifier + weaponBonus.DamBonus)*weapon.MaxDamRatio/2;
    
    let precision = weapon.BasePrecision + (fullCharacteristics[weapon.StatPrecision1].Modifier + fullCharacteristics[weapon.StatPrecision2].Modifier)*weapon.PrecisionRatio/2 + weaponBonus.PrecisionBonus;

    const weaponFull : CharacterFulltype['Weapon1']= {
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
    return weaponFull
}

function calculateSkillFull(skill: SkillBaseType, fullCharacteristics: CharacterFulltype['Characteristics'], equipments : EquipmentType[], passives: PassiveType[]) : CharacterFulltype['Skill1'] {

    const elementBonus = findElementBonus(skill.Element, equipments, passives);

  
    let minDam = skill.BaseMinDam + (fullCharacteristics[skill.StatDam1].Modifier + fullCharacteristics[skill.StatDam2].Modifier + elementBonus)*skill.MinDamRatio/2;
    let maxDam = skill.BaseMaxDam + (fullCharacteristics[skill.StatDam1].Modifier + fullCharacteristics[skill.StatDam2].Modifier + elementBonus)*skill.MaxDamRatio/2;

    let precision = skill.BasePrecision + (fullCharacteristics[skill.StatPrecision1].Modifier + fullCharacteristics[skill.StatPrecision2].Modifier)*skill.PrecisionRatio/2;
    
    const skillFull : CharacterFulltype['Skill1']= {

        name: skill.Name,
        type: skill.Type,
        element: skill.Element,
        manaCost: Math.floor ((skill.ManaCost + fullCharacteristics[skill.StatDam1].Modifier + fullCharacteristics[skill.StatDam2].Modifier)/2),
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

function transformEquipment(equipment: EquipmentType): EquipmentDisplayed {
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
    Name: equipment.Name,

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
    // skip non-numbers and the Name / OtherEffect
    if (typeof rawVal !== 'number') continue;
    // skip the stats we've already grouped
    if (key === 'id' ) continue;
    if (key === 'LevelRequiered') continue;
    if (
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
    Name: passive.Name,

    Characteristics: characteristics,

    positiveBonus: positives.join(', '),
    negativeBonus: negatives.join(', '),
  }

}