// import library dependencies
import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';

// import functions
import {fetchInventory } from '../../../helpers/dataBase&API/APIHelpers';
import { fetchCharacter } from '../../../helpers/dataBase&API/characterAPI';
import { UpdateItemToInventory } from '../../../helpers/calculateCharacterData/inventoryManagement';
import { fetchAllCharacter, fetchFullCharacter } from '../../../helpers/dataBase&API/characterAPI';

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
import CreateCharacterButton from './popups.tsx/createCharacterPopUp';

// import styles
import '../../CSS/muiComponent.css';

// Define props structure
interface characterProps {
  name: string;
  xpPoint: string;
}




const CharacterPage = () => {

    const [selectedId, setSelectedId] = useState("1");
    const [noCharacterLoaded, setNoCharacterLoaded] = useState(true);
    const [characterIdList, setCharacterIdList] = useState<{id: number, Name: string}[]>([]);
    const [character, setCharacters] = useState<CharacterFulltype>(initialCharacterFull);
    const [inventory, setInventory] = useState<InventoryItem[]>([]);

    const updateCharacter = async () => {
        const fullCharacter = await fetchFullCharacter(selectedId);
        console.log("fetched full character:", fullCharacter);
        setCharacters(fullCharacter);
    };

    useEffect(() => {
    const loadCharacterList = async () => {
      const chars : CharacterBasetype[] = await fetchAllCharacter();
      const newCharactersIDList = chars.map(char => ({
        id: char.id,
        Name: char.Name
      }));
      setCharacterIdList(newCharactersIDList);
      console.log('fetched charList:', newCharactersIDList);
      console.log ("is no character loaded?", noCharacterLoaded);
    };
    loadCharacterList();
  }, []);

    const updateInventoryState = async () => {
        try {
          const inventoryData = await fetchInventory(selectedId);
          setInventory(inventoryData);
        } catch (error) {
          console.error("Error fetching inventory:", error);
        }
      };
    return ( noCharacterLoaded ? (
        <div className="pageComponent main-character-page">
          <h1 className ="pageTitle" >Main Character Page</h1>
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
                  {characterIdList.map((char) => (
                      <MenuItem key={char.id} value={char.id}>
                      {char.Name}
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
                          setNoCharacterLoaded(false);
                      }}
              >
                      Load Character
              </Button>
                  
                  <CreateCharacterButton onCreated={(payload) => {
                      console.log("Character created:", payload);
                  }} 
                  setCharacterIdList={setCharacterIdList} 
                  />
        </div>
      ) : (
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
                    {characterIdList.map((char) => (
                        <MenuItem key={char.id} value={char.id}>
                        {char.Name}
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
      )
    )
}

export default CharacterPage;