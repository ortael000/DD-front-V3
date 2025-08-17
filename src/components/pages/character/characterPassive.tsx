// import library dependencies
import React, { useState, useEffect } from 'react';

// import functions
import { fetchCharacter } from '../../../helpers/APIHelpers';
import { calculateFullCharacter, transformPassive } from '../../../helpers/calculateCharacterData/characterPageHelper';

// import types
import { CharacterBasetype, CharacterFulltype, EquipmentDisplayed, PassiveDisplayed } from '../../../types/character';

// import objects
import { initialCharacterBase, initialCharacterFull } from '../../../data/initiateObject';

// import icons
import { ElementIcons, attackIcons, generalIcons, skillIcons, characteristicsIcons, defenseIcons } from '../../../assets/iconeList';


interface Props {
  character: CharacterFulltype;
}

export default function CharacterPassives({ character }: Props) {


  const { passive1 } = character.Passive;
  const { passive2 } = character.Passive;
  const { passive3 } = character.Passive;
  const { passive4 } = character.Passive;

  // console.log("Character Passives:", character.Passive);

  const passives : PassiveDisplayed[] = [transformPassive(passive1), transformPassive(passive2), transformPassive(passive3), transformPassive(passive4)];


  return (
    <div className="character-section">
      <h2 className="general-title">Passives</h2>
      <div className='tableContainer'> 
        
        <table className="general-table sub-table">
          <thead>
            <tr>
              <th className="label-cell">Name</th>
              <th className="label-cell"> <img src={characteristicsIcons.Strength}  className="attack-icon" /></th>
              <th className="label-cell"> <img src={characteristicsIcons.Intelligence}  className="attack-icon" /></th>
              <th className="label-cell"> <img src={characteristicsIcons.Constitution}  className="attack-icon" /></th>
              <th className="label-cell"> <img src={characteristicsIcons.Charisma}  className="attack-icon" /></th>
              <th className="label-cell"> <img src={characteristicsIcons.Dexterity}  className="attack-icon" /></th>
              <th className="label-cell"> <img src={characteristicsIcons.Agility}  className="attack-icon" /></th>
              <th className="label-cell"> <img src={characteristicsIcons.Perception}  className="attack-icon" /></th>
              <th className="label-cell"> <img src={characteristicsIcons.Power}  className="attack-icon" /></th>
              <th className="label-cell">Bonus</th>
              <th className="label-cell">Malus</th>
            </tr>
          </thead>
          <tbody>
            {passives.map((passive) => (
              <tr>
                <td className="label-cell">{passive.Name}</td>
                <td className="value-cell">{passive.Characteristics.Strength !== 0 ? passive.Characteristics.Strength : '—'}</td>
                <td className="value-cell">{passive.Characteristics.Intelligence !== 0 ? passive.Characteristics.Intelligence : '—'}</td>
                <td className="value-cell">{passive.Characteristics.Constitution !== 0 ? passive.Characteristics.Constitution : '—'}</td>
                <td className="value-cell">{passive.Characteristics.Charisma !== 0 ? passive.Characteristics.Charisma : '—'}</td>
                <td className="value-cell">{passive.Characteristics.Dexterity !== 0 ? passive.Characteristics.Dexterity : '—'}</td>
                <td className="value-cell">{passive.Characteristics.Agility !== 0 ? passive.Characteristics.Agility : '—'}</td>
                <td className="value-cell">{passive.Characteristics.Perception !== 0 ? passive.Characteristics.Perception : '—'}</td>
                <td className="value-cell">{passive.Characteristics.Power !== 0 ? passive.Characteristics.Power : '—'}</td>
                <td className="value-cell small-text-cell">{passive.positiveBonus}</td>
                <td className="value-cell small-text-cell">{passive.negativeBonus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
