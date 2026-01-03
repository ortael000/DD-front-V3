// import library dependencies
import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';

// import functions
import { fetchCharacter, updateCharacterDB } from '../../../helpers/dataBase&API/characterAPI';
import { calculateFullCharacter } from '../../../helpers/calculateCharacterData/characterPageHelper';
import { calculateRemainingCharPoint } from '../../../helpers/calculateCharacterData/calculateRemainingPoint'; 
import { resetCharCharacteristics } from '../../../helpers/dataBase&API/resetCharacter';

// import types
import { CharacterBasetype, CharacterFulltype } from '../../../types/character';
import { Characteristic } from '../../../types/stringLists';

// import objects
import { initialCharacterBase, initialCharacterFull } from '../../../data/initiateObject';


interface Props {
  character: CharacterFulltype;
  updateCharacter: () => void;
}

export default function CharacterCharacteristics({ character, updateCharacter }: Props) {

  const [updateValue, setUpdateValue] = useState(1);

  const { Characteristics } = character;
  const remainingPoints = calculateRemainingCharPoint(character);

  const handleAddChar = async (char: Characteristic) => {

    const newRemainingPoints = calculateRemainingCharPoint(character);

    if (newRemainingPoints > 0) {
      // Allow adding points
      const currentValue = Characteristics[char].Base;
      await updateCharacterDB(character.General.id, { [char]: currentValue + 1 });
      updateCharacter();
    } else {
      console.log("No remaining points to add.");
    }
  };

  const updateTemporaryChar = async (char: Characteristic, delta : number) => {

      console.log("updating temporary from current stat", Characteristics, char, delta);
      const currentValue = Characteristics[char].Temporary;
      await updateCharacterDB(character.General.id, { ['Temp' + char]: currentValue + delta });
      updateCharacter();
  };

  const onUpdateValueChange = (newValue: number) => {
    setUpdateValue(newValue);
  };

  return (
    <div className="character-section">
        <h2 className="general-title">
          {remainingPoints > 0 && (
              <div className="remaining-points">
                <span className="remaining-points-value"> {remainingPoints}</span>
                <span> points remaining</span>
              </div>
            )}
            Characteristics
            <button className="reset-button" onClick={async () => { await resetCharCharacteristics(character.General.id); updateCharacter(); }}>reset</button>
        </h2>
  

      <table className="general-table">
        <thead>
          <tr>
            <th className="label-cell">Attribute</th>
            <th className="value-cell">Base</th>
            <th className="value-cell">Equipment</th>
            <th className="value-cell">Passive</th>
            <th className="value-cell">Temporary</th>
            <th className="value-cell">Total</th>
            <th className="value-cell">Modifier</th>
            <th className="value-cell">
              <div>Update</div>
              <input
                type="number"
                className='update-input'
                value={updateValue}
                onChange={(e) => onUpdateValueChange(Number(e.target.value))}
              />
              <div>temporary</div>
              </th>
          </tr>

        </thead>
        <tbody>
          {Object.entries(Characteristics).map(([key, stat]) => (
            <tr key={key}>
              <td className="label-cell">
                {remainingPoints > 0 && (
                  <Button
                    size="small"
                    onClick={() => handleAddChar(key as Characteristic)}
                  >
                    +
                  </Button>
                )}
                {key}
              </td>
              <td className="value-cell">{stat.Base}</td>
              <td className="value-cell">{stat.Equipment}</td>
              <td className="value-cell">{stat.Passive}</td>
              <td className="value-cell">{stat.Temporary}</td>
              <td className="value-cell">{stat.Total}</td>
              <td className="value-cell">{stat.Modifier}</td>
              <td className="value-cell">
                <Button
                  size="small"
                  onClick={() => updateTemporaryChar(key as Characteristic, updateValue)}
                >
                  Add
                </Button>
                <Button
                  size="small"
                  onClick={() => updateTemporaryChar(key as Characteristic, -updateValue)}
                >
                  Remove
                </Button>
              </td>
            </tr>
              
          ))}
        </tbody>
      </table>
    </div>
  );
}
