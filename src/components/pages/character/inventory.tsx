// import library dependencies
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';


// import functions
import { UpdateItemToInventory, addOneItemToInventory, removeOneItemFromInventory, removeAllItemFromInventory } from '../../../helpers/calculateCharacterData/inventoryManagement';

// import types
import { CharacterBasetype, CharacterFulltype, InventoryItem} from '../../../types/character';

// import objects
import { initialCharacterBase, initialCharacterFull } from '../../../data/initiateObject';
import PopupSelectItemButton from './popups.tsx/inventoryPopup';
import ItemCardPopup from './smallComponent/itemCardPopup';

interface Props {
  characterID: number;
  inventory: InventoryItem[];
  updateInventoryState: () => void;
}

export default function CharacterInventory({ characterID, inventory, updateInventoryState }: Props) {

  if (!inventory || inventory.length === 0) {
    return (
      <div className="character-section">
        <h2 className="general-title">
          Inventory
            <PopupSelectItemButton
              label="Add an item"
              UpdateInventory={updateInventoryState}
              buttonProps={{ variant: 'contained', color: 'primary' }}
              currentInventory={inventory}
              CharacterID={characterID}
            />
        </h2>
      </div>
    );
  }
  else{
    return (
      <div className="character-section">

        <h2 className="general-title">
          Inventory
            <PopupSelectItemButton
              label="Add an item"
              UpdateInventory={updateInventoryState}
              buttonProps={{ variant: 'contained', color: 'primary' }}
              currentInventory={inventory}
              CharacterID={characterID}
            />
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
                <td className="label-cell small-text-cell"><ItemCardPopup type={item.ObjectType} item={item} label={item.Name} /></td>
                <td className="value-cell small-text-cell">{item.Quantity}</td>
                <td className="action-cell">
                  <Button
                    size="small"
                    type="button"
                    className="mui-small-button"
                    onClick={async () => {
                      await addOneItemToInventory(characterID, item.ObjectType, item.ObjectID);
                      updateInventoryState()
                    }}
                    variant='contained'
                  > add 1 </Button>
                </td>
                <td className="action-cell">
                  <Button
                    size="small"
                    type="button"
                    className="mui-small-button"
                    onClick={async () => {
                      await removeOneItemFromInventory(characterID, item.ObjectType, item.ObjectID);
                      updateInventoryState();
                    }}
                    variant='contained'
                  > remove 1 </Button>
                </td>
                <td className="action-cell">
                  <Button
                    size="small"
                    type="button"
                    className="mui-small-button"
                    onClick={async () => {
                      await removeAllItemFromInventory(characterID, item.ObjectType, item.ObjectID);
                      updateInventoryState();
                    }}
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
}
