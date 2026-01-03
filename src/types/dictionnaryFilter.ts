import { CharacterFulltype, CharacterBasetype, PassiveType, EquipmentDisplayed, SkillDisplayed, PassiveDisplayed } from "../types/character";
import { equipmentType, Characteristic, BonusKey, Element, WeaponCategory } from "./stringLists";

type equipmentCharList = Characteristic | 'None'| 'DefenseRange' | 'DefenseMelee' | 'ResPhysical';
type elementFilter = Element | 'All';  

export interface EquipmentFilters {
  name: string;
  type: equipmentType;
  characteristic: equipmentCharList;
  bonusKey: BonusKey;
} 

export interface WeaponFilters {
  name: string;
  hand: 'OneHand' | 'TwoHands' | 'All';
  subType: WeaponCategory;
  element: elementFilter;
}
