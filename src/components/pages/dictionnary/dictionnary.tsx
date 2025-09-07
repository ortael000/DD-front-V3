
import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';
import { EquipmentDisplayed, PassiveDisplayed, PassiveType, SkillBaseType, WeaponBaseType } from '../../../types/character';
import { fetchAllEquipment, fetchAllPassive, fetchAllSkills, fetchAllWeapons } from '../../../helpers/dataBase&API/APIHelpers';

import { transformPassive, transformEquipment } from '../../../helpers/calculateCharacterData/characterPageHelper';

import PassiveDisplayList from './passiveDictionnary';
import EquipmentDisplayList from './equipmentDictionnary';
import WeaponDisplayList from './weaponDictionnary';
import SkillsDisplayList from './skillDictionnary';

import '../../CSS/dictionnary.css'

export const DictionnaryPage = ( ) => {

    const [selectedDisplay, setSelectedDisplay] = useState("")
    const [equipmentData, setEquipmentData] = useState<EquipmentDisplayed[]>([]);
    const [passiveData, setPassiveData] = useState<PassiveType[]>([]);
    const [weaponsData, setWeaponsData] = useState<WeaponBaseType[]>([]);
    const [skillsData, setSkillsData] = useState<SkillBaseType[]>([]);

    const changeToPassive = async () => {
        setSelectedDisplay("passive");
        const data = await fetchAllPassive();
        console.log("on fetch passive", data);
        setPassiveData(data);
    };

    const changeToEquipment = async () => {
        setSelectedDisplay("equipment");
        const data = await fetchAllEquipment();
        setEquipmentData(data.map(transformEquipment));
    };

    const changeToWeapons = async () => {
        setSelectedDisplay("weapons");
        const data = await fetchAllWeapons();
        setWeaponsData(data);
    };

    const changeToSkills = async () => {
        setSelectedDisplay("skills");
        const data = await fetchAllSkills();
        const passives = await fetchAllPassive();
        setSkillsData(data);
        setPassiveData(passives);
    };

    const returnedComponent = () => {
        if (selectedDisplay === "equipment") {
            return <EquipmentDisplayList equipment={equipmentData as EquipmentDisplayed[]} />;
        } else if (selectedDisplay === "passive") {
            return <PassiveDisplayList passives={passiveData as PassiveType[]} />;
        }
        else if (selectedDisplay === "weapons") {
            return <WeaponDisplayList weapons={weaponsData as WeaponBaseType[]} />;
        } else if (selectedDisplay === "skills") {
            return <SkillsDisplayList skills={skillsData as SkillBaseType[]} passives={passiveData as PassiveType[]} />;
        }
    };
    return (
        <div className="dictionnary-page">
            <div className="select-bar">
            <Button
                size="large"
                variant={selectedDisplay === "equipment" ? "contained" : "outlined"}
                onClick={changeToEquipment}
                sx={{ marginRight: 2 }}
                className="select-button"
            >
                Equipment
            </Button>
            <Button
                size="large"
                variant={selectedDisplay === "passive" ? "contained" : "outlined"}
                onClick={changeToPassive}
                className="select-button"
            >
                Passive
            </Button>
                        <Button
                size="large"
                variant={selectedDisplay === "weapons" ? "contained" : "outlined"}
                onClick={changeToWeapons}
                className="select-button"
            >
                Weapons
            </Button>
            <Button
                size="large"
                variant={selectedDisplay === "skills" ? "contained" : "outlined"}
                onClick={changeToSkills}
                className="select-button"
            >
                Skills
            </Button>
            </div>
            {returnedComponent()}
        </div>
    );

}

