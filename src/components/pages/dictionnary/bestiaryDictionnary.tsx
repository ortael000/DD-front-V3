import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';

import { Ennemy } from '../../../types/ennemy';
import { EquipmentFilters } from '../../../types/dictionnaryFilter';
import { ElementIcons, attackIcons, generalIcons, skillIcons, characteristicsIcons, defenseIcons } from '../../../assets/iconeList';
import {raceList} from '../../../types/stringLists';

interface Props {
  ennemies: Ennemy[];
}


const BestiaryDisplayed: React.FC<Props> = ({ ennemies }) => {

    

  const initialState = ennemies.filter(item => item.Name !== "None");

  const [ennemiesToBeDisplayed, setEnnemiesToBeDisplayed] = useState<Ennemy[]>(initialState);
  
  const [currentFilters, setCurrentFilters] = useState<any>({
    Name: "",
    Race: "All",
  });

  const filterEnnemiesByName = (name: string) => {
    const filtered = ennemies.filter(ennemy => ennemy.Name.toLowerCase().includes(name.toLowerCase()));
    setEnnemiesToBeDisplayed(filtered);
  };

  const filterEnnemiesByRace = (race: string) => {
    if (race === "All") {
      setEnnemiesToBeDisplayed(initialState);
      return;
    }
    const filtered = ennemies.filter(ennemy => ennemy.Race === race);
    setEnnemiesToBeDisplayed(filtered);
  };

  return (
    <div>
      <div className="filters"> 
        <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="char-select-label">Race</InputLabel>
            <Select
              labelId="char-select-label"
              onChange={(e) => filterEnnemiesByRace(e.target.value)}
              defaultValue=""
            >
              {raceList.map((race) => (
                <MenuItem key={race} value={race}>
                  {race}
                </MenuItem>
              ))}
            </Select>
        </FormControl>   

        <input
            type="text"
            placeholder="Filter by name..."
            onChange={(e) => filterEnnemiesByName(e.target.value)}
            className="filter-input"
        />     
      </div>

      {ennemiesToBeDisplayed.map((item : Ennemy) => {
        return (
          <div key={item.Name} className="item-card">
            <div className="item-title">
              <h3>{item.Name}</h3>
              <div className="item-type-value">
                <p>{item.Race}</p>
              </div>
              <div className="item-type-value">
                <p> XP: {item.Xp}</p>
              </div>
             
            </div>

              <div className="description-section">
                <p>{item.Description}</p>
              </div>
              
              <div className="spacer"></div>

              <span>
                <img src={generalIcons.hitPoint} className="attack-icon" />
                <span className="hitpoint-value"> {item.HitPoint}</span>
              </span>

              <span>
                <img src={generalIcons.mana} className="attack-icon"/>
                <span className="mana-value"> {item.Mana}</span>
              </span>

              <div className="spacer"></div>

            <table className="general-table sub-table">
              <thead>
                <tr>
                  <th className="value-cell"><img src={defenseIcons.DefenseMelee} className="attack-icon" /></th>
                  <th className="value-cell"><img src={defenseIcons.DefenseRange} className="attack-icon" /></th>
                  <th className="value-cell"><img src={defenseIcons.ResPhysical} className="attack-icon" /></th>
                  <th className="value-cell"><img src={defenseIcons.ResChi} className="attack-icon" /></th>
                  <th className="value-cell"><img src={defenseIcons.ResFire} className="attack-icon" /></th>
                  <th className="value-cell"><img src={defenseIcons.ResLightning} className="attack-icon" /></th>
                  <th className="value-cell"><img src={defenseIcons.ResIce} className="attack-icon" /></th>
                  <th className="value-cell"><img src={defenseIcons.ResMental} className="attack-icon" /></th>

                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{item.DefenseMelee}</td>
                  <td>{item.DefenseRange}</td>
                  <td>{item.ResPhysical}</td>
                  <td>{item.ResChi}</td>
                  <td>{item.ResFire}</td>
                  <td>{item.ResLightning}</td>
                  <td>{item.ResIce}</td>
                  <td>{item.ResMental}</td>
                </tr>
              </tbody>
              <div className="spacer"></div>
              <div className="spacer"></div>
              <div className="item-title"> 
                <h3>Attacks</h3>
                </div>
            </table>
                  <table className="general-table">
                    <thead>
                      <tr>
                        <th className="label-cell"> Name</th>
                        <th className="value-cell"><img src={skillIcons.elementWheel} className="attack-icon" /> </th>
                        <th className="value-cell"><img src={generalIcons.mana} className="attack-icon" /> </th>
                        <th className="value-cell"><img src={attackIcons.minDamage}  className="attack-icon" /> </th>
                        <th className="value-cell"><img src={attackIcons.maxDamage}  className="attack-icon" /> </th>
                        <th className="value-cell"><img src={attackIcons.precision}  className="attack-icon" /> </th>
                        <th className="value-cell ">other effect</th>
                      </tr>
                      
                    </thead>
                    <tbody>
                      <tr>
                        <td>{item.Skill1Name}</td>
                        <td className="value-cell"><img src={ElementIcons[item.Skill1Element as keyof typeof ElementIcons]}  className="attack-icon" /></td>
                        <td>{item.Skill1Cost}</td>
                        <td>{item.Skill1MinDamage}</td>
                        <td>{item.Skill1MaxDamage}</td>
                        <td>{item.Skill1TouchChance}</td>
                        <td>{item.Skill1OtherEffect}</td>
                      </tr>
                      <tr>
                        <td>{item.Skill2Name}</td>
                        <td className="value-cell"><img src={ElementIcons[item.Skill2Element as keyof typeof ElementIcons]}  className="attack-icon" /></td>
                        <td>{item.Skill2Cost}</td>
                        <td>{item.Skill2MinDamage}</td>
                        <td>{item.Skill2MaxDamage}</td>
                        <td>{item.Skill2TouchChance}</td>
                        <td>{item.Skill2OtherEffect}</td>
                      </tr>
                      <tr>
                        <td>{item.Skill3Name}</td>
                        <td className="value-cell"><img src={ElementIcons[item.Skill3Element as keyof typeof ElementIcons]}  className="attack-icon" /></td>
                        <td>{item.Skill3Cost}</td>
                        <td>{item.Skill3MinDamage}</td>
                        <td>{item.Skill3MaxDamage}</td>
                        <td>{item.Skill3TouchChance}</td>
                        <td>{item.Skill3OtherEffect}</td>
                      </tr>
                    </tbody>
                  </table>
        </div>
        )
      })}
    </div>
  );
};

export default BestiaryDisplayed;

