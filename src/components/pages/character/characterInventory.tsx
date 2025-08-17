// import library dependencies
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';


// import functions
import { fetchCharacter, fetchInventory, updateInventory } from '../../../helpers/APIHelpers';
import { calculateFullCharacter } from '../../../helpers/calculateCharacterData/characterPageHelper';
import { UpdateItemToInventory, addOneItemToInventory, removeOneItemFromInventory, removeAllItemsFromInventory } from '../../../helpers/calculateCharacterData/inventoryManagement';

// import types
import { CharacterBasetype, CharacterFulltype, InventoryItem} from '../../../types/character';

// import objects
import { initialCharacterBase, initialCharacterFull } from '../../../data/initiateObject';
import PopupSelectItemButton from './inventoryPopup';

interface Props {
  characterID: number;
}

export default function CharacterInventory({ characterID }: Props) {

  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  const itemTest : InventoryItem = {
    CharacterID: 1,
    ObjectType: "weapon",
    ObjectID: 7,
    Name: "FireSword",
    Quantity: 10
  };

  const updateInventoryState = async () => {
    try {
      const inventoryData = await fetchInventory(characterID);
      setInventory(inventoryData);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

const UpdateInventoryThenFetch = async (item: InventoryItem) => {
  console.log("UpdateInventoryThenFetch...");
  try {
    await UpdateItemToInventory(item); // Wait for the item to be added
    await updateInventoryState();          // Then fetch the updated inventory
  } catch (error) {
    console.error("Error adding item and fetching inventory:", error);
  }
};


  // 1.2 – run it on mount / characterID change
  useEffect(() => {
    updateInventoryState();
  }, [characterID]);

  return (
    <div className="character-section">

      <h2 className="general-title">
        Inventory
          <PopupSelectItemButton
            label="Pick an item"
            onConfirm={UpdateInventoryThenFetch}
            buttonProps={{ variant: 'contained', color: 'primary' }}
            currentInventory={inventory}
            CharacterID={characterID}
          />
        <Button
          size="small"
          type="button"
          className="refresh-inventory-btn"
          onClick={
            () => updateInventoryState()
          }
          variant='contained'
        > refresh </Button>
      </h2>

      <table className="general-table">
        <thead>
          <tr>
            <th className="label-cell">Category</th>
            <th className="label-cell">Item Name</th>
            <th className="value-cell">Quantity</th>
            <th className="action-cell"></th>
            <th className="action-cell"></th>
            <th className="action-cell"></th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.ObjectID}>
              <td className="label-cell small-text-cell">{item.ObjectType}</td>
              <td className="label-cell small-text-cell">{item.Name}</td>
              <td className="value-cell small-text-cell">{item.Quantity}</td>
              <td className="action-cell">
                <Button
                  size="small"
                  type="button"
                  className="mui-small-button"
                  onClick={() => UpdateInventoryThenFetch(addOneItemToInventory(item))}
                  variant='contained'
                > add 1 </Button>
              </td>
              <td className="action-cell">
                <Button
                  size="small"
                  type="button"
                  className="mui-small-button"
                  onClick={() => UpdateInventoryThenFetch(removeOneItemFromInventory(item))}
                  variant='contained'
                > remove 1 </Button>
              </td>
              <td className="action-cell">
                <Button
                  size="small"
                  type="button"
                  className="mui-small-button"
                  onClick={() => UpdateInventoryThenFetch(removeAllItemsFromInventory(item))}
                  variant='contained'
                > remove all </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
