// import icons
import ChiIcon from './elementsIcons/Chi.png'; // Import the Chi icon
import IceIcon from './elementsIcons/Ice.png'; // Import the Ice icon
import FireIcon from './elementsIcons/Fire.png'; // Import the Fire icon
import LightningIcon from './elementsIcons/Lightning.png'; // Import the Lightning icon
import PsychicIcon from './elementsIcons/Psychic.png'; // Import the Psychic icon
import PhysicalIcon from './elementsIcons/Physical.png'; // Import the Physical icon
import minDamIcon from './attackIcons/minDam.png'; // Import the minimum damage icon
import maxDamIcon from './attackIcons/maxDam.png'; // Import the maximum damage icon
import precisionIcon from './attackIcons/precision.png'; // Import the precision icon
import criticalIcon from './attackIcons/critical.png'; // Import the critical icon
import rangeIcon from './attackIcons/range.png'; // Import the other effect icon
import elementIcon from './attackIcons/elementWeel.png'; // Import the other effect icon
import manaIcone from './generalIcons/mana.png'; // Import the mana icon

import hitpointIcon  from './generalIcons/hitpoint.png'; // Import the icon to ensure it's included in the build
import copperCoin from './generalIcons/copperCoin.png'; // Import the copper coin icon
import silverCoin from './generalIcons/silverCoin.png'; // Import the silver coin icon
import goldCoin from './generalIcons/goldCoin.png'; // Import the gold coin icon
import initiative from './generalIcons/initiative.png'; // Import the initiative icon
import movement from './generalIcons/movement.png'; // Import the movement icon

import StrenghtIcone from './characteristicsIcons/Strength.png'; // Import the Strength icon
import IntelligenceIcone from './characteristicsIcons/Intelligence.png'; // Import the Intelligence icon
import ConstitutionIcone from './characteristicsIcons/Constitution.png'; // Import the Constitution icon
import CharismaIcone from './characteristicsIcons/Charisma.png'; // Import the Charisma
import DexterityIcone from './characteristicsIcons/Dexterity.png'; // Import the Dexterity icon
import AgilityIcone from './characteristicsIcons/Agility.png'; // Import the Agility icon
import PerceptionIcone from './characteristicsIcons/Perception.png'; // Import the Perception icon
import PowerIcone from './characteristicsIcons/Power.png'; // Import the Power icon

import DefenseMeleeIcon from './defenseIcons/DefenseMelee.png'; // Import the Defense Melee icon
import DefenseRangeIcon from './defenseIcons/DefenseRange.png'; // Import the Defense Range icon
import ResPhysicalIcon from './defenseIcons/ResPhysical.png'; // Import the Defense Range icon
import ResChiIcon from './defenseIcons/ResChi.png'; // Import the Defense Range icon
import ResFireIcon from './defenseIcons/ResFire.png'; // Import the Defense Range icon
import ResLightningIcon from './defenseIcons/ResLightning.png'; // Import the Defense Range icon
import  ResMentalIcon from './defenseIcons/ResMental.png'; // Import the Defense Range icon
import  ResIceIcon from './defenseIcons/ResIce.png'; // Import the Defense Range icon

export const ElementIcons = {
  Chi: ChiIcon,
  Ice: IceIcon,
  Fire: FireIcon,
  Lightning: LightningIcon,
  Mental: PsychicIcon,
  Physical: PhysicalIcon,
};

export const attackIcons = {
  minDamage: minDamIcon,
  maxDamage: maxDamIcon,
  precision: precisionIcon,
  critical: criticalIcon,
  range: rangeIcon,
};

export const skillIcons = {
  elementWheel: elementIcon,
  manaCost: manaIcone,
  minDamage: minDamIcon,
  maxDamage: maxDamIcon,
  precision: precisionIcon,
  critical: criticalIcon,
  range: rangeIcon,
}

export const generalIcons = {
    initiative : initiative,
    movement  : movement,
    hitPoint: hitpointIcon,
    mana : manaIcone,
    goldCoin : goldCoin,
    silverCoin: silverCoin,
    copperCoin: copperCoin
}

export const characteristicsIcons = {
  Strength: StrenghtIcone,
  Intelligence: IntelligenceIcone,
  Constitution: ConstitutionIcone,
  Charisma: CharismaIcone,
  Dexterity: DexterityIcone,
  Agility: AgilityIcone,
  Perception: PerceptionIcone,
  Power: PowerIcone,
  None: ""
}

export const defenseIcons = {
  DefenseMelee: DefenseMeleeIcon,
  DefenseRange: DefenseRangeIcon,
  ResPhysical: ResPhysicalIcon,
  ResChi: ResChiIcon,
  ResFire: ResFireIcon,
  ResLightning: ResLightningIcon,
  ResMental: ResMentalIcon,
  ResIce: ResIceIcon,
}