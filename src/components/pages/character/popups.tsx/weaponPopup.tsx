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

import { fetchAllEquipment, fetchAllWeapons, updateCharacterDB, fetchInventory, fetchItem } from '../../../../helpers/APIHelpers';
import { filterSelectionListByType, filterInventoryByName, filterEquipmentListBySubType, UpdateItemToInventory } from '../../../../helpers/calculateCharacterData/inventoryManagement';
import { addOneItemToInventory, removeOneItemFromInventory } from '../../../../helpers/calculateCharacterData/inventoryManagement';
import TextField from '@mui/material/TextField';

import { InventoryItem, CharacterBasetype } from '../../../../types/character';
import { equipmentType } from '../../../../types/stringLists';
import { emptyEquipment } from '../../../../data/initiateObject';

export default function PopupEquipWeaponButton({
  updateCharacter = () => {},
  updateInventoryState = () => {},
  characterKey = "Weapon1ID" as keyof CharacterBasetype,
  CharacterID = 1 as number,
  currentWeaponId = 1 as number
}) {
  // Controls whether the Dialog is visible
  const [open, setOpen] = useState(false);
  const [selectionList, setSelectionList] = useState<InventoryItem[]>([]);  
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null >(null);
  const [removeCurrentItem, setRemoveCurrentItem] = useState<boolean>(true);

  // Open the dialog
  const handleOpen = async () => {
    const inventory = await fetchInventory(CharacterID);
    setOpen(true);
    const newSelectionList = inventory.filter(item => item.ObjectType === "weapon");
    setSelectionList(newSelectionList);
    console.log("Opening the equipmentmanagement for ", characterKey, " with current equipment being ", currentWeaponId , "and removeCurrentItem", removeCurrentItem);
  };

  // Close the dialog and reset selection
  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
    setRemoveCurrentItem(true);
  };

  // Update state when user picks a different MenuItem
  const handleItemPickChange = (event : any ) => {

    const selectedId = Number(event.target.value);
    console.log("Selected item ID:", selectedId);
    console.log("Selection list:", selectionList);

    const selectedItemCopy : InventoryItem | undefined = selectionList.find(item => item.ObjectID === selectedId);


    if (!selectedItemCopy) {
        setSelectedItem(null);
        if (selectedId === 0 && currentWeaponId !== 1) {
            setRemoveCurrentItem(true);
        } else {
            setRemoveCurrentItem(false);
        }
    } else {
        setSelectedItem(selectedItemCopy);
        setRemoveCurrentItem(false);
    }
    console.log("Selected item:", selectedItem);
  };

  // Call the parent callback with the selected value, then close
  const handleConfirm = async () => {

    console.log("HandleConfirm start with selectedItem: ", selectedItem, "characterId", CharacterID, "and removeCurrentItem", removeCurrentItem);

    if (!selectedItem) {
        if (removeCurrentItem && currentWeaponId !== 1) {
            console.log("Removing current item:", characterKey);
            await updateCharacterDB(CharacterID, characterKey, 1);
            await addOneItemToInventory(CharacterID, "weapon", currentWeaponId);
        } else {
            console.log("No item selected, nothing to update.");
        }
    } else {
        //here i want to update with selected Item but with quantity * -1
        console.log("Updating character with item:", selectedItem, characterKey);
        await updateCharacterDB(CharacterID, characterKey ,selectedItem.ObjectID)
        await removeOneItemFromInventory(CharacterID, selectedItem.ObjectType, selectedItem.ObjectID);

        if (currentWeaponId !== 1) {
            await addOneItemToInventory(CharacterID, selectedItem.ObjectType, currentWeaponId);
        }
    }   
    updateCharacter();
    updateInventoryState();
    handleClose();
  };

  return (
    <>
      {/* The button that triggers the popup */}
      <Button onClick={handleOpen}>
        Equip
      </Button>

      {/* The dialog that contains the select dropdown */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Equip a weapon</DialogTitle>

        <DialogContent>

          {/* Full-width form control for proper layout */}
          <FormControl fullWidth margin="dense">
            {/* Accessible label for the Select */}
            <InputLabel id="popup-select-label">equip</InputLabel>

            {/* The Select component wired up to our state */}
            <Select
              labelId="popup-select-label"
              id="popup-select"
              value={selectedItem ? selectedItem.ObjectID : "0"}
              label="Choose"
              onChange={handleItemPickChange}
            >
              {/* Map each option into a MenuItem */}
              {selectionList.map((opt) => (
                <MenuItem key={`${opt.ObjectID}`} value={`${opt.ObjectID}`}>
                  {opt.Name}
                </MenuItem>
              ))}
              <MenuItem value="0">
                <em>Unequip current item</em>
              </MenuItem>
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
