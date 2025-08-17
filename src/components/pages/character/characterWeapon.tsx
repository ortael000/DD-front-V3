// import library dependencies
import React, { useState, useEffect } from 'react';

// import functions
import { fetchCharacter } from '../../../helpers/APIHelpers';
import { calculateFullCharacter } from '../../../helpers/calculateCharacterData/characterPageHelper';

// import types
import { CharacterBasetype, CharacterFulltype } from '../../../types/character';

// import objects
import { initialCharacterBase, initialCharacterFull } from '../../../data/initiateObject';

// import icons
import { ElementIcons, attackIcons, generalIcons, skillIcons } from '../../../assets/iconeList';

interface Props {
  character: CharacterFulltype;
}

export default function CharacterWeapon({ character }: Props) {
  const { Weapon1 } = character;
  const { Weapon2 } = character;
  const { Weapon3 } = character;

  const weapons = [Weapon1, Weapon2, Weapon3]

  return (
    <div className="character-section">
      <h2 className="general-title">Weapons</h2>

      <table className="general-table">
        <thead>
          <tr>
            <th className="label-cell"> Name</th>
            <th className="value-cell">Damage Type</th>
            <th className="value-cell"><img src={attackIcons.range}  className="attack-icon" /> </th>
            <th className="value-cell"><img src={attackIcons.minDamage}  className="attack-icon" /> </th>
            <th className="value-cell"><img src={attackIcons.maxDamage}  className="attack-icon" /> </th>
            <th className="value-cell"><img src={attackIcons.precision}  className="attack-icon" /> </th>
            <th className="value-cell"><img src={attackIcons.critical}  className="attack-icon" /> </th>
            <th className="value-cell">other effect</th>
          </tr>
          
        </thead>
        <tbody>
          {weapons.map((weapon) => (
            <tr >
              <td className="value-cell">{weapon.Name}</td>
              <td className="value-cell"><img src={ElementIcons[weapon.element as keyof typeof ElementIcons]}  className="attack-icon" /></td>
              <td className="value-cell">{weapon.type}</td>
              <td className="value-cell">{weapon.minDamage}</td>
              <td className="value-cell">{weapon.maxDamage}</td>
              <td className="value-cell">{weapon.precision}</td>
              <td className="value-cell">{weapon.critical}</td>
              <td className="value-cell small-text-cell">{weapon.OtherEffects}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
