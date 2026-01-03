
import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';
import { EquipmentDisplayed, PassiveDisplayed, PassiveType, SkillBaseType, WeaponBaseType } from '../../../types/character';
import { Ennemy } from '../../../types/ennemy';
import { fetchAllEquipment, fetchAllPassive, fetchAllSkills, fetchAllWeapons, fetchAllEnnemies } from '../../../helpers/dataBase&API/APIHelpers';

import { transformPassive, transformEquipment } from '../../../helpers/calculateCharacterData/characterPageHelper';

import PassiveDisplayList from './passiveDictionnary';
import EquipmentDisplayList from './equipmentDictionnary';
import WeaponDisplayList from './weaponDictionnary';
import SkillsDisplayList from './skillDictionnary';
import BestiaryDisplayed from './bestiaryDictionnary';

import '../../CSS/dictionnary.css'
import passives from '../character/passives';

export const DictionnaryPage = ( ) => {

    const [selectedDisplay, setSelectedDisplay] = useState("")
    const [equipmentData, setEquipmentData] = useState<EquipmentDisplayed[]>([]);
    const [passiveData, setPassiveData] = useState<PassiveType[]>([]);
    const [weaponsData, setWeaponsData] = useState<WeaponBaseType[]>([]);
    const [skillsData, setSkillsData] = useState<SkillBaseType[]>([]);
    const [ennemiesData, setEnnemiesData] = useState<Ennemy[]>([]);

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
        setSkillsData(data);
    };

    const changeToEnnemies = async () => {
        setSelectedDisplay("ennemies");
        const ennemies = await fetchAllEnnemies();
        setEnnemiesData(ennemies);
    };

    const returnedComponent = () => {
        if (selectedDisplay === "equipment") {
            return <EquipmentDisplayList equipment={equipmentData as EquipmentDisplayed[]} />;
        } else if (selectedDisplay === "passive") {
            return <PassiveDisplayList passives={passiveData as PassiveType[]} />;
        }
        else if (selectedDisplay === "weapons") {
            return <WeaponDisplayList weapons={weaponsData as WeaponBaseType[]} />;
        } 
        else if (selectedDisplay === "skills") {
            return <SkillsDisplayList skills={skillsData as SkillBaseType[]} />;
        }
        else if (selectedDisplay === "ennemies") {
            return <BestiaryDisplayed ennemies={ennemiesData as Ennemy[]} />;
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
            <Button
                size="large"
                variant={selectedDisplay === "ennemies" ? "contained" : "outlined"}
                onClick={changeToEnnemies}
                className="select-button"
            >
                Ennemies
            </Button>
            </div>
            {returnedComponent()}
        </div>
    );

}

