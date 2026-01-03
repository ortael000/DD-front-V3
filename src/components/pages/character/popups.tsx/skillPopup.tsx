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
import { findChildPassives } from '../../../../helpers/calculateCharacterData/findChildSkill&Passive';

import TextField from '@mui/material/TextField';

import { CharacterBasetype, SkillDisplayed, SkillBaseType, CharacterFulltype } from '../../../../types/character';
import { equipmentType } from '../../../../types/stringLists';
import { emptyEquipment } from '../../../../data/initiateObject';

export default function PopupUpdateSkill({
  updateCharacter = () => {},
  characterKey = "Weapon1ID" as keyof CharacterBasetype,
  fullCharacter = {} as CharacterFulltype,
  currentSkillId = 1 as number
}) {
  // Controls whether the Dialog is visible
  const [open, setOpen] = useState(false);
  const [baseSelectionList, setBaseSelectionList] = useState<SkillBaseType[]>([]);  
  const [selectionList, setSelectionList] = useState<SkillBaseType[]>([]);  
  const [selectedSkill, setSelectedSkill] = useState<SkillBaseType | null >(null);
  const [searchText, setSearchText] = useState('');

  // Open the dialog
  const handleOpen = async () => {
    setOpen(true);

    const baseSkillList = await fetchAllSkills();
    const currentKnowledge = fullCharacter.Knowledge;

    const selectionList = baseSkillList.filter(skill => {

      let meetsKnowledgeRequirement = false;
      if (currentKnowledge[skill.RequiredKnowledge as keyof typeof currentKnowledge] >= skill.KnowledgeLevel) {
        meetsKnowledgeRequirement = true;
      }

      if (meetsKnowledgeRequirement && skill.ParentSkill === currentSkillId) {
        return true;
      } else {
        return false;
      }
    });


    setBaseSelectionList(selectionList);
    setSelectionList(selectionList);
    
    console.log("Selection list is:", selectionList);
  };

  // Close the dialog and reset selection
  const handleClose = () => {
    setOpen(false);
    setSelectedSkill(null);
  };

  // Update state when user picks a different MenuItem
  const handleItemPickChange = (event : any ) => {

    const selectedId = Number(event.target.value);
    console.log("Selected item ID:", selectedId);
    console.log("Selection list:", selectionList);

    const selectedItemCopy : SkillBaseType | undefined = selectionList.find(item => item.id === selectedId);

    if (!selectedItemCopy) {
        setSelectedSkill(null);
    } else {
        setSelectedSkill(selectedItemCopy);
    }

    console.log("Selected item:", selectedSkill);
  };

  const handleTextFilterChange = (textSearched: string) => {
    const baseList = baseSelectionList;
    const filteredList = baseList.filter(item => item.Name.toLowerCase().includes(textSearched.toLowerCase()));
    setSelectionList(filteredList);
  };  

  // Call the parent callback with the selected value, then close
  const handleConfirm = async () => {

    if (!selectedSkill) {
      console.log("No skill selected, closing.");
    } else {
        //here i want to update with selected Item but with quantity * -1
        console.log("Updating character with item:", selectedSkill, characterKey);
        await updateCharacterDB(fullCharacter.General.id, { [characterKey]: selectedSkill.id });
    }
    updateCharacter();
    handleClose();
  };

  return (
    <>
      {/* The button that triggers the popup */}
      <Button onClick={handleOpen}>
        {currentSkillId == 1 ? "Add" : "Update"}
      </Button>

      {/* The dialog that contains the select dropdown */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Equip or update a skill</DialogTitle>

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
              value={selectedSkill ? selectedSkill.id : "1"}
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
