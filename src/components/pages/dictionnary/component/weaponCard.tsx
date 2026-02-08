 import React, { useState, useEffect } from 'react';
 import { FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';
 
 import { WeaponBaseType } from '../../../../types/character';
 import { ElementIcons, attackIcons, generalIcons, skillIcons, characteristicsIcons, defenseIcons } from '../../../../assets/iconeList';
 import MoneyDisplay from '../../character/smallComponent/money';
 
 
 
 interface Props {
   weapon: WeaponBaseType;
 }
 
 const WeaponCard: React.FC<Props> = ({ weapon }) => {
    if (!weapon) {  
      return <div>...</div>;
    }
   return (
          <div key={weapon.id} className="item-card">
            <div className="item-title">
              <h3>{weapon.Name}</h3>
              <div className="item-type-value">
                <p>{weapon.Hand + "-" + weapon.Subtype} </p>
              </div>
             
            </div>
            <table className="general-table sub-table">
              <thead>
                <tr>
                  <th className="value-cell">Damage Type</th>
                  <th className="value-cell"><img src={attackIcons.range}  className="attack-icon" /> </th>
                  <th className="value-cell"><img src={attackIcons.minDamage}  className="attack-icon" /> </th>
                  <th className="value-cell"><img src={attackIcons.maxDamage}  className="attack-icon" /> </th>
                  <th className="value-cell"><img src={attackIcons.precision}  className="attack-icon" /> </th>
                  <th className="value-cell"><img src={attackIcons.critical}  className="attack-icon" /> </th>
                  <th className="value-cell"> Damage stat </th>
                  <th className="value-cell"> Precision stat </th>
                  <th className="value-cell">other effect</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="value-cell"><img src={ElementIcons[weapon.Element as keyof typeof ElementIcons]}  className="attack-icon" /></td>
                  <td className="value-cell">{weapon.Type} </td>
                  <td className="value-cell">
                    <div className="bold-text"> {weapon.BaseMinDam} </div>
                    <div className="small-text"> X {weapon.MinDamRatio} </div>
                    </td>
                  <td className="value-cell">
                    <div className="bold-text"> {weapon.BaseMaxDam} </div>
                    <div className="small-text"> X {weapon.MaxDamRatio} </div>
                  </td>
                  <td className="value-cell">
                     <div className="bold-text"> {weapon.BasePrecision} </div>
                     <div className="small-text"> X {weapon.PrecisionRatio} </div>
                    </td>
                  <td className="value-cell">{weapon.CriticScore}</td>
                  <td className="value-cell">
                    <img src={characteristicsIcons[weapon.StatDam1 as keyof typeof characteristicsIcons]}  className="attack-icon" />
                    <img src={characteristicsIcons[weapon.StatDam2 as keyof typeof characteristicsIcons]}  className="attack-icon" />
                  </td>
                  <td className="value-cell">
                    <img src={characteristicsIcons[weapon.StatPrecision1 as keyof typeof characteristicsIcons]}  className="attack-icon" />
                    <img src={characteristicsIcons[weapon.StatPrecision2 as keyof typeof characteristicsIcons]}  className="attack-icon" />
                  </td>                  
                  <td className="value-cell small-text-cell">{weapon.OtherEffects}</td>
                </tr>
              </tbody>
            </table>
        </div>
 
   );
 };
 
 export default WeaponCard;