
export type Characteristic =
  | 'Strength'
  | 'Intelligence'
  | 'Constitution'
  | 'Charisma'
  | 'Dexterity'
  | 'Agility'
  | 'Perception'
  | 'Power';

export type BonusKey =
  | 'DefenseRange'
  | 'DefenseMelee'
  | 'ResPhysical'
  | 'ResChi'
  | 'DamChi'
  | 'ResFire'
  | 'DamFire'
  | 'ResLightning'
  | 'DamLightning'
  | 'ResMental'
  | 'DamMental'
  | 'ResIce'
  | 'DamIce'
  | 'WeaponDamageBonus'
  | 'WeaponPrecisionBonus'
  | 'PrecisionRange'
  | 'PrecisionMelee'
  | 'HitPoint'
  | 'Mana'
  | 'Movement'
  | 'Initiative'
  | 'Nature'
  | 'Magic'
  | 'Demonic'
  | 'Medecine'
  | 'Cooking'
  | 'Forge'
  | 'Stealth';


export type WeaponHand = 'OneHand' | 'TwoHands';

export type WeaponCategory =
  | 'None'
  | 'Fist'
  | 'Sword'
  | 'Axe'
  | 'Spear'
  | 'Bow'
  | 'Staff'
  | 'Dagger'
  | 'Hammer'
  | 'Crossbow'
  | 'Firearm'
  | 'Mace'
  | 'Throwing';

export type Element =
  | 'Physical'
  | 'Fire'
  | 'Lightning'
  | 'Chi'
  | 'Mental'
  | 'Ice'

export type dataBaseCall =
  | 'character'
  | 'weapon'
  | 'equipment'
  | 'passive'
  | 'skill'
  | 'inventory'
  
  export type equipmentType = 
  | 'Armor'
  | 'Boots'
  | 'Belt'
  | 'Gauntlet'
  | 'Helmet'
  | 'Pants'
  | 'Ring'
  | 'Necklace'
  | 'Shield'