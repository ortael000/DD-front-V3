import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';

import { SkillBaseType, PassiveType } from '../../../types/character';

import { ElementIcons, attackIcons, generalIcons, skillIcons, characteristicsIcons, defenseIcons } from '../../../assets/iconeList';

import { fetchAllPassive } from '../../../helpers/dataBase&API/APIHelpers';

// import type 
import { Element, WeaponCategory } from '../../../types/stringLists';

//import list
import { elementList, weaponCategoryList, equipmentTypeList, knowledgeList } from '../../../data/initiateObject';

// import functions
import { findChildSkills } from '../../../helpers/calculateCharacterData/findChildSkill&Passive';

import SkillCard from './component/skillCard';


interface Props {
  skills: SkillBaseType[];
}

const SkillDisplayList: React.FC<Props> = ({ skills }) => {

  const initialState = skills.filter(item => item.Name !== "None" && item.SkillLevel === 1);

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

  const filterSkillsByKnowledge = (knowledge: string) => {
    const filtered = skills.filter(item => {
      const know = item.RequiredKnowledge ;
      if (know === knowledge && item.KnowledgeLevel > 0 && item.SkillLevel === 1) {
        return true;
      }
      return false;
    });
    setSkillsToBeDisplayed(filtered);
  };

  const filterByParent = (parentId: number) => {
      const childSkills = findChildSkills(parentId , skills);
      console.log("childSkills", childSkills);
      const childSkillsToDisplay = childSkills.map(skillId => (skills.find(s => s.id === skillId) as SkillBaseType));
      console.log("childSkillsToDisplay", childSkillsToDisplay);

      setSkillsToBeDisplayed(childSkillsToDisplay);
  };

  useEffect(() => {
    const transformed = skills.filter(item => (item.Name !== "None" && item.SkillLevel === 1));
    setSkillsToBeDisplayed(transformed);
  }, [skills]);

  const resetFilters = () => {
    const transformed = skills.filter(item => (item.Name !== "None"));
    setSkillsToBeDisplayed(transformed);
  };


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

        {/* input to filter passive by knowledge needed (selection list from knowledgeList) */}
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="char-select-label">Knowledge</InputLabel>
          <Select
            labelId="char-select-label"
            onChange={(e) => filterSkillsByKnowledge(e.target.value)}
            defaultValue=""
          >
            {knowledgeList.map((know) => (
              <MenuItem key={know} value={know}>
                {know}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={resetFilters} 
          className="reset-button"
        >
          Reset Filters
        </Button>

      </div>
          <div className="equipment-list">
      {skillToBeDisplayed.map((skill) => {
        return (
          <div key={skill.id} className="item-card-container">
              <button onClick={() => filterByParent(skill.id)} className="child-display-button"> Display childs </button>
              <SkillCard skill={skill} parentName={skills.find(p => p.id === skill.ParentSkill)?.Name} />
        </div>
      )})}
    </div>
    </div>
  );
};

export default SkillDisplayList;

