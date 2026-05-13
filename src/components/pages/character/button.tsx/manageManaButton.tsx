import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { updateCharacterDB } from "../../../../helpers/dataBase&API/characterAPI";
import { CharacterFulltype } from "../../../../types/character";
import hitpointIcon  from '../../../../assets/generalIcons/hitpoint.png'; // Import the icon to ensure it's included in the build
import manaIcone from '../../../../assets/generalIcons/mana.png'; // Import the mana icon

interface Props {
  character: CharacterFulltype;
  updateCharacter: () => void;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function ManageManaButton({ character, updateCharacter }: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>("");

  const maxMana = character.General.Mana;
  const currentMana = maxMana - character.General.CurrentManaLose;

  const onConfirm = async () => {
    const newMana = Number(value);
    if (!Number.isFinite(newMana)) return;

    const clampedMana = clamp(Math.floor(newMana), 0, maxMana);
    const newManaLose = maxMana - clampedMana;

    await updateCharacterDB(character.General.Id, {
      currentManaLose: newManaLose,
    } as any);

    setOpen(false);
    setValue("");
    await updateCharacter();
  };

  return (
    <>
      <Button
        size="small"
        variant="outlined"
        onClick={() => {
          setValue(String(currentMana));
          setOpen(true);
        }}
      >
        <img src={manaIcone} className="General-stat-icon" />
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Manage Mana</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Mana"
            type="number"
            fullWidth
            value={value}
            inputProps={{ min: 0, max: maxMana }}
            onChange={(e) => setValue(e.target.value)}
            helperText={`Current: ${currentMana} / Max: ${maxMana}`}
          />
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={onConfirm}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
