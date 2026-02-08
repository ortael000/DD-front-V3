import React, { useState, useEffect } from 'react';
import { PassiveType } from "../../../types/character";
import {characteristicsIcons, defenseIcons} from "../../../assets/iconeList";

import { FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';

import transformPassiveToDic from "../../../helpers/dictionnary/passiveDictionnaryHelper";

import { findChildPassives } from '../../../helpers/calculateCharacterData/findChildSkill&Passive';
import PassiveCard from './component/passiveCard';

interface Props {
  passives: PassiveType[];
}

const allIcons = {
  ...characteristicsIcons,
  ...defenseIcons,
};

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


const PassiveSkillDisplayList: React.FC<Props> = ({ passives }) => {

  const initialState = passives.filter(passive => passive.Name !== "None");
  const firstPassiveList = initialState.filter(passive => passive.ParentPassive === 1);

  const [passiveListDisplayed, setPassiveListDisplayed] = useState(firstPassiveList);

  useEffect(() => {
    const transformed = passives.filter(passive => passive.Name !== "None");
    setPassiveListDisplayed(transformed); 
  }, [passives]);

  const filterPassivesByName = (name: string) => {
    const filtered = passives.filter(passive => passive.Name.toLowerCase().includes(name.toLowerCase()));
    setPassiveListDisplayed(filtered);
  };

  const filterPassivesByCharacteristic = (characteristic: string) => {
    const filtered = passives.filter(passive => passive[characteristic as keyof PassiveType] !== 0);
    setPassiveListDisplayed(filtered);
  };

  const filterPassiveByKeyWord = (keyword: string) => {
    const lowerKeyword = keyword.toLowerCase();

    const filtered = initialState.filter((passive) =>
      Object.entries(passive).some(([key, value]) =>
        key.toLowerCase().includes(lowerKeyword) ||
        (typeof value === "string" && value.toLowerCase().includes(lowerKeyword))
      )
    );

    setPassiveListDisplayed(filtered);
  };

  const filterByParent = (parentId: number) => {
    const childPassives = findChildPassives(parentId , passives);
    const childPassivesToDisplay = childPassives.map(passiveId => (passives.find(p => p.id === passiveId) as PassiveType));
    setPassiveListDisplayed(childPassivesToDisplay);
  };

  const resetFilters = () => {
    const transformed = passives.filter(passive => passive.Name !== "None");
    setPassiveListDisplayed(transformed);
  }

  useEffect(() => {
  const transformed = passives.filter(passive =>  (passive.Name !== "None" && passive.LevelRequired === 1) );

  setPassiveListDisplayed(transformed);
  }, [passives]);

  return (
    <div className="equipment-dictionnary">
      <div className="filters">
        <input
          type="text"
          placeholder="Filter by name..."
          onChange={(e) => filterPassivesByName(e.target.value)}
          className="filter-input"
        />

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="char-select-label">Characteristic</InputLabel>
          <Select
            labelId="char-select-label"
            onChange={(e) => filterPassivesByCharacteristic(e.target.value)}
            defaultValue=""
          >
            {charList.map((char) => (
              <MenuItem key={char} value={char}>
                {char}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <input
          type="text"
          placeholder="Filter by key word..."
          onChange={(e) => filterPassiveByKeyWord(e.target.value)}
          className="filter-input"
        />

        <Button
          variant="contained"
          onClick={resetFilters}
          className="reset-button"
        >
          Reset Filters
        </Button>

      </div>

      <div className="equipment-list">
        {passiveListDisplayed.map((passive) => {
          const parentPassive = passives.find(p => p.id === passive.ParentPassive)?.Name;
          return (
          <div key={passive.id} className='item-card-container'>
            <button
              onClick={() => filterByParent(passive.id)}
              className="child-display-button"
            >
              Display childs
            </button>
            <PassiveCard passive={passive} parentName={parentPassive} />
          </div>
          )
        }
        )}
      </div>
    </div>
          
  );
};
export default PassiveSkillDisplayList;



