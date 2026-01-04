// import library dependencies
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

// import functions
import { fetchCharacter } from '../../../helpers/dataBase&API/characterAPI';

// import types
import { CharacterBasetype, CharacterFulltype, EquipmentDisplayed, InventoryItem } from '../../../types/character';

// import objects
import { initialCharacterBase, initialCharacterFull } from '../../../data/initiateObject';

// import component
import PopupEquipItemButton from './popups.tsx/equipmentPopup';

// import icons
import { ElementIcons, attackIcons, generalIcons, skillIcons, characteristicsIcons, defenseIcons } from '../../../assets/iconeList';
import { equipmentType } from '../../../types/stringLists';


interface Props {
  character: CharacterFulltype;
  updateCharacter: () => void;
  updateInventoryState: () => void;
  inventory: InventoryItem[];
}

export default function CharacterEquipment({ character, updateCharacter, updateInventoryState, inventory }: Props) {

  const equipments : { charKey: string; type: equipmentType; object: EquipmentDisplayed }[] = [
    {charKey : 'equipmentHelmetID', type: 'Helmet', object: character.Equipment.Helmet},
    {charKey : 'equipmentArmorID', type: 'Armor', object: character.Equipment.Armor},
    // {charKey : 'equipmentPantsID', type: 'Pants', object: character.Equipment.Pants},
    {charKey : 'equipmentBeltID', type: 'Belt', object: character.Equipment.Belt},
    {charKey : 'equipmentGauntletID', type: 'Gauntlet', object: character.Equipment.Gauntlet},
    {charKey : 'equipmentBootsID', type: 'Boots', object: character.Equipment.Boots},
    {charKey : 'equipmentRing1ID', type: 'Ring', object: character.Equipment.Ring1},
    {charKey : 'equipmentRing2ID', type: 'Ring', object: character.Equipment.Ring2},
    {charKey : 'equipmentNecklaceID', type: 'Necklace', object: character.Equipment.Necklace},
    {charKey : 'equipmentShieldID', type: 'Shield', object: character.Equipment.Shield},
  ];

  return (
    <div className="character-section">
      <h2 className="general-title">Equipments</h2>
      <div className='tableContainer'> 

        <table className="general-table sub-table">
          <thead>
            <tr>
              <th className="label-cell">Equip</th>
              <th className="label-cell">Type</th>
              <th className="label-cell">Name</th>
              <th className="value-cell"><img src={defenseIcons.DefenseMelee}  className="attack-icon" /></th>
              <th className="value-cell"><img src={defenseIcons.DefenseRange}  className="attack-icon" /></th>
              <th className="value-cell"><img src={defenseIcons.ResPhysical}  className="attack-icon" /></th>
              <th className="label-cell"> <img src={characteristicsIcons.Strength}  className="attack-icon" /></th>
              <th className="label-cell"> <img src={characteristicsIcons.Intelligence}  className="attack-icon" /></th>
              <th className="label-cell"> <img src={characteristicsIcons.Constitution}  className="attack-icon" /></th>
              <th className="label-cell"> <img src={characteristicsIcons.Charisma}  className="attack-icon" /></th>
              <th className="label-cell"> <img src={characteristicsIcons.Dexterity}  className="attack-icon" /></th>
              <th className="label-cell"> <img src={characteristicsIcons.Agility}  className="attack-icon" /></th>
              <th className="label-cell"> <img src={characteristicsIcons.Perception}  className="attack-icon" /></th>
              <th className="label-cell"> <img src={characteristicsIcons.Power}  className="attack-icon" /></th>
              <th className="label-cell">Bonus</th>
              <th className="value-cell">Malus</th>
            </tr>
          </thead>
          <tbody>
            {equipments.map((equipment) => (
              <tr >
                <td className="label-cell">              
                  <PopupEquipItemButton
                    updateCharacter={updateCharacter}
                    updateInventoryState={updateInventoryState}
                    subtype={equipment.type}
                    characterKey={equipment.charKey as keyof CharacterBasetype}
                    currentEquipmentId= {equipment.object.ID}
                    CharacterID={character.General.Id}
                  />
                </td>
                <td className="label-cell">{extractSlotName(equipment.charKey)}</td>
                <td className="label-cell">{equipment.object.Name}</td>
                <td className="value-cell">{equipment.object.DefensiveStats.DefenseMelee}</td>
                <td className="value-cell">{equipment.object.DefensiveStats.DefenseRange}</td>
                <td className="value-cell">{equipment.object.DefensiveStats.ResPhysical}</td>
                <td className="value-cell">{equipment.object.Characteristics.Strength !== 0 ? equipment.object.Characteristics.Strength : '—'}</td>
                <td className="value-cell">{equipment.object.Characteristics.Intelligence !== 0 ? equipment.object.Characteristics.Intelligence : '—'}</td>
                <td className="value-cell">{equipment.object.Characteristics.Constitution !== 0 ? equipment.object.Characteristics.Constitution : '—'}</td>
                <td className="value-cell">{equipment.object.Characteristics.Charisma !== 0 ? equipment.object.Characteristics.Charisma : '—'}</td>
                <td className="value-cell">{equipment.object.Characteristics.Dexterity !== 0 ? equipment.object.Characteristics.Dexterity : '—'}</td>
                <td className="value-cell">{equipment.object.Characteristics.Agility !== 0 ? equipment.object.Characteristics.Agility : '—'}</td>
                <td className="value-cell">{equipment.object.Characteristics.Perception !== 0 ? equipment.object.Characteristics.Perception : '—'}</td>
                <td className="value-cell">{equipment.object.Characteristics.Power !== 0 ? equipment.object.Characteristics.Power : '—'}</td>
                <td className="value-cell small-text-cell">{equipment.object.positiveBonus}</td>
                <td className="value-cell small-text-cell">{equipment.object.negativeBonus}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
    </div>
  );
}

function extractSlotName(key: string): string {
  return key
    .replace(/^equipment/, '') // Remove the 'equipment' prefix
    .replace(/ID$/, '');       // Remove the 'ID' suffix
}
