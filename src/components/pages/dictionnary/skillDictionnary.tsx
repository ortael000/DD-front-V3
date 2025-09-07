import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';

import { SkillBaseType, PassiveType } from '../../../types/character';

import { ElementIcons, attackIcons, generalIcons, skillIcons, characteristicsIcons, defenseIcons } from '../../../assets/iconeList';

import { fetchAllPassive } from '../../../helpers/dataBase&API/APIHelpers';

// import type 
import { Element, WeaponCategory } from '../../../types/stringLists';

//import list
import { elementList, weaponCategoryList, equipmentTypeList } from '../../../data/initiateObject';


interface Props {
  skills: SkillBaseType[];
  passives: PassiveType[];
}

const SkillDisplayList: React.FC<Props> = ({ skills, passives }) => {

  const initialState = skills.filter(item => item.Name !== "None");

  const [skillToBeDisplayed, setSkillsToBeDisplayed] = useState<SkillBaseType[]>(initialState);

  const filterSkillsByName = (name: string) => {
    const filtered = skills.filter(item => item.Name.toLowerCase().includes(name.toLowerCase()));
    setSkillsToBeDisplayed(filtered);
  };

  const filterSkillsByElement = (element: string) => {
    const filtered = skills.filter(item => {
      const elem = item.Element ;
      if (elem === element) {
        return true;
      }
      return false;
    });
    setSkillsToBeDisplayed(filtered);
  };

  useEffect(() => {
    const transformed = skills.filter(item => item.Name !== "None")
    setSkillsToBeDisplayed(transformed);
  }, [skills]);


  return (
    <div>
      <div className="filters">
        {/* input to filter passive by name */}
        <input
          type="text"
          placeholder="Filter by name..."
          onChange={(e) => filterSkillsByName(e.target.value)}
          className="filter-input"
        />

        {/* input to filter passive by element (selection list from elementList) */}
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="char-select-label">Element</InputLabel>
          <Select
            labelId="char-select-label"
            onChange={(e) => filterSkillsByElement(e.target.value)}
            defaultValue=""
          >
            {elementList.map((elem) => (
              <MenuItem key={elem} value={elem}>
                {elem}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

      </div>
          <div className="equipment-list">
      {skillToBeDisplayed.map((skill) => {
        return (
          <div key={skill.id} className="item-card">
            <div className="item-title">
              <h3>{skill.Name}</h3>
              <div className="row">
                <p>Parent: {skills.find(p => p.id === skill.ParentSkill)?.Name}</p>
                <p>Required: {passives.find(p => p.id === skill.RequiredPassive)?.Name}</p>
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
                  <td className="value-cell"><img src={ElementIcons[skill.Element as keyof typeof ElementIcons]}  className="attack-icon" /></td>
                  <td className="value-cell">{skill.Type} </td>
                  <td className="value-cell">
                    <div className="bold-text"> {skill.BaseMinDam} </div>
                    <div className="small-text"> X {skill.MinDamRatio} </div>
                    </td>
                  <td className="value-cell">
                    <div className="bold-text"> {skill.BaseMaxDam} </div>
                    <div className="small-text"> X {skill.MaxDamRatio} </div>
                  </td>
                  <td className="value-cell">
                     <div className="bold-text"> {skill.BasePrecision} </div>
                     <div className="small-text"> X {skill.PrecisionRatio} </div>
                    </td>
                  <td className="value-cell">{skill.CriticScore}</td>
                  <td className="value-cell">
                  <td className="value-cell">
                    {(skill.MinDamRatio !== 0 && skill.MaxDamRatio !== 0) && (
                      <>
                        {skill.StatDam1 && (<img src={characteristicsIcons[skill.StatDam1 as keyof typeof characteristicsIcons]} className="attack-icon"/>)}
                        {skill.StatDam2 && (<img src={characteristicsIcons[skill.StatDam2 as keyof typeof characteristicsIcons]} className="attack-icon"/>)}
                      </>
                    )}
                  </td>

                  </td>
                  <td className="value-cell">
                    {(skill.PrecisionRatio !== 0) && (
                      <>
                        <img src={characteristicsIcons[skill.StatPrecision1 as keyof typeof characteristicsIcons]}  className="attack-icon" />
                        <img src={characteristicsIcons[skill.StatPrecision2 as keyof typeof characteristicsIcons]}  className="attack-icon" />
                      </>
                    )}
                  </td>
                  <td className="value-cell small-text-cell">{skill.OtherEffects}</td>
                </tr>
              </tbody>
            </table>
        </div>
      )})}
    </div>
    </div>
  );
};

export default SkillDisplayList;

