// src/components/PopupSelectButton.jsx
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { fetchAllEquipment, fetchAllWeapons, fetchInventory, fetchPassive, fetchItem, fetchAllPassive, fetchAllSkills } from '../../../../helpers/dataBase&API/APIHelpers';
import { updateCharacterDB } from '../../../../helpers/dataBase&API/characterAPI';
import { filterSelectionListByType, filterInventoryByName, filterEquipmentListBySubType, UpdateItemToInventory } from '../../../../helpers/calculateCharacterData/inventoryManagement';
import { addOneItemToInventory, removeOneItemFromInventory } from '../../../../helpers/calculateCharacterData/inventoryManagement';
import TextField from '@mui/material/TextField';

import { CharacterBasetype, SkillDisplayed, PassiveType, CharacterFulltype } from '../../../../types/character';
import { equipmentType } from '../../../../types/stringLists';
import { emptyEquipment } from '../../../../data/initiateObject';

export default function PopupUpdatePassive({
  updateCharacter = () => {},
  characterKey = "Weapon1ID" as keyof CharacterBasetype,
  fullCharacter = {} as CharacterFulltype,
  currentPassiveId = 1 as number
}) {
  // Controls whether the Dialog is visible
  const [open, setOpen] = useState(false);
  const [baseSelectionList, setBaseSelectionList] = useState<PassiveType[]>([]);  
  const [selectionList, setSelectionList] = useState<PassiveType[]>([]);  
  const [selectedPassive, setSelectedPassive] = useState<PassiveType | null >(null);
  const [searchText, setSearchText] = useState('');

  // Open the dialog
  const handleOpen = async () => {
    console.log("Opening passive popup for characterKey:", characterKey, "and currentPassiveId:", currentPassiveId);
    setOpen(true);
    const basePassiveList = await fetchAllPassive();
    const currentPassives: number[] = [fullCharacter.Passive.passive1.id, fullCharacter.Passive.passive2.id, fullCharacter.Passive.passive3.id, fullCharacter.Passive.passive4.id];

    const selectionList = basePassiveList.filter(passive => ((passive.LevelRequired <= fullCharacter.General.Level && passive.ParentPassive === currentPassiveId)));

    setBaseSelectionList(selectionList);
    setSelectionList(selectionList);
    
    console.log("Selection list is:", selectionList);
  };

  // Close the dialog and reset selection
  const handleClose = () => {
    setOpen(false);
    setSelectedPassive(null);
  };

  // Update state when user picks a different MenuItem
  const handleItemPickChange = (event : any ) => {

    const selectedId = Number(event.target.value);
    console.log("Selected item ID:", selectedId);
    console.log("Selection list:", selectionList);

    const selectedItemCopy : PassiveType | undefined = selectionList.find(item => item.id === selectedId);

    if (!selectedItemCopy) {
        setSelectedPassive(null);
    } else {
        setSelectedPassive(selectedItemCopy);
    }

    console.log("Selected item:", selectedPassive);
  };

  const handleTextFilterChange = (textSearched: string) => {
    const baseList = baseSelectionList;
    const filteredList = baseList.filter(item => item.Name.toLowerCase().includes(textSearched.toLowerCase()));
    setSelectionList(filteredList);
  };  

  // Call the parent callback with the selected value, then close
  const handleConfirm = async () => {

    if (!selectedPassive) {
      console.log("No passive selected, closing.");
    } else {
        //here i want to update with selected Item but with quantity * -1
        console.log("Updating character with item:", selectedPassive, characterKey);
        await updateCharacterDB(fullCharacter.General.Id, { [characterKey]: selectedPassive.id });
    }
    updateCharacter();
    handleClose();
  };

  return (
    <>
      {/* The button that triggers the popup */}
      <Button onClick={handleOpen}>
        {currentPassiveId == 1 ? "Add" : "Update"}
      </Button>

      {/* The dialog that contains the select dropdown */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Equip or update a passive</DialogTitle>

        <DialogContent>

          {/* Full-width form control for proper layout */}
          <FormControl fullWidth margin="dense">
            {/* Accessible label for the Select */}
            <InputLabel id="popup-select-label">equip</InputLabel>

          <TextField
            fullWidth
            margin="dense"
            label="Search items"
            variant="outlined"
            value={searchText}
            onChange={(e) => {
              const value = e.target.value;
              setSearchText(value);
              handleTextFilterChange(value);
            }}
          />           

            {/* The Select component wired up to our state */}
            <Select
              labelId="popup-select-label"
              id="popup-select"
              value={selectedPassive ? selectedPassive.id : "1"}
              label="Choose"
              onChange={handleItemPickChange}
            >
              {/* Map each option into a MenuItem */}
              {selectionList.map((opt) => (
                <MenuItem key={`${opt.id}`} value={opt.id}>
                  {opt.Name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions>
          {/* Cancel simply closes without confirming */}
          <Button onClick={handleClose}>Cancel</Button>

          {/* Confirm sends the selection up and closes; disabled until something’s chosen */}
          <Button
            onClick={handleConfirm}
            variant="contained"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
