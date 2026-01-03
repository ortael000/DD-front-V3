import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';

import { EquipmentDisplayed } from '../../../types/character';
import { EquipmentFilters } from '../../../types/dictionnaryFilter';

import { ElementIcons, attackIcons, generalIcons, skillIcons, characteristicsIcons, defenseIcons } from '../../../assets/iconeList';

import { equipmentTypeList } from '../../../data/initiateObject';

import MoneyDisplay from '../character/smallComponent/money';


interface Props {
  equipment: EquipmentDisplayed[];
}

const charList = [
  "None",
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

  const [equipmentToBeDisplayed, setEquipmentToBeDisplayed] = useState<EquipmentDisplayed[]>(initialState);
  const [currentFilters, setCurrentFilters] = useState<EquipmentFilters>({
    name: "",
    type: "All",
    characteristic: "None",
    bonusKey: "None",
  });

 const filterEquipmentInDictionnary = (filterKey: keyof EquipmentFilters, filterValue: string) => {

  console.log("filtering equipment by", filterKey, filterValue);

  const newFilters = { ...currentFilters, [filterKey]: filterValue };

  setCurrentFilters(newFilters);

  console.log("current filters after update", newFilters);

  let filteredList = initialState;
  console.log("after initial state", filteredList);

  filteredList = filteredList.filter(item => item.Name.toLowerCase().includes(newFilters.name.toLowerCase()))
  console.log("after name filter", filteredList);

  filteredList = newFilters.type === "All" ? filteredList : filteredList.filter(item => item.Subtype === newFilters.type)
  console.log("after type filter", filteredList);

  filteredList = filteredList.filter(item => {
      const valueChar = item.Characteristics[newFilters.characteristic as keyof CharacteristicsType];
      const valueDef = item.DefensiveStats[newFilters.characteristic as keyof DefensiveStatsType];
      if (newFilters.characteristic === "None") {
        return true;
      }
      if (valueChar !== undefined && valueChar !== 0) {
        return true;
      }
      if (valueDef !== undefined && valueDef !== 0) {
        return true;
      }
      return false;
    });
  console.log("after characteristic filter", filteredList);

  filteredList = filteredList.filter(item => {
    if (newFilters.bonusKey === "None") {
      return true;
    }
    return item.positiveBonus.toLowerCase().includes(newFilters.bonusKey.toLowerCase());
  });
  console.log("after bonusKey filter", filteredList);

  setEquipmentToBeDisplayed(filteredList);
};

  useEffect(() => {
    const transformed = equipment.filter(item => item.Name !== "None")
    setEquipmentToBeDisplayed(transformed);
  }, [equipment]);


  return (
    <div>
      <div className="filters">
        {/* input to filter passive by name */}
        <input
          type="text"
          placeholder="Filter by name..."
          onChange={(e) => filterEquipmentInDictionnary('name', e.target.value)}
          className="filter-input"
        />

        {/* input to filter passive by characteristic (selection list from charList) */}
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="char-select-label">Characteristic</InputLabel>
          <Select
            labelId="char-select-label"
            onChange={(e) => filterEquipmentInDictionnary('characteristic', e.target.value)}
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
            onChange={(e) => filterEquipmentInDictionnary('type', e.target.value)}
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
          onChange={(e) => filterEquipmentInDictionnary('bonusKey', e.target.value)}
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
                <MoneyDisplay money={item.Value}/>
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

