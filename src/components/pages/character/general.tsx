// import library dependencies
import React, { useState, useEffect } from 'react';

// import functions
import { fetchCharacter } from '../../../helpers/dataBase&API/characterAPI';

// import types
import { CharacterBasetype, CharacterFulltype } from '../../../types/character';

// import objects
import { initialCharacterBase, initialCharacterFull } from '../../../data/initiateObject';
import MoneyDisplay from './smallComponent/money';

import hitpointIcon  from '../../../assets/generalIcons/hitpoint.png'; // Import the icon to ensure it's included in the build
import manaIcone from '../../../assets/generalIcons/mana.png'; // Import the mana icon
import initiative from '../../../assets/generalIcons/initiative.png'; // Import the initiative icon
import movement from '../../../assets/generalIcons/movement.png'; // Import the movement icon

import { defenseIcons } from '../../../assets/iconeList';

interface Props {
  character: CharacterFulltype;
}

export default function CharacterGeneral({ character }: Props) {

  console.log("Rendering CharacterGeneral", character);

  const { General } = character;

  const currentHp = General.HitPoint - General.CurrentHPLose;
  const currentMana = General.Mana - General.CurrentManaLose;

  const gold = Math.floor(General.CurrentMoney / 400);
  const silver = Math.floor((General.CurrentMoney - gold * 400) / 20)
  const copper = General.CurrentMoney - (gold * 400 + silver * 20);

  return (
    <div className="character-section">
      <h1 className="general-title">{General.Name}</h1>

      <div className="general-subtitle">
        <span className="level">Level {General.Level}</span>
        <span className="xp">XP to Next: {General.XpToNextLevel}</span>
      </div>

      <div className="general-stats">
        <div className="stat-row">
          <div className="stat-item">
            <img src =  {hitpointIcon} className="General-stat-icon" />
            <div className="stat-value">
              {currentHp} / {General.HitPoint}
            </div>
          </div>
          <div className="stat-item">
            <img src =  {manaIcone} className="General-stat-icon" />
            <div className="stat-value">
              {currentMana} / {General.Mana}
            </div>
          </div>
        </div>
        <div className="stat-row">
          <div className="stat-item">
            <img src={initiative} className="General-stat-icon" />
            <div className="stat-value">
              {General.Initiative}  
            </div>
          </div>
          <div className="stat-item">
            <img src={movement} className="General-stat-icon" />
            <div className="stat-value">
              {General.Movement}
            </div>
          </div>
        </div>


        <div className='defense-row'>
            <div className="stat-item defense-item">
              <img src =  {defenseIcons.DefenseRange} className="General-stat-icon main-defense-icone" />
              <span className="stat-value">{character.Defenses.DefenseRange}</span>
            </div>
            <div className="stat-item defense-item">
              <img src =  {defenseIcons.DefenseMelee} className="General-stat-icon main-defense-icone" />
              <span className="stat-value">{character.Defenses.DefenseMelee}</span>
            </div>
            <div className="stat-item defense-item">
              <img src =  {defenseIcons.ResPhysical} className="defense-icone" />
              <span className="stat-value">{character.Defenses.ResPhysical}</span>
            </div>
            <div className="stat-item defense-item">
              <img src =  {defenseIcons.ResChi} className="defense-icone" />
              <span className="stat-value">{character.Defenses.ResChi}</span>
            </div>
            <div className="stat-item defense-item">
              <img src =  {defenseIcons.ResFire} className="defense-icone" />
              <span className="stat-value">{character.Defenses.ResFire}</span>
            </div>
            <div className="stat-item defense-item">
              <img src =  {defenseIcons.ResLightning} className="defense-icone" />
              <span className="stat-value">{character.Defenses.ResLightning}</span>
            </div>
            <div className="stat-item defense-item">
              <img src =  {defenseIcons.ResMental} className="defense-icone" />
              <span className="stat-value">{character.Defenses.ResMental}</span>
            </div>
            <div className="stat-item defense-item">
              <img src =  {defenseIcons.ResIce} className="defense-icone" />
              <span className="stat-value">{character.Defenses.ResIce}</span>
            </div>
        </div>
        <MoneyDisplay money={General.CurrentMoney}/>
        <table className="general-table">
          <thead>
            <tr>
              <th className="label-cell">Magic</th>
              <th className="value-cell">Nature</th>
              <th className="value-cell">Martial</th>
              <th className="value-cell">Demonic</th>
              <th className="value-cell">Stealth</th>
              <th className="value-cell">Forge</th>
              <th className="value-cell">Medicine</th>
              <th className="value-cell">Cooking</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <td className="value-cell">{character.Knowledge.Magic}</td>
                <td className="value-cell">{character.Knowledge.Nature}</td>
                <td className="value-cell">{character.Knowledge.Martial}</td>
                <td className="value-cell">{character.Knowledge.Demonic}</td>
                <td className="value-cell">{character.Knowledge.Stealth}</td>
                <td className="value-cell">{character.Knowledge.Forge}</td>
                <td className="value-cell">{character.Knowledge.Medecine}</td>
                <td className="value-cell">{character.Knowledge.Cooking}</td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
