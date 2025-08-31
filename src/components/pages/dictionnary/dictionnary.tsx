
import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';
import { EquipmentDisplayed, PassiveDisplayed, PassiveType } from '../../../types/character';
import { fetchAllEquipment, fetchAllPassive, fetchAllSkills, fetchAllWeapons } from '../../../helpers/APIHelpers';

import { transformPassive, transformEquipment } from '../../../helpers/calculateCharacterData/characterPageHelper';

import PassiveDisplayList from './passiveDictionnary';
import EquipmentDisplayList from './equipmentDictionnary';

import '../../CSS/dictionnary.css'


const objectList = ["equipment", "passive"]

export const DictionnaryPage = ( ) => {

    const [selectedDisplay, setSelectedDisplay] = useState("weapons")
    const [equipmentData, setEquipmentData] = useState<EquipmentDisplayed[]>([]);
    const [passiveData, setPassiveData] = useState<PassiveType[]>([]);


    const onChange = async (event: any) => {

        const selectedValue = event.target.value;
        setSelectedDisplay(selectedValue);

        if (selectedValue === "equipment") {
            const data = await fetchAllEquipment();
            setEquipmentData(data.map(transformEquipment));
        } else if (selectedValue === "passive") {
            const data = await fetchAllPassive();
            console.log("on fetch passive", data);
            setPassiveData(data);
        }
    };

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

    const returnedComponent = () => {
        if (selectedDisplay === "equipment") {
            return <EquipmentDisplayList equipment={equipmentData as EquipmentDisplayed[]} />;
        } else if (selectedDisplay === "passive") {
            return <PassiveDisplayList passives={passiveData as PassiveType[]} />;
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
            </div>
            {returnedComponent()}
        </div>
    );
}

