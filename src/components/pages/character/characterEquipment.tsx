// import library dependencies
import React, { useState, useEffect } from 'react';

// import functions
import { fetchCharacter } from '../../../helpers/APIHelpers';
import { calculateFullCharacter } from '../../../helpers/calculateCharacterData/characterPageHelper';

// import types
import { CharacterBasetype, CharacterFulltype, EquipmentDisplayed } from '../../../types/character';

// import objects
import { initialCharacterBase, initialCharacterFull } from '../../../data/initiateObject';

// import icons
import { ElementIcons, attackIcons, generalIcons, skillIcons, characteristicsIcons, defenseIcons } from '../../../assets/iconeList';


interface Props {
  character: CharacterFulltype;
}

export default function CharacterEquipment({ character }: Props) {
  const { Helmet } = character.Equipment;
  const { Armor } = character.Equipment;  
  const { Pants } = character.Equipment;
  const { Belt } = character.Equipment;
  const { Gauntlet } = character.Equipment;
  const { Boots } = character.Equipment;
  const { Ring1 } = character.Equipment;
  const { Ring2 } = character.Equipment;
  const { Necklace } = character.Equipment;
  const { Shield } = character.Equipment;

  const equipments = [Helmet, Armor, Pants, Belt, Gauntlet, Boots, Ring1, Ring2, Necklace, Shield];



  return (
    <div className="character-section">
      <h2 className="general-title">Equipments</h2>
      <div className='tableContainer'> 

        <table className="general-table sub-table">
          <thead>
            <tr>
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
                <td className="label-cell">{equipment.Name}</td>
                <td className="value-cell">{equipment.DefensiveStats.DefenseMelee}</td>
                <td className="value-cell">{equipment.DefensiveStats.DefenseRange}</td>
                <td className="value-cell">{equipment.DefensiveStats.ResPhysical}</td>
                <td className="value-cell">{equipment.Characteristics.Strength !== 0 ? equipment.Characteristics.Strength : '—'}</td>
                <td className="value-cell">{equipment.Characteristics.Intelligence !== 0 ? equipment.Characteristics.Intelligence : '—'}</td>
                <td className="value-cell">{equipment.Characteristics.Constitution !== 0 ? equipment.Characteristics.Constitution : '—'}</td>
                <td className="value-cell">{equipment.Characteristics.Charisma !== 0 ? equipment.Characteristics.Charisma : '—'}</td>
                <td className="value-cell">{equipment.Characteristics.Dexterity !== 0 ? equipment.Characteristics.Dexterity : '—'}</td>
                <td className="value-cell">{equipment.Characteristics.Agility !== 0 ? equipment.Characteristics.Agility : '—'}</td>
                <td className="value-cell">{equipment.Characteristics.Perception !== 0 ? equipment.Characteristics.Perception : '—'}</td>
                <td className="value-cell">{equipment.Characteristics.Power !== 0 ? equipment.Characteristics.Power : '—'}</td>
                <td className="value-cell small-text-cell">{equipment.positiveBonus}</td>
                <td className="value-cell small-text-cell">{equipment.negativeBonus}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
    </div>
  );
}
