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

import { fetchAllEquipment, fetchAllWeapons } from '../../../../helpers/dataBase&API/APIHelpers';
import { filterSelectionListByType, filterInventoryByName, addOneItemToInventory } from '../../../../helpers/calculateCharacterData/inventoryManagement';
import TextField from '@mui/material/TextField';

import { InventoryItem } from '../../../../types/character';

export default function PopupSelectItemButton({
  label = 'Choose',
  UpdateInventory = () => {},
  buttonProps = {},
  currentInventory = [] as InventoryItem[],
  CharacterID = 1 as number
}) {
  // Controls whether the Dialog is visible
  const [open, setOpen] = useState(false);

  const [selected, setSelected] = useState<InventoryItem | null>(null);
  const [BaseList, setBaseList] = useState<InventoryItem[]>([]);
  const [selectionList, setSelectionList] = useState<InventoryItem[]>([]);
  const [searchText, setSearchText] = useState('');

  const [typeFilters, setTypeFilters] = useState({
    weapon: false,
    equipment: false,
    accesory: false
  });

  // Open the dialog
  const handleOpen = () => {
    setOpen(true);
    const fetchData = async () => {
      const weapons = await fetchAllWeapons();
      const equipment = await fetchAllEquipment();

      const weaponInventoryList = weapons.map(item => ({
        CharacterID: CharacterID,
        ObjectType: "weapon",
        ObjectSubType: item.Subtype,
        ObjectID: item.id,
        Name: item.Name,
        Quantity: 1,
      }));

      const equipmentInventoryList = equipment.map(item => ({
        CharacterID: CharacterID,
        ObjectType: "equipment",
        ObjectSubType: item.Subtype,
        ObjectID: item.id,
        Name: item.Name,
        Quantity: 1
      }));

      const combinedList = [...weaponInventoryList, ...equipmentInventoryList];

      console.log("Combined inventory list:", combinedList);

      setBaseList(combinedList as InventoryItem[]);
    };
    fetchData();
  };

  // Close the dialog and reset selection
const handleClose = () => {
  setOpen(false);
  setSelected(null);
};

  // Update state when user picks a different MenuItem
  const handleItemPickChange = (event : any ) => {

    const compositeKey = event.target.value ;
    const [selectedType, idStr] = compositeKey.split("-")


    const objectID = parseInt(idStr, 10);

    const selectedItem : InventoryItem | undefined = selectionList.find(item => item.ObjectID === objectID && item.ObjectType === selectedType);
    console.log("Selected item:", selectedItem);
    if (!selectedItem) {
        console.log("No item selected");
      setSelected(null);
    } else {

        const currentQuantity = currentInventory.find(item => item.ObjectID === selectedItem.ObjectID)?.Quantity || 0;
        
        const selectedItemUpdate = {
            CharacterID: CharacterID,
            ObjectType: selectedItem.ObjectType,
            ObjectSubType: selectedItem.ObjectSubType,
            ObjectID: selectedItem.ObjectID,
            Name: selectedItem.Name,
            Quantity: currentQuantity + 1
        }
        console.log("Updating selected item:", selectedItemUpdate);
      setSelected(selectedItemUpdate);
    }
  };

  const handleTextFilterChange = (textSearched: string) => {

    const filteredList1 = filterSelectionListByType(BaseList, typeFilters);
    const filteredList2 = filterInventoryByName(filteredList1, textSearched);
    setSelectionList(filteredList2);
  };

  const handleTypeFilterChange = (type: "weapon" | "equipment" | "accesory") => {

    let typeFiltersCopy = { ...typeFilters };

    if (typeFilters[type]) {
      typeFiltersCopy[type] = false;
    } else {
      typeFiltersCopy[type] = true;
    }
    const newSelectionList = filterSelectionListByType(BaseList, typeFiltersCopy);

    setTypeFilters(typeFiltersCopy);
    setSelectionList(newSelectionList);
  };

  // Call the parent callback with the selected value, then close
  const handleConfirm = async () => {
    if (!selected) {
        console.error("No item selected");
    } else {
      console.log("About to call addOneItemToInventory with:", selected, "with objectType:", selected.ObjectType);
      await addOneItemToInventory(selected.CharacterID, selected.ObjectType, selected.ObjectID);
      UpdateInventory();
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

          
          <div className="type-filters">  {/* Filters for inventory items */}
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

          {/* Full-width form control for proper layout */}
          <FormControl fullWidth margin="dense">
            {/* Accessible label for the Select */}
            <InputLabel id="popup-select-label">{label}</InputLabel>

            {/* The Select component wired up to our state */}
            <Select
              labelId="popup-select-label"
              id="popup-select"
              value={selected ? `${selected.ObjectType}-${selected.ObjectID}` : "none"}
              label="Choose"
              onChange={handleItemPickChange}
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
