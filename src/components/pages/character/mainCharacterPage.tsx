// import library dependencies
import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';

// import functions
import { fetchCharacter, fetchInventory } from '../../../helpers/APIHelpers';
import { calculateFullCharacter } from '../../../helpers/calculateCharacterData/characterPageHelper';
import { UpdateItemToInventory } from '../../../helpers/calculateCharacterData/inventoryManagement';

// import types
import { CharacterBasetype, CharacterFulltype, InventoryItem } from '../../../types/character';

// import objects
import { initialCharacterBase, initialCharacterFull } from '../../../data/initiateObject';


// import components
import CharacterCharacteristics from './characteristics';
import CharacterGeneral from './general';
import CharacterWeapon from './weapons';
import CharacterSkill from './skills';
import CharacterEquipment from './equipments';
import CharacterPassives from './passives';
import CharacterInventory from './inventory';

// import styles
import '../../CSS/muiComponent.css';

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
    const [inventory, setInventory] = useState<InventoryItem[]>([]);

    const updateCharacter = async () => {

        const currentCharacter = await fetchCharacter(selectedId);
        const fullCharacter = await calculateFullCharacter(currentCharacter);
        setCharacters(fullCharacter);
    };

    const updateInventoryState = async () => {
        try {
          const inventoryData = await fetchInventory(selectedId);
          setInventory(inventoryData);
        } catch (error) {
          console.error("Error fetching inventory:", error);
        }
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
                    onClick={async () => {
                        await updateCharacter();
                        await updateInventoryState();
                    }}
                >
                    Load Character
                </Button>
            </div>
            <CharacterGeneral character={character} />
            <CharacterCharacteristics character={character} updateCharacter ={updateCharacter} />
            <CharacterWeapon character={character} updateCharacter={updateCharacter} inventory={inventory} updateInventoryState={updateInventoryState} />
            <CharacterSkill character={character} updateCharacter={updateCharacter}  />
            <CharacterEquipment character={character} updateCharacter={updateCharacter} inventory={inventory} updateInventoryState={updateInventoryState} />
            <CharacterPassives character={character} updateCharacter={updateCharacter} />
            <CharacterInventory characterID={character.General.Id} inventory={inventory} updateInventoryState={updateInventoryState} />
        </div>
    );
}

export default CharacterPage;