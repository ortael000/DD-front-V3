import React, { useState, useEffect } from 'react';
import { PassiveType } from "../../../types/character";
import {characteristicsIcons, defenseIcons} from "../../../assets/iconeList";

import { FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';

import transformPassiveToDic from "../../../helpers/dictionnary/passiveDictionnaryHelper";

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

  const initialState = passives.map(transformPassiveToDic).filter(passive => passive.Name !== "None");

  const [passiveListDisplayed, setPassiveListDisplayed] = useState(initialState);

  useEffect(() => {
    const transformed = passives.map(transformPassiveToDic).filter(passive => passive.Name !== "None");
    setPassiveListDisplayed(transformed);
  }, [passives]);

  const filterPassivesByName = (name: string) => {
    const filtered = passives.filter(passive => passive.Name.toLowerCase().includes(name.toLowerCase()));
    setPassiveListDisplayed(filtered.map(transformPassiveToDic));
  };

  const filterPassivesByCharacteristic = (characteristic: string) => {
    const filtered = passives.filter(passive => passive[characteristic as keyof PassiveType] !== 0);
    setPassiveListDisplayed(filtered.map(transformPassiveToDic));
  };

  const filterPassiveByKeyWord = (keyword: string) => {
    const filtered = initialState.filter(passive => passive.positiveBonus.toLowerCase().includes(keyword.toLowerCase()));
    setPassiveListDisplayed(filtered);
  };

  useEffect(() => {
  const transformed = passives.map(transformPassiveToDic).filter(passive => passive.Name !== "None");
  setPassiveListDisplayed(transformed);
  }, [passives]);

  return (
    <div className="equipment-dictionnary">
      <div className="filters">
        {/* input to filter passive by name */}
        <input
          type="text"
          placeholder="Filter by name..."
          onChange={(e) => filterPassivesByName(e.target.value)}
          className="filter-input"
        />

        {/* input to filter passive by characteristic (selection list from charList) */}
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

        {/* input to filter passive by characteristic (free input) */}
        <input
          type="text"
          placeholder="Filter by key word..."
          onChange={(e) => filterPassiveByKeyWord(e.target.value)}
          className="filter-input"
        />
      </div>
      <div className="equipment-list">
        {passiveListDisplayed.map((passive) => (
          <div key={passive.Id} className="item-card">
            <div className="item-title">
              <h3>{passive.Name}</h3>
              <div className="item-type-value">
                <p>Level: {passive.LevelRequired}</p>
                <p>Parent: {passives.find(p => p.id === passive.ParentPassive)?.Name}</p>
              </div>
            </div>

            <table className="general-table sub-table">
              <thead>
                <tr>
                  {Object.entries(passive.Characteristics).map(([key, value]) =>
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
                  {Object.entries(passive.Characteristics).map(([key, value]) =>
                    (typeof value === "number" && value !== 0) ? <td key={key}>{value}</td> : null
                  )}
                </tr>
              </tbody>
            </table>
            <div className="additionalEffects">
              <div className="positive-bonus">{passive.positiveBonus}</div>
              <div className="negative-bonus">{passive.negativeBonus}</div>
              <div className="other-effect">{passive.otherEffect}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PassiveSkillDisplayList;



