import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';

import { EquipmentDisplayed, EquipmentType } from '../../../../types/character';
import { ElementIcons, attackIcons, generalIcons, skillIcons, characteristicsIcons, defenseIcons } from '../../../../assets/iconeList';
import MoneyDisplay from '../../character/smallComponent/money';

import { transformEquipment } from '../../../../helpers/calculateCharacterData/characterPageHelper';

interface Props {
  equipment: EquipmentType;
}

const EquipmentCard: React.FC<Props> = ({ equipment }) => {

  const equipmentDisplayed = transformEquipment(equipment);

  if (!equipmentDisplayed) {
    return <div>...</div>;
  } 
  else {
    return (
      <div>
            <div key={equipmentDisplayed.ID} className="item-card">
              <div className="item-title">
                <h3>{equipmentDisplayed.Name}</h3>
                <div className="item-type-value">
                  <p>{equipmentDisplayed.Subtype}</p>
                  <MoneyDisplay money={equipmentDisplayed.Value}/>
                </div>
              
              </div>
              <table className="general-table sub-table">
                <thead>
                  <tr>
                    <th className="value-cell"><img src={defenseIcons.DefenseMelee} className="attack-icon" /></th>
                    <th className="value-cell"><img src={defenseIcons.DefenseRange} className="attack-icon" /></th>
                    <th className="value-cell"><img src={defenseIcons.ResPhysical} className="attack-icon" /></th>
                    <th className="spacer-cell"></th>
                    {Object.entries(equipmentDisplayed.Characteristics).map(([key, value]) =>
                      value !== 0 ? (
                        <th key={key} className="label-cell">
                          <img src={characteristicsIcons[key as keyof typeof characteristicsIcons]} className="attack-icon" />
                        </th>
                      ) : null
                    )}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{equipmentDisplayed.DefensiveStats.DefenseMelee}</td>
                    <td>{equipmentDisplayed.DefensiveStats.DefenseRange}</td>
                    <td>{equipmentDisplayed.DefensiveStats.ResPhysical}</td>
                    <td className="spacer-cell"></td>
                    {Object.entries(equipmentDisplayed.Characteristics).map(([key, value]) =>
                      value !== 0 ? <td key={key}>{value}</td> : null
                    )}
                  </tr>
                </tbody>
              </table>
            <div className="additionalEffects">
              <div className="positive-bonus">{equipmentDisplayed.positiveBonus}</div>
              <div className="negative-bonus">{equipmentDisplayed.negativeBonus}</div>
            </div>
          </div>
      </div>

    );
  };
}

export default EquipmentCard;