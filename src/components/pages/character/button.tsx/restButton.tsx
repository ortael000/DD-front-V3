import React, { useState } from 'react';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { generalIcons } from '../../../../assets/iconeList';

import { updateCharacterDB } from '../../../../helpers/dataBase&API/characterAPI';
import { CharacterFulltype } from '../../../../types/character';

interface Props {
  character: CharacterFulltype;
  updateCharacter: () => void;
}

export default function RestButton({ character, updateCharacter }: Props) {
  const [open, setOpen] = useState(false);
  const [restInfo, setRestInfo] = useState({ hpRestore: 0, manaRestore: 0 });

  const handleRest = async () => {
    const { General, Characteristics } = character;

    // Calculate HP restore: 4 + 2*(level + constitution modifier)
    const hpRestore = 4 + 2 * (General.Level + Characteristics.Constitution.Modifier);

    // Calculate Mana restore: 5 + 3*(level + power modifier + constitution modifier)
    const manaRestore = 5 + 3 * (General.Level + Characteristics.Power.Modifier + Characteristics.Constitution.Modifier);

    // Current values
    const currentHp = General.HitPoint - General.CurrentHPLose;
    const currentMana = General.Mana - General.CurrentManaLose;

    // Calculate new loss values (capped at 0 for HP and max mana for Mana)
    const newHPLose = Math.max(0, General.CurrentHPLose - hpRestore);
    const newManaLose = Math.max(0, General.CurrentManaLose - manaRestore);

    setRestInfo({ hpRestore, manaRestore });
    setOpen(true);

    // Update character in database
    await updateCharacterDB(General.Id, {
      currentHPLose: newHPLose,
      currentManaLose: newManaLose,
    });

    updateCharacter();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleRest} style={{ width: '20px', height: '20px' }}>
        <img src={generalIcons.rest} alt="Rest" style={{ width: '30px', height: '30px' }} />
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Rest Effect</DialogTitle>
        <DialogContent>
          <div style={{ padding: '1rem 0' }}>
            <p>
              <strong>HP Restored:</strong> +{restInfo.hpRestore} HP
            </p>
            <p>
              <strong>Mana Restored:</strong> +{restInfo.manaRestore} Mana
            </p>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}