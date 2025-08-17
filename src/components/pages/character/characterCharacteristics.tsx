// import library dependencies
import React, { useState, useEffect } from 'react';

// import functions
import { fetchCharacter } from '../../../helpers/APIHelpers';
import { calculateFullCharacter } from '../../../helpers/calculateCharacterData/characterPageHelper';

// import types
import { CharacterBasetype, CharacterFulltype } from '../../../types/character';

// import objects
import { initialCharacterBase, initialCharacterFull } from '../../../data/initiateObject';


interface Props {
  character: CharacterFulltype;
}

export default function CharacterCharacteristics({ character }: Props) {
  const { Characteristics } = character;

  return (
    <div className="character-section">
      <h2 className="general-title">Characteristics</h2>

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
          </tr>
        </thead>
        <tbody>
          {Object.entries(Characteristics).map(([key, stat]) => (
            <tr key={key}>
              <td className="label-cell">{key}</td>
              <td className="value-cell">{stat.Base}</td>
              <td className="value-cell">{stat.Equipment}</td>
              <td className="value-cell">{stat.Passive}</td>
              <td className="value-cell">{stat.Temporary}</td>
              <td className="value-cell">{stat.Total}</td>
              <td className="value-cell">{stat.Modifier}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
