// import library dependencies
import React, { useState, useEffect } from 'react';

// import functions
import { fetchCharacter } from '../../../helpers/dataBase&API/characterAPI';
import { calculateFullCharacter } from '../../../helpers/calculateCharacterData/characterPageHelper';
import { calculateRemainingSkillPoint } from '../../../helpers/calculateCharacterData/calculateRemainingPoint';
import { resetCharSkills } from '../../../helpers/dataBase&API/resetCharacter';

// import types
import { CharacterBasetype, CharacterFulltype } from '../../../types/character';

// import objects
import { initialCharacterBase, initialCharacterFull } from '../../../data/initiateObject';

// import icons
import { ElementIcons, attackIcons, generalIcons, skillIcons } from '../../../assets/iconeList';

import PopupUpdateSkill from './popups.tsx/skillPopup';

interface Props {
  character: CharacterFulltype;
  updateCharacter: () => void;
}

export default function CharacterSkill({ character, updateCharacter }: Props) {
  const { Skill1 } = character;
  const { Skill2 } = character;
  const { Skill3 } = character;
  const { Skill4 } = character;
  const { Skill5 } = character;
  const { Skill6 } = character;

  const skills = [
    {skillKey: "skill1ID", object: Skill1},
    {skillKey: "skill2ID", object: Skill2},
    {skillKey: "skill3ID", object: Skill3},
    {skillKey: "skill4ID", object: Skill4},
    {skillKey: "skill5ID", object: Skill5},
    {skillKey: "skill6ID", object: Skill6}
  ]

  const [remainingPoints, setRemainingPoints] = useState(0);

  useEffect(() => {
    setRemainingPoints(calculateRemainingSkillPoint(character));
  }, [character]);

  return (
    <div className="character-section">
      <h2 className="general-title">
        {remainingPoints > 0 && (
          <div className="remaining-points">
            <span className="remaining-points-value"> {remainingPoints}</span>
            <span> points remaining</span>
            </div>
          )}
          Skills
          <button className="reset-button" onClick={async () => { await resetCharSkills(character.General.id); updateCharacter(); }}>reset</button>
      </h2>

      <table className="general-table">
        <thead>
          <tr>
            <th className="label-cell"> </th>
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
              <td className="label-cell">
                  {remainingPoints > 0 && (
                  <PopupUpdateSkill
                  updateCharacter={updateCharacter}
                  characterKey={skill.skillKey as keyof CharacterBasetype}
                  currentSkillId= {skill.object.Id}
                  fullCharacter={character}
                  />
                )}             
              </td>                
              <td className="value-cell">{skill.object.name}</td>
              <td className="value-cell">{skill.object.type}</td>
              <td className="value-cell"><img src={ElementIcons[skill.object.element as keyof typeof ElementIcons]}  className="attack-icon" /></td>
              <td className="value-cell">{skill.object.manaCost}</td>
              <td className="value-cell">{skill.object.minDamage}</td>
              <td className="value-cell">{skill.object.maxDamage}</td>
              <td className="value-cell">{skill.object.precision}</td>
              <td className="value-cell">{skill.object.critical}</td>
              <td className="value-cell small-text-cell">{skill.object.additionalEffect}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
