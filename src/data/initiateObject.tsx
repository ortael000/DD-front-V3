import { CharacterFulltype, CharacterBasetype, PassiveType, EquipmentDisplayed } from "../types/character";

const emptyPassive : PassiveType = {
  id: 1,
  Name: "none",
  LevelRequiered: 1,
  Restriction: "none",

  // Characteristics
  Strength: 0,
  Intelligence: 0,
  Constitution: 0,
  Charisma: 0,
  Dexterity: 0,
  Agility: 0,
  Perception: 0,
  Power: 0,

  // Defensive stats
  DefenseRange: 0,
  DefenseMelee: 0,
  ResPhysical: 0,
  ResChi: 0,
  ResFire: 0,
  ResLightning: 0,
  ResMental: 0,
  ResIce: 0,

  // Offensive stats
  DamChi: 0,
  DamFire: 0,
  DamLightning: 0,
  DamMental: 0,
  DamIce : 0,

  // Weapon bonuses
  WeaponType: "None",
  WeaponDamageBonus: 0,
  WeaponPrecisionBonus: 0,

  // Precision
  PrecisionRange: 0,
  PrecisionMelee: 0,

  // Vital stats
  HitPoint: 0,
  Mana: 0,
  Movement: 0,
  Initiative: 0,

  // Knowledge bonuses
  Nature: 0,
  Magic: 0,
  Demonic: 0,
  Medecine: 0,
  Cooking: 0,
  Forge: 0,
  Stealth: 0,

  // Miscellaneous
  OtherEffect: "None",
  OtherEffectValue: 0,
  }

const emptySkill : CharacterFulltype['Skill1'] = { 
  name: 'none',
  type: 'Melee', 
  element: 'Physical', 
  manaCost : 0, 
  minDamage: 0, 
  maxDamage: 0, 
  precision: 0, 
  critical: 0,
  additionalEffect: ''}

const emptyEquipment : EquipmentDisplayed = {
      ID: 0,
      Name: "none",

    DefensiveStats : {
      DefenseRange: 0,
      DefenseMelee: 0,
      ResPhysical: 0
  },

    Characteristics: {
      Strength: 0,
      Intelligence: 0,
      Constitution: 0,
      Charisma: 0,
      Dexterity: 0,
      Agility: 0,
      Perception: 0,
      Power: 0,
    },

  positiveBonus : "none",  // all the other positive bonus provided by the equipment
  negativeBonus : "none",  // all the other negative bonus provided by the equipment

  }

export const initialCharacterFull: CharacterFulltype = {
  General: {
    Id: 1,
    Name: '',
    XpPoint: 0,
    Level: 1,
    XpToNextLevel: 0,
    HitPoint: 0,
    Mana: 0,
    CurrentHPLose: 0,
    CurrentManaLose: 0,
    CurrentMoney: 0,
  },

  Defenses: {
    DefenseRange: 0,
    DefenseMelee: 0,
    ResPhysical: 0,
    ResChi: 0,
    ResFire: 0,
    ResLightning: 0,
    ResMental: 0,
    ResIce: 0,
  },

  Characteristics: {
    Strength: {Base: 10, Equipment: 0, Passive: 0, Temporary: 0, Total: 10, Modifier: 0},
    Intelligence: {Base: 10, Equipment: 0, Passive: 0, Temporary: 0, Total: 10, Modifier: 0},
    Constitution: {Base: 10, Equipment: 0, Passive: 0, Temporary: 0, Total: 10, Modifier: 0},
    Charisma: {Base: 10, Equipment: 0, Passive: 0 , Temporary: 0, Total: 10, Modifier: 0},
    Dexterity: {Base: 10, Equipment: 0, Passive: 0, Temporary: 0, Total: 10, Modifier: 0},
    Agility: {Base: 10, Equipment: 0, Passive: 0, Temporary: 0, Total: 10, Modifier: 0},
    Perception: {Base: 10, Equipment: 0, Passive: 0, Temporary: 0, Total: 10, Modifier: 0},
    Power: {Base: 10, Equipment: 0, Passive: 0, Temporary: 0, Total: 10, Modifier: 0}, 
  },

  Knowledge: {
    Stealth: 0,
    Medecine: 0,
    Forge: 0,
    Magic: 0,
    Demonic: 0,
    Cooking: 0,
    Nature: 0,
  },

  Weapon1: { Name: "Fist", type: "Fist", subtype: "Melee", element: "Physical", minDamage: 1, maxDamage: 4, precision: 100, critical: 0, OtherEffects: "" }, 
  Weapon2: { Name: "Fist", type: "Fist", subtype: "Melee", element: "Physical", minDamage: 1, maxDamage: 4, precision: 100, critical: 0, OtherEffects: "" },
  Weapon3: { Name: "Fist", type: "Fist", subtype: "Melee", element: "Physical", minDamage: 1, maxDamage: 4, precision: 100, critical: 0, OtherEffects: "" },

  Equipment: {
    Helmet: emptyEquipment,
    Armor: emptyEquipment,
    Pants: emptyEquipment,
    Belt: emptyEquipment,
    Gauntlet: emptyEquipment,
    Boots: emptyEquipment,
    Ring1: emptyEquipment,
    Ring2: emptyEquipment,
    Necklace: emptyEquipment,
    Shield: emptyEquipment,
  },

  Skill1: emptySkill,
  Skill2: emptySkill,
  Skill3: emptySkill,
  Skill4: emptySkill,
  Skill5: emptySkill,
  Skill6: emptySkill,


  Passive: {
    passive1: emptyPassive,
    passive2: emptyPassive,
    passive3: emptyPassive,
    passive4: emptyPassive,
  },
};

export const initialCharacterBase: CharacterBasetype = {
  id: 0,
  Name: "select a character",
  XpPoint: 0,

  Strength: 10,
  Intelligence: 10,
  Constitution: 10,
  Charisma: 10,
  Dexterity: 10,
  Agility: 10,
  Perception: 10,
  Power: 10,
  Stealth: 0,
  Medecine: 0,
  Forge: 0,
  Magic: 0,
  Demonic: 0,
  Cooking: 0,
  Nature: 0,

  Weapon1ID: 1,
  Weapon2ID: 1,
  Weapon3ID: 1,

  equipmentHelmetID: 1,
  equipmentArmorID: 1,
  equipmentPantsID: 1,
  equipmentBeltID: 1,
  equipmentGauntletID: 1,
  equipmentBootsID: 1,
  equipmentRing1ID: 1,
  equipmentRing2ID: 1,
  equipmentNecklaceID: 1,
  equipmentShieldID: 1,

  skill1ID: 1,
  skill2ID: 1,
  skill3ID: 1,
  skill4ID: 1,
  skill5ID: 1,
  skill6ID: 1,

  passive1ID: 1,
  passive2ID: 1,
  passive3ID: 1,
  passive4ID: 1,

 currentHPLose: 0,
 currentManaLose: 0,
 currentMoney: 0
}