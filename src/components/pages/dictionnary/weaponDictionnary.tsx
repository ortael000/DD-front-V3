import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';

import { WeaponBaseType } from '../../../types/character';
import { WeaponFilters } from '../../../types/dictionnaryFilter';

import { ElementIcons, attackIcons, generalIcons, skillIcons, characteristicsIcons, defenseIcons } from '../../../assets/iconeList';


// import type 
import { Element, WeaponCategory } from '../../../types/stringLists';

//import list
import { elementList, weaponCategoryList, equipmentTypeList } from '../../../data/initiateObject';
import WeaponCard from './component/weaponCard';


interface Props {
  weapons: WeaponBaseType[];
}

const handList = ['All', 'OneHand', 'TwoHands'];

const WeaponDisplayList: React.FC<Props> = ({ weapons }) => {


  const initialState = weapons.filter(item => item.Name !== "None");

  const [weaponsToBeDisplayed, setWeaponsToBeDisplayed] = useState<WeaponBaseType[]>(initialState);
  const [currentFilters, setCurrentFilters] = useState<WeaponFilters>({
    name: "",
    hand: "All",
    subType: "None",
    element: "All",
  });

  const filterEquipmentInDictionnary = (filterKey: keyof WeaponFilters, filterValue: string) => {

    console.log("filtering equipment by", filterKey, filterValue);
    console.log("current filters before update", currentFilters);
    console.log("initial state", initialState);
  
    const newFilters = { ...currentFilters, [filterKey]: filterValue };
    setCurrentFilters(newFilters);

    let filteredList = initialState;

    filteredList = filteredList.filter(item => item.Name.toLowerCase().includes(newFilters.name.toLowerCase()));

    filteredList = newFilters.subType === "None" ? filteredList : filteredList.filter(item => item.Subtype === newFilters.subType);

    filteredList = newFilters.element === "All" ? filteredList : filteredList.filter(item => item.Element === newFilters.element);

    filteredList = newFilters.hand === "All" ? filteredList : filteredList.filter(item => item.Hand === newFilters.hand);

    console.log("after all filters", filteredList);



    setWeaponsToBeDisplayed(filteredList);
  };

  useEffect(() => {
    const transformed = weapons.filter(item => item.Name !== "None")
    setWeaponsToBeDisplayed(transformed);
  }, [weapons]);


  return (
    <div>
      <div className="filters">
        {/* input to filter passive by name */}
        <input
          type="text"
          placeholder="Filter by name..."
          onChange={(e) => filterEquipmentInDictionnary("name", e.target.value)}
          className="filter-input"
        />

        {/* input to filter passive by characteristic (selection list from charList) */}
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="char-select-label">Element</InputLabel>
          <Select
            labelId="char-select-label"
            onChange={(e) => filterEquipmentInDictionnary("element", e.target.value)}
            defaultValue=""
          >
            {elementList.map((elem) => (
              <MenuItem key={elem} value={elem}>
                {elem}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="char-select-label">Type</InputLabel>
          <Select
            labelId="char-select-label"
            onChange={(e) => filterEquipmentInDictionnary("hand", e.target.value)}
            defaultValue=""
          >
            {handList.map((char) => (
              <MenuItem key={char} value={char}>
                {char}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="char-select-label">Category</InputLabel>
          <Select
            labelId="char-select-label"
            onChange={(e) => filterEquipmentInDictionnary("subType", e.target.value)}
            defaultValue=""
          >
            {weaponCategoryList.map((char) => (
              <MenuItem key={char} value={char}>
                {char}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

      </div>
          <div className="equipment-list">
      {weaponsToBeDisplayed.map((weapon) => {
        return (
          <WeaponCard key={weapon.id} weapon={weapon} />
      )})}
    </div>
    </div>
  );
};

export default WeaponDisplayList;

