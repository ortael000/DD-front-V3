import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';

import { EquipmentDisplayed } from '../../../types/character';

import { ElementIcons, attackIcons, generalIcons, skillIcons, characteristicsIcons, defenseIcons } from '../../../assets/iconeList';

import { equipmentTypeList } from '../../../data/initiateObject';

interface Props {
  equipment: EquipmentDisplayed[];
}

const charList = [
  "All",
  "DefenseMelee",
  "DefenseRange",
  "ResPhysical",
  "Strength",
  "Intelligence",
  "Constitution",
  "Charisma",
  "Dexterity",
  "Agility",
  "Perception",
  "Power",
];



type CharacteristicsType = EquipmentDisplayed["Characteristics"];
type DefensiveStatsType = EquipmentDisplayed["DefensiveStats"];

const EquipmentDisplayList: React.FC<Props> = ({ equipment }) => {


  const initialState = equipment.filter(item => item.Name !== "None");

  const [equipmentToBeDisplayed, setEquipmentToBeDisplayed] = useState(initialState);

  console.log("Equipment to display:", equipmentToBeDisplayed);

  const filterEquipmentByName = (name: string) => {
    const filtered = equipment.filter(item => item.Name.toLowerCase().includes(name.toLowerCase()));
    setEquipmentToBeDisplayed(filtered);
  };

  const filterEquipmentByCharacteristic = (characteristic: string) => {
    const filtered = equipment.filter(item => {
      const valueChar = item.Characteristics[characteristic as keyof CharacteristicsType];
      const valueDef = item.DefensiveStats[characteristic as keyof DefensiveStatsType];
      if (valueChar !== undefined && valueChar !== 0) {
        return true;
      }
      if (valueDef !== undefined && valueDef !== 0) {
        return true;
      }
      return false;
    });
    setEquipmentToBeDisplayed(filtered);
  };

  const filterEquipmentByKeyWord = (keyword: string) => {
    const filtered = initialState.filter(item => item.positiveBonus.toLowerCase().includes(keyword.toLowerCase()));
    setEquipmentToBeDisplayed(filtered);
  };

  const filterEquipmentByType = (type: string) => {
    const filtered = initialState.filter(item => item.Subtype === type);
    setEquipmentToBeDisplayed(filtered);
  };


  return (
    <div>
      <div className="filters">
        {/* input to filter passive by name */}
        <input
          type="text"
          placeholder="Filter by name..."
          onChange={(e) => filterEquipmentByName(e.target.value)}
          className="filter-input"
        />

        {/* input to filter passive by characteristic (selection list from charList) */}
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="char-select-label">Characteristic</InputLabel>
          <Select
            labelId="char-select-label"
            onChange={(e) => filterEquipmentByCharacteristic(e.target.value)}
            defaultValue=""
          >
            {charList.map((char) => (
              <MenuItem key={char} value={char}>
                {char}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="char-select-label">Type</InputLabel>
          <Select
            labelId="char-select-label"
            onChange={(e) => filterEquipmentByType(e.target.value)}
            defaultValue=""
          >
            {equipmentTypeList.map((char) => (
              <MenuItem key={char} value={char}>
                {char}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* input to filter passive by characteristic (free input) */}
        <input
          type="text"
          placeholder="Filter by key word..."
          onChange={(e) => filterEquipmentByKeyWord(e.target.value)}
          className="filter-input"
        />
      </div>
          <div className="equipment-list">
      {equipmentToBeDisplayed.map((item) => {
        return (
          <div key={item.ID} className="item-card">
            <div className="item-title">
              <h3>{item.Name}</h3>
              <div className="item-type-value">
                <p>{item.Subtype}</p>
                <p>Value: {item.Value}</p>
              </div>
             
            </div>
            <table className="general-table sub-table">
              <thead>
                <tr>
                  <th className="value-cell"><img src={defenseIcons.DefenseMelee} className="attack-icon" /></th>
                  <th className="value-cell"><img src={defenseIcons.DefenseRange} className="attack-icon" /></th>
                  <th className="value-cell"><img src={defenseIcons.ResPhysical} className="attack-icon" /></th>
                  <th className="spacer-cell"></th>
                  {Object.entries(item.Characteristics).map(([key, value]) =>
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
                  <td>{item.DefensiveStats.DefenseMelee}</td>
                  <td>{item.DefensiveStats.DefenseRange}</td>
                  <td>{item.DefensiveStats.ResPhysical}</td>
                  <td className="spacer-cell"></td>
                  {Object.entries(item.Characteristics).map(([key, value]) =>
                    value !== 0 ? <td key={key}>{value}</td> : null
                  )}
                </tr>
              </tbody>
            </table>
          <div className="additionalEffects">
            <div className="positive-bonus">{item.positiveBonus}</div>
            <div className="negative-bonus">{item.negativeBonus}</div>
          </div>
        </div>
      )})}
    </div>
    </div>
  );
};

export default EquipmentDisplayList;

