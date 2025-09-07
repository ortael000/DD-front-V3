
// import library dependencies
import React, { useState, useEffect } from 'react';


import hitpointIcon  from '../../../../assets/generalIcons/hitpoint.png'; // Import the icon to ensure it's included in the build
import manaIcone from '../../../../assets/generalIcons/mana.png'; // Import the mana icon
import copperCoin from '../../../../assets/generalIcons/copperCoin.png'; // Import the copper coin icon
import silverCoin from '../../../../assets/generalIcons/silverCoin.png'; // Import the silver coin icon
import goldCoin from '../../../../assets/generalIcons/goldCoin.png'; // Import the gold coin icon


interface Props {
  money: number;
}

export default function MoneyDisplay({ money }: Props) {

  const gold = Math.floor(money / 400);
  const silver = Math.floor((money - gold * 400) / 20)
  const copper = money - (gold * 400 + silver * 20);

  return (
        <div className="stat-row money-row">
          <div className="stat-item">
            <img src =  {goldCoin} className="Coin-icon" />
            <div className="stat-value gold">{gold}</div>
          </div>
          <div className="stat-item">
            <img src =  {silverCoin} className="Coin-icon" />
            <div className="stat-value silver">{silver}</div>
          </div>
          <div className="stat-item">
            <img src =  {copperCoin} className="Coin-icon" />
            <div className="stat-value copper">{copper}</div>
          </div>
        </div>
  );
}
