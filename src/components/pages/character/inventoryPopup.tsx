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

import { fetchAllEquipment, fetchAllWeapons } from '../../../helpers/APIHelpers';

import { InventoryItem } from '../../../types/character';

export default function PopupSelectItemButton({
  label = 'Choose',
  onConfirm = (item : InventoryItem) => {},
  buttonProps = {},
  currentInventory = [] as InventoryItem[],
  CharacterID = 1 as number
}) {
  // Controls whether the Dialog is visible
  const [open, setOpen] = useState(false);

  const defaultItem: InventoryItem = {
    CharacterID: CharacterID,
    ObjectType: "weapon",
    ObjectID: 0,
    Name: "none",
    Quantity: 0
  };

  const [selected, setSelected] = useState<InventoryItem>(defaultItem);
  const [BaseList, setBaseList] = useState<{ObjectType: "weapon" | "equipment" | "accesory", ObjectID: number, Name: string}[]>([]);
  const [selectionList, setSelectionList] = useState<{ObjectType: "weapon" | "equipment" | "accesory", ObjectID: number, Name: string}[]>([]);
  
  const [typeFilters, setTypeFilters] = useState({
    weapon: false,
    equipment: false,
    accesory: false
  });

  const filterSelectionListByType = (typeFilters : {weapon: boolean, equipment: boolean, accesory: boolean}) => {
    return BaseList.filter(item => typeFilters[item.ObjectType]);
  };

  // Open the dialog
  const handleOpen = () => {
    setOpen(true);
    const fetchData = async () => {
      const weapons = await fetchAllWeapons();
      const equipment = await fetchAllEquipment();

      const weaponInventoryList = weapons.map(item => ({
        ObjectType: "weapon",
        ObjectID: item.id,
        Name: item.Name
      }));

      const equipmentInventoryList = equipment.map(item => ({
        ObjectType: "equipment",
        ObjectID: item.id,
        Name: item.Name
      }));

      const combinedList = [...weaponInventoryList, ...equipmentInventoryList];
      setBaseList(combinedList as {ObjectType: "weapon" | "equipment" | "accesory", ObjectID: number, Name: string}[]);
    };
    fetchData();
  };

  // Close the dialog and reset selection
  const handleClose = () => {
    setOpen(false);
    setSelected(defaultItem);
  };

  // Update state when user picks a different MenuItem
  const handleChange = (event : any ) => {

    const compositeKey = event.target.value ;
    const [selectedType, idStr] = compositeKey.split("-")


    const objectID = parseInt(idStr, 10);

    const selectItem : {ObjectType: "weapon" | "equipment" | "accesory", ObjectID: number, Name: string} | undefined = selectionList.find(item => item.ObjectID === objectID && item.ObjectType === selectedType);
    console.log("Selected item:", selectItem);
    if (!selectItem) {
        console.log("No item selected");
      setSelected(defaultItem);
    } else {

        const currentQuantity = currentInventory.find(item => item.ObjectID === selectItem.ObjectID)?.Quantity || 0;
        
        const selectedItem = {
            CharacterID: CharacterID,
            ObjectType: selectItem.ObjectType,
            ObjectID: selectItem.ObjectID,
            Name: selectItem.Name,
            Quantity: currentQuantity + 1
        }
      setSelected(selectedItem);
    }
  };

  const handleTypeFilterChange = (type: "weapon" | "equipment" | "accesory") => {

    let typeFiltersCopy = { ...typeFilters };
    if (typeFilters[type]) {
      typeFiltersCopy[type] = false;
    } else {
      typeFiltersCopy[type] = true;
    }
    setTypeFilters(typeFiltersCopy);
    const newSelectionList = filterSelectionListByType(typeFiltersCopy)
    setSelectionList(newSelectionList);
  };

  // Call the parent callback with the selected value, then close
  const handleConfirm = () => {
    if (!selected) {
        console.error("No item selected");
    } else {
        onConfirm(selected);
    }
    handleClose();
  };

  return (
    <>
      {/* The button that triggers the popup */}
      <Button onClick={handleOpen} {...buttonProps}>
        {label}
      </Button>

      {/* The dialog that contains the select dropdown */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a new item</DialogTitle>

        <DialogContent>

          <div className="type-filters">
            <Button 
               onClick={() => handleTypeFilterChange("weapon")}
                   sx={{
                      backgroundColor: typeFilters.weapon ? 'primary.main' : '#ccc',
                      color: typeFilters.weapon ? 'white' : 'black',
                      '&:hover': {
                      backgroundColor: typeFilters.weapon ? 'primary.dark' : '#bbb'
                      }
                    }}
               >
              Weapons
            </Button>
            <Button onClick={() => handleTypeFilterChange("equipment")}
              sx={{
                backgroundColor: typeFilters.equipment ? 'primary.main' : '#ccc',
                color: typeFilters.equipment ? 'white' : 'black',
                '&:hover': {
                  backgroundColor: typeFilters.equipment ? 'primary.dark' : '#bbb'
                }
              }}
            >
              Equipment
            </Button>
            <Button onClick={() => handleTypeFilterChange("accesory")}
              sx={{
                backgroundColor: typeFilters.accesory ? 'primary.main' : '#ccc',
                color: typeFilters.accesory ? 'white' : 'black',
                '&:hover': {
                  backgroundColor: typeFilters.accesory ? 'primary.dark' : '#bbb'
                }
              }}
            >
              Accessories
            </Button>
          </div>
          {/* Full-width form control for proper layout */}
          <FormControl fullWidth margin="dense">
            {/* Accessible label for the Select */}
            <InputLabel id="popup-select-label">{label}</InputLabel>

            {/* The Select component wired up to our state */}
            <Select
              labelId="popup-select-label"
              id="popup-select"
              value="none"
              label="Choose"
              onChange={handleChange}
            >
              {/* Map each option into a MenuItem */}
              {selectionList.map((opt) => (
                <MenuItem key={`${opt.ObjectType}-${opt.ObjectID}`} value={`${opt.ObjectType}-${opt.ObjectID}`}>
                  {opt.Name}
                </MenuItem>
              ))}
              <MenuItem value="none">
                <em>None</em>
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
            disabled={!selected}
            variant="contained"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
