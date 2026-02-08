import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';

import { PassiveType } from '../../../../types/character';
import { ElementIcons, attackIcons, generalIcons, skillIcons, characteristicsIcons, defenseIcons } from '../../../../assets/iconeList';
import MoneyDisplay from '../../character/smallComponent/money';

import transformPassiveToDic from '../../../../helpers/dictionnary/passiveDictionnaryHelper';

const allIcons = {
  ...characteristicsIcons,
  ...defenseIcons,
};

interface Props {
  passive: PassiveType;
  parentName?: string;
}

const PassiveCard: React.FC<Props> = ({ passive, parentName }) => {

  if (!passive) {
    return <div>...</div>;
  }

  const passiveDic = transformPassiveToDic(passive);

  return (
    <div>
          <div key={passiveDic.Id} className="item-card">
            <div className="item-title">
              <h3>{passiveDic.Name}</h3>
              <div className="item-type-value">
              <p>
                Level: {passiveDic.LevelRequired}
                {parentName && parentName !== "None" && (
                  <span className="parent-passive">
                    {" "} Parent: {parentName}
                  </span>
                )}
              </p>
              </div>
            </div>

            <table className="general-table sub-table">
              <thead>
                <tr>
                  {Object.entries(passiveDic.Characteristics).map(([key, value]) =>
                    (typeof value === "number" && value !== 0) ? (
                      <th key={key} className="label-cell">
                        <img
                          src={allIcons[key as keyof typeof allIcons]}
                          className="attack-icon"
                        />
                      </th>
                    ) : null
                  )}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {Object.entries(passiveDic.Characteristics).map(([key, value]) =>
                    (typeof value === "number" && value !== 0) ? <td key={key}>{value}</td> : null
                  )}
                </tr>
              </tbody>
            </table>
            <div className="additionalEffects">
              <div className="positive-bonus">{passiveDic.positiveBonus}</div>
              <div className="negative-bonus">{passiveDic.negativeBonus}</div>
              <div className="other-effect">{passiveDic.otherEffect}</div>
            </div>
          </div>
    </div>

  );
};

export default PassiveCard;