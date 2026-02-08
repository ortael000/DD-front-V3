// import library dependencies
import React from 'react';

// import types
import { CharacterBasetype, CharacterFulltype, InventoryItem } from '../../../types/character';

//import component
import PopupEquipWeaponButton from './popups.tsx/weaponPopup';
import ItemCardPopup from './smallComponent/itemCardPopup';

// import icons
import { ElementIcons, attackIcons } from '../../../assets/iconeList';

interface Props {
  character: CharacterFulltype;
  updateCharacter: () => void;
  updateInventoryState: () => void;
  inventory: InventoryItem[];
}

export default function CharacterWeapon({ character, updateCharacter, updateInventoryState, inventory }: Props) {
  const { Weapon1 } = character;
  const { Weapon2 } = character;
  const { Weapon3 } = character;

  const weapons = [
    { charKey: "Weapon1ID", object: Weapon1 },
    { charKey: "Weapon2ID", object: Weapon2 },
    { charKey: "Weapon3ID", object: Weapon3 }
  ];

  return (
    <div className="character-section">
      <h2 className="general-title">Weapons</h2>

      <table className="general-table">
        <thead>
          <tr>
            <th className="label-cell"> Equip</th>
            <th className="label-cell"> Name</th>
            <th className="value-cell">Damage Type</th>
            <th className="value-cell"><img src={attackIcons.range} className="attack-icon" /> </th>
            <th className="value-cell"><img src={attackIcons.minDamage} className="attack-icon" /> </th>
            <th className="value-cell"><img src={attackIcons.maxDamage} className="attack-icon" /> </th>
            <th className="value-cell"><img src={attackIcons.precision} className="attack-icon" /> </th>
            <th className="value-cell"><img src={attackIcons.critical} className="attack-icon" /> </th>
            <th className="value-cell">other effect</th>
          </tr>
        </thead>

        <tbody>
          {weapons.map((weapon) => (
            <tr key={weapon.charKey}>
              <td className="label-cell">
                <PopupEquipWeaponButton
                  updateCharacter={updateCharacter}
                  updateInventoryState={updateInventoryState}
                  characterKey={weapon.charKey as keyof CharacterBasetype}
                  currentWeaponId={weapon.object.id}
                  CharacterID={character.General.Id}
                />
              </td>

              {/* ✅ MINIMAL CHANGE: wrap name in popup trigger */}
              <td className="value-cell">
                <ItemCardPopup type="weapon" item={weapon.object} label={weapon.object.Name || "Empty Slot"} />
              </td>

              <td className="value-cell">
                <img
                  src={ElementIcons[weapon.object.element as keyof typeof ElementIcons]}
                  className="attack-icon"
                />
              </td>
              <td className="value-cell">{weapon.object.type}</td>
              <td className="value-cell">{weapon.object.minDamage}</td>
              <td className="value-cell">{weapon.object.maxDamage}</td>
              <td className="value-cell">{weapon.object.precision}</td>
              <td className="value-cell">{weapon.object.critical}</td>
              <td className="value-cell small-text-cell">{weapon.object.OtherEffects}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
