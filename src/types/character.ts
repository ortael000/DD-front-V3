import {Characteristic,equipmentType, BonusKey, WeaponHand, WeaponCategory, Element} from "./stringLists";


export interface EquipmentType {
  
  id: number;
  type: equipmentType;

  // Characteristics
  Strength: number;
  Intelligence: number;
  Constitution: number;
  Charisma: number;
  Dexterity: number;
  Agility: number;
  Perception: number;
  Power: number;

  // Defensive stats
  DefenseRange: number;
  DefenseMelee: number;
  ResPhysical: number;
  ResChi: number;
  ResFire: number;
  ResLightning: number;
  ResMental: number;
  ResIce: number;

  // Offensive stats
  DamChi: number;
  DamFire: number;
  DamIce : number;
  DamLightning: number;
  DamMental: number;


  // Weapon bonuses
  WeaponType: string;
  WeaponDamageBonus: number;
  WeaponPrecisionBonus: number;

  // Precision
  PrecisionRange: number;
  PrecisionMelee: number;

  // Vital stats
  HitPoint: number;
  Mana: number;
  Movement: number;
  Initiative: number;

  // Knowledge bonuses
  Nature: number;
  Magic: number;
  Demonic: number;
  Medecine: number;
  Cooking: number;
  Forge: number;
  Stealth: number;

  // Miscellaneous
  OtherEffect: string;
  Name: string;
}

export interface WeaponBaseType {
  id: number;
  Name: string;
  Type: string;         
  Subtype: WeaponCategory;
  Element : string;    
  Hand: WeaponHand;
  Value: number;

  // Base stats
  BaseMinDam: number;
  BaseMaxDam: number;
  BasePrecision: number;

  // Scaling ratios
  PrecisionRatio: number;
  MinDamRatio: number;
  MaxDamRatio: number;

  // Stat-based scaling
  StatDam1: Characteristic;
  StatDam2: Characteristic;
  StatPrecision1: Characteristic;
  StatPrecision2: Characteristic;

  // Critical hit
  CriticScore: number;

  // Miscellaneous
  OtherEffects: string;
}

export interface SkillBaseType {
  id: number;
  Name: string;
  Type: string;         
  Element : Element;    
  ManaCost: number;
  ManaCostRatio: number;

  // Base stats
  BaseMinDam: number;
  BaseMaxDam: number;
  BasePrecision: number;

  // Scaling ratios
  PrecisionRatio: number;
  MinDamRatio: number;
  MaxDamRatio: number;

  // Stat-based scaling
  StatDam1: Characteristic;
  StatDam2: Characteristic;
  StatPrecision1: Characteristic;
  StatPrecision2: Characteristic;

  // Critical hit
  CriticScore: number;

  // Miscellaneous
  OtherEffects: string;
}

export interface PassiveType {
  id: number;
  Name: string;
  LevelRequiered: number;
  Restriction: string;

  // Characteristics
  Strength: number;
  Intelligence: number;
  Constitution: number;
  Charisma: number;
  Dexterity: number;
  Agility: number;
  Perception: number;
  Power: number;

  // Defensive stats
  DefenseRange: number;
  DefenseMelee: number;
  ResPhysical: number;
  ResChi: number;
  ResFire: number;
  ResLightning: number;
  ResMental: number;
  ResIce: number;

  // Offensive stats
  DamChi: number;
  DamFire: number;
  DamLightning: number;
  DamMental: number;
  DamIce: number;

  // Weapon bonuses
  WeaponType: WeaponCategory;
  WeaponDamageBonus: number;
  WeaponPrecisionBonus: number;

  // Precision
  PrecisionRange: number;
  PrecisionMelee: number;

  // Vital stats
  HitPoint: number;
  Mana: number;
  Movement: number;
  Initiative: number;

  // Knowledge bonuses
  Nature: number;
  Magic: number;
  Demonic: number;
  Medecine: number;
  Cooking: number;
  Forge: number;
  Stealth: number;

  // Miscellaneous
  OtherEffect: string;
  OtherEffectValue: number;
}

export interface CharacterBasetype {
  id: number;
  Name: string;
  XpPoint: number;

  Strength: number;
  Intelligence: number;
  Constitution: number;
  Charisma: number;
  Dexterity: number;
  Agility: number;
  Perception: number;
  Power: number;
  Stealth: number;
  Medecine: number;
  Forge: number;
  Magic: number;
  Demonic: number;
  Cooking: number;
  Nature: number;

  Weapon1ID: number;
  Weapon2ID: number;
  Weapon3ID: number;

  equipmentHelmetID: number;
  equipmentArmorID: number;
  equipmentPantsID: number;
  equipmentBeltID: number;
  equipmentGauntletID: number;
  equipmentBootsID: number;
  equipmentRing1ID: number;
  equipmentRing2ID: number;
  equipmentNecklaceID: number;
  equipmentShieldID: number;

  skill1ID: number;
  skill2ID: number;
  skill3ID: number;
  skill4ID: number;
  skill5ID: number;
  skill6ID: number;

  passive1ID: number;
  passive2ID: number;
  passive3ID: number;
  passive4ID: number;

currentHPLose: number;
currentManaLose: number;
currentMoney: number;
}

export interface CharacterFulltype {
  
  General: {
  Id: number;
  Name: string;
  XpPoint: number;
  Level: number;
  XpToNextLevel: number;
  HitPoint: number;
  Mana: number;
  CurrentHPLose: number;
  CurrentManaLose: number;
  CurrentMoney: number;
  }

  Defenses: {
    DefenseRange: number;
    DefenseMelee: number;
    ResPhysical: number;
    ResChi: number;
    ResFire: number;
    ResLightning: number;
    ResMental: number;
    ResIce: number;
  }

  Characteristics: {
    Strength: {
      Base: number;
      Equipment: number; 
      Passive: number;
      Temporary: number;
      Total: number;
      Modifier: number;
      };
    Intelligence: {
      Base: number;
      Equipment: number; 
      Passive: number;
      Temporary: number;
      Total: number;
      Modifier: number;
    };
    Constitution: {
      Base: number;
      Equipment: number; 
      Passive: number;
      Temporary: number;
      Total: number;
      Modifier: number;
    };
    Charisma: {
      Base: number;
      Equipment: number; 
      Passive: number;
      Temporary: number;
      Total: number;
      Modifier: number;
    };
    Dexterity: {
      Base: number;
      Equipment: number; 
      Passive: number;
      Temporary: number;
      Total: number;
      Modifier: number;
    };
    Agility: {
      Base: number;
      Equipment: number; 
      Passive: number;
      Temporary: number;
      Total: number;
      Modifier: number;
    };
    Perception: {
      Base: number;
      Equipment: number; 
      Passive: number;
      Temporary: number;
      Total: number;
      Modifier: number;
    };
    Power: {
      Base: number;
      Equipment: number; 
      Passive: number;
      Temporary: number;
      Total: number;
      Modifier: number;
    };
  };

  Knowledge: {
    Stealth: number;
    Medecine: number;
    Forge: number;
    Magic: number;
    Demonic: number;
    Cooking: number;
    Nature: number;
  };

  Weapon1: {
    Name: string;
    type: string;
    subtype: string;
    element: string;
    minDamage: number;
    maxDamage: number;
    precision: number;
    critical: number;
    OtherEffects: string;
  };

  Weapon2: {
    Name: string;
    type: string;
    subtype: string;
    element: string;
    minDamage: number;
    maxDamage: number;
    precision: number;
    critical: number;
    OtherEffects: string;
  };

  Weapon3: {
    Name: string;
    type: string;
    subtype: string;
    element: string;
    minDamage: number;
    maxDamage: number;
    precision: number;
    critical: number;
    OtherEffects: string;
  };

  Equipment: {
    Helmet: EquipmentDisplayed,
    Armor: EquipmentDisplayed, 
    Pants: EquipmentDisplayed,
    Belt: EquipmentDisplayed,
    Gauntlet: EquipmentDisplayed,
    Boots: EquipmentDisplayed,
    Ring1: EquipmentDisplayed,
    Ring2: EquipmentDisplayed,
    Necklace: EquipmentDisplayed,
    Shield: EquipmentDisplayed
  };

  Skill1: {
    name: string;
    type: string;
    element: Element;
    manaCost: number;
    minDamage: number;
    maxDamage: number;
    precision: number;
    critical: number;
    additionalEffect: string;
  };

  Skill2: {
    name: string;
    type: string;
    element: Element;
    manaCost: number;
    minDamage: number;
    maxDamage: number;
    precision: number;
    critical: number;
    additionalEffect: string;
  };

  Skill3: {
    name: string;
    type: string;
    element: Element;
    manaCost: number;
    minDamage: number;
    maxDamage: number;
    precision: number;
    critical: number;
    additionalEffect: string;
  };

  Skill4: {
    name: string;
    type: string;
    element: Element;
    manaCost: number;
    minDamage: number;
    maxDamage: number;
    precision: number;
    critical: number;
    additionalEffect: string;
  };

  Skill5: {
    name: string;
    type: string;
    element: Element;
    manaCost: number;
    minDamage: number;
    maxDamage: number;
    precision: number;
    critical: number;
    additionalEffect: string;
  };

  Skill6: {
    name: string;
    type: string;
    element: Element;
    manaCost: number;
    minDamage: number;
    maxDamage: number;
    precision: number;
    critical: number;
    additionalEffect: string;
  };

  Passive: {
    passive1: PassiveType;
    passive2: PassiveType;
    passive3: PassiveType;
    passive4: PassiveType;
}
}

export interface EquipmentDisplayed {
  ID: number;
  Name: string;

  DefensiveStats : {
    DefenseRange: number;
    DefenseMelee: number;
    ResPhysical: number;
  }

  Characteristics: {
    Strength: number;
    Intelligence: number;
    Constitution: number;
    Charisma: number;
    Dexterity: number;
    Agility: number;
    Perception: number;
    Power: number;
  }

  positiveBonus : string;  // all the other positive bonus provided by the equipment
  negativeBonus : string;  // all the other negative bonus provided by the equipment

}

export interface PassiveDisplayed {
  Name: string;

  Characteristics: {
    Strength: number;
    Intelligence: number;
    Constitution: number;
    Charisma: number;
    Dexterity: number;
    Agility: number;
    Perception: number;
    Power: number;
  }

  positiveBonus : string;  // all the other positive bonus provided by the equipment
  negativeBonus : string;  // all the other negative bonus provided by the equipment

}

export interface InventoryItem {
  CharacterID: number;
  ObjectType: "weapon" | "equipment" | "accesory";
  ObjectID: number;
  Name: string ;
  Quantity: number;
}