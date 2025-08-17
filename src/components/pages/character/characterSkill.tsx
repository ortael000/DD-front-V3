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

export default function CharacterSkill({ character }: Props) {
  const { Skill1 } = character;
  const { Skill2 } = character;
  const { Skill3 } = character;
  const { Skill4 } = character;
  const { Skill5 } = character;
  const { Skill6 } = character;

  const skills = [Skill1, Skill2, Skill3, Skill4, Skill5, Skill6]

  return (
    <div className="character-section">
      <h2 className="general-title">Skills</h2>

      <table className="general-table">
        <thead>
          <tr>
            <th className="label-cell"> Name</th>
            <th className="value-cell"><img src={attackIcons.range}  className="attack-icon" /> </th>
            <th className="value-cell"><img src={skillIcons.elementWheel} className="attack-icon" /> </th>
            <th className="value-cell"><img src={generalIcons.mana} className="attack-icon" /> </th>
            <th className="value-cell"><img src={attackIcons.minDamage}  className="attack-icon" /> </th>
            <th className="value-cell"><img src={attackIcons.maxDamage}  className="attack-icon" /> </th>
            <th className="value-cell"><img src={attackIcons.precision}  className="attack-icon" /> </th>
            <th className="value-cell"><img src={attackIcons.critical}  className="attack-icon" /> </th>
            <th className="value-cell ">other effect</th>
          </tr>
          
        </thead>
        <tbody>
          {skills.map((skill) => (
            <tr >
              <td className="value-cell">{skill.name}</td>
              <td className="value-cell">{skill.type}</td>
              <td className="value-cell"><img src={ElementIcons[skill.element]}  className="attack-icon" /></td>
              <td className="value-cell">{skill.manaCost}</td>
              <td className="value-cell">{skill.minDamage}</td>
              <td className="value-cell">{skill.maxDamage}</td>
              <td className="value-cell">{skill.precision}</td>
              <td className="value-cell">{skill.critical}</td>
              <td className="value-cell small-text-cell">{skill.additionalEffect}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
