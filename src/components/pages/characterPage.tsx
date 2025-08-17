// import library dependencies
import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';

// import functions
import { fetchCharacter } from '../../helpers/APIHelpers';
import { calculateFullCharacter } from '../../helpers/calculateCharacterData/characterPageHelper';

// import types
import { CharacterBasetype, CharacterFulltype } from '../../types/character';

// import objects
import { initialCharacterBase, initialCharacterFull } from '../../data/initiateObject';


// import components
import CharacterCharacteristics from './character/characterCharacteristics';
import CharacterGeneral from './character/characterGeneral';
import CharacterWeapon from './character/characterWeapon';
import CharacterSkill from './character/characterSkill';
import CharacterEquipment from './character/characterEquipment';
import CharacterPassives from './character/characterPassive';
import CharacterInventory from './character/characterInventory';

// import styles
import '../CSS/muiComponent.css';

// Define props structure
interface characterProps {
  name: string;
  xpPoint: string;
}

const charactersList = [
  { id: 1, name: 'Sal-Amesh the doom of Ryza' },
  { id: 2, name: 'Kalypso of Bastaal' },
];


const CharacterPage = ( ) => {

    const [selectedId, setSelectedId] = useState("1");
    const [character, setCharacters] = useState<CharacterFulltype>(initialCharacterFull);

    const handleLoadCharacter = async () => {
        console.log("Selected character ID:", selectedId);
        const currentCharacter = await fetchCharacter(selectedId);
        //console.log("Fetched character data:", currentCharacter);

        const fullCharacter = await calculateFullCharacter(currentCharacter);
        console.log("Full character data:", fullCharacter);

        setCharacters(fullCharacter);

    };

    return (
        <div className="pageComponent main-character-page">
            <h1 className ="pageTitle" >Main Character Page</h1>
           <div className="selector-container">
                <FormControl fullWidth margin="normal"
                    sx={{ minWidth: 200, maxWidth: 300 }}>
                    <InputLabel id="character-label">Select your character</InputLabel>
                    <Select
                    labelId="character-label"
                    id="character-select"
                    value={selectedId}
                    label="Favorite Fruit"
                    onChange={(e) => setSelectedId(e.target.value)}
                    >
                    {charactersList.map((char) => (
                        <MenuItem key={char.id} value={char.id}>
                        {char.name}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
            
                <Button
                    //sx={{  backgroundColor: '#da9d4eff',color: '#ffffffff', fontWeight: 'bold' }}
                    variant="contained"
                    color="primary"
                    onClick={() => handleLoadCharacter()}
                >
                    Load Character
                </Button>
            </div>
            <CharacterGeneral character={character} />
            <CharacterCharacteristics character={character} />
            <CharacterWeapon character={character} />
            <CharacterSkill character={character} />
            <CharacterEquipment character={character} />
            <CharacterPassives character={character} />
            <CharacterInventory characterID={character.General.Id} />
        </div>
    );
}

export default CharacterPage;