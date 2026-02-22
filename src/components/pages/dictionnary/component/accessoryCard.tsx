 import React, { useState, useEffect } from 'react';
 import { FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';
 
 import { WeaponBaseType } from '../../../../types/character';
 import { ElementIcons, attackIcons, generalIcons, skillIcons, characteristicsIcons, defenseIcons } from '../../../../assets/iconeList';
 import MoneyDisplay from '../../character/smallComponent/money';
 
 
 
 interface Props {
   accessory: any;
 }
 
 const AccessoryCard: React.FC<Props> = ({ accessory }) => {
  console.log("AccessoryCard rendered with accessory:", accessory);

    if (!accessory) {  
      return <div>...</div>;
    }
   return (
          <div key={accessory.id} className="item-card">
            {accessory.Name && <h3>{accessory.Name}</h3>}
            {accessory.Description && <p>{accessory.Description}</p>}
            <MoneyDisplay money={accessory.Value}/>
        </div>
 
   );
 };
 
 export default AccessoryCard;