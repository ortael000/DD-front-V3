import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';

import { EquipmentDisplayed, EquipmentType } from '../../../types/character';
import { EquipmentFilters } from '../../../types/dictionnaryFilter';

import { ElementIcons, attackIcons, generalIcons, skillIcons, characteristicsIcons, defenseIcons } from '../../../assets/iconeList';

import { equipmentTypeList } from '../../../data/initiateObject';

import MoneyDisplay from '../character/smallComponent/money';
import EquipmentCard from './component/equipmentCard';
import { transformEquipment } from '../../../helpers/calculateCharacterData/characterPageHelper';

interface Props {
  equipment: EquipmentType[];
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

  const [equipmentToBeDisplayed, setEquipmentToBeDisplayed] = useState<EquipmentType[]>(initialState);
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

  filteredList = filteredList.filter((item) => { 
    if (newFilters.characteristic === "None") {
      return true;
    }
    const charValue = item[newFilters.characteristic];
    return charValue !== undefined && charValue > 0;
  });

  console.log("after characteristic filter", filteredList);

  filteredList = filteredList.filter(item => {
    if (newFilters.bonusKey === "None") {
      return true;
    }
    const displayedItem = transformEquipment(item);
    return displayedItem.positiveBonus.toLowerCase().includes(newFilters.bonusKey.toLowerCase());
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
        return <EquipmentCard key={item.id} equipment={item} />
      })}
    </div>
    </div>
  );
};

export default EquipmentDisplayList;

