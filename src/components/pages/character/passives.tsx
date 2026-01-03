// import library dependencies
import React, { useState, useEffect } from 'react';

// import functions
import { fetchCharacter } from '../../../helpers/dataBase&API/characterAPI';
import { calculateFullCharacter } from '../../../helpers/calculateCharacterData/characterPageHelper';
import transformPassiveToDic from '../../../helpers/dictionnary/passiveDictionnaryHelper';
import { calculateRemainingPassivePoint } from '../../../helpers/calculateCharacterData/calculateRemainingPoint';
import { resetCharPassive } from '../../../helpers/dataBase&API/resetCharacter';

// import types
import { CharacterBasetype, CharacterFulltype, EquipmentDisplayed, PassiveDisplayed } from '../../../types/character';

// import objects
import { initialCharacterBase, initialCharacterFull } from '../../../data/initiateObject';

// import icons
import { ElementIcons, attackIcons, generalIcons, skillIcons, characteristicsIcons, defenseIcons } from '../../../assets/iconeList';

import PopupUpdatePassive from './popups.tsx/passivePopup';

interface Props {
  character: CharacterFulltype;
  updateCharacter: () => void;
}

export default function CharacterPassives({ character, updateCharacter }: Props) {

  const passives = [
    {passivekey: "passive1ID", object: transformPassiveToDic(character.Passive.passive1)},
    {passivekey: "passive2ID", object: transformPassiveToDic(character.Passive.passive2)},
    {passivekey: "passive3ID", object: transformPassiveToDic(character.Passive.passive3)},
    {passivekey: "passive4ID", object: transformPassiveToDic(character.Passive.passive4)},
  ];


  const [remainingPoints, setRemainingPoints] = useState(0);
  
    useEffect(() => {
      const remainingPoints = calculateRemainingPassivePoint(character);
      console.log("Remaining Passive Points:", remainingPoints);
      setRemainingPoints(remainingPoints);
    }, [character]);
  

  // console.log("Character Passives:", character.Passive);



  return (
    <div className="character-section">
      <h2 className="general-title">
        {remainingPoints > 0 && (
          <div className="remaining-points">
            <span className="remaining-points-value"> {remainingPoints}</span>
            <span> points remaining</span>
            </div>
          )}
          Passives
          <button className="reset-button" onClick={async () => { await resetCharPassive(character.General.Id); updateCharacter(); }}>reset</button>
      </h2>
      <div className='tableContainer'> 
        
        <table className="general-table sub-table">
          <thead>
            <tr>
              <th className="label-cell"> </th>
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
              <td className="label-cell">
                  {remainingPoints > 0 && (
                  <PopupUpdatePassive
                  updateCharacter={updateCharacter}
                  characterKey={passive.passivekey as keyof CharacterBasetype}
                  currentPassiveId= {passive.object.Id}
                  fullCharacter={character}
                  />
                )}             
              </td>                 
                <td className="label-cell">{passive.object.Name}</td>
                <td className="value-cell">{passive.object.Characteristics.Strength !== 0 ? passive.object.Characteristics.Strength : '—'}</td>
                <td className="value-cell">{passive.object.Characteristics.Intelligence !== 0 ? passive.object.Characteristics.Intelligence : '—'}</td>
                <td className="value-cell">{passive.object.Characteristics.Constitution !== 0 ? passive.object.Characteristics.Constitution : '—'}</td>
                <td className="value-cell">{passive.object.Characteristics.Charisma !== 0 ? passive.object.Characteristics.Charisma : '—'}</td>
                <td className="value-cell">{passive.object.Characteristics.Dexterity !== 0 ? passive.object.Characteristics.Dexterity : '—'}</td>
                <td className="value-cell">{passive.object.Characteristics.Agility !== 0 ? passive.object.Characteristics.Agility : '—'}</td>
                <td className="value-cell">{passive.object.Characteristics.Perception !== 0 ? passive.object.Characteristics.Perception : '—'}</td>
                <td className="value-cell">{passive.object.Characteristics.Power !== 0 ? passive.object.Characteristics.Power : '—'}</td>
                <td className="value-cell small-text-cell">{passive.object.positiveBonus}</td>
                <td className="value-cell small-text-cell">{passive.object.negativeBonus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
