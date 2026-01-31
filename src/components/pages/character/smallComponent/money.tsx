import React from 'react';

import copperCoin from '../../../../assets/generalIcons/copperCoin.png';
import silverCoin from '../../../../assets/generalIcons/silverCoin.png';
import goldCoin from '../../../../assets/generalIcons/goldCoin.png';

import { updateCharacterDB } from '../../../../helpers/dataBase&API/characterAPI';

interface Props {
  money: number;
}

export default function MoneyDisplay({ money }: Props) {
  const gold = Math.floor(money / 400);
  const silver = Math.floor((money - gold * 400) / 20);
  const copper = money - (gold * 400 + silver * 20);

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  };

  const itemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  };

  const iconStyle: React.CSSProperties = {
    width: 18,
    height: 18,
    objectFit: 'contain',
  };

  return (
    <div style={rowStyle}>
      <div style={itemStyle}>
        <img src={goldCoin} style={iconStyle} alt="Gold" />
        <span style={{ color: '#d4af37', fontWeight: 700 }}>{gold}</span>
      </div>

      <div style={itemStyle}>
        <img src={silverCoin} style={iconStyle} alt="Silver" />
        <span style={{ color: '#c0c0c0', fontWeight: 700 }}>{silver}</span>
      </div>

      <div style={itemStyle}>
        <img src={copperCoin} style={iconStyle} alt="Copper" />
        <span style={{ color: '#b87333', fontWeight: 700 }}>{copper}</span>
      </div>
    </div>
  );
}


