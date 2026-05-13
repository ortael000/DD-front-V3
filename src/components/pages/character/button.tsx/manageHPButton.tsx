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

export default function ManageHPButton({ character, updateCharacter }: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>("");

  const maxHP = character.General.HitPoint;
  const currentHP = maxHP - character.General.CurrentHPLose;

  const onConfirm = async () => {
    const newHP = Number(value);
    if (!Number.isFinite(newHP)) return;

    const clampedHP = clamp(Math.floor(newHP), 0, maxHP);
    const newHPLose = maxHP - clampedHP;

    await updateCharacterDB(character.General.Id, {
      currentHPLose: newHPLose,
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
          setValue(String(currentHP));
          setOpen(true);
        }}
      >
        <img src={hitpointIcon} className="General-stat-icon" />
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Manage HP</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="HP"
            type="number"
            fullWidth
            value={value}
            inputProps={{ min: 0, max: maxHP }}
            onChange={(e) => setValue(e.target.value)}
            helperText={`Current: ${currentHP} / Max: ${maxHP}`}
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
