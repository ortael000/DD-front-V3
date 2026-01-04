import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";

interface Props {
  instanceId: string;
  currentHp: number;
  onRemoveHP: (instanceId: string, hpLoss: number) => void;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function RemoveHpButton({ instanceId, currentHp, onRemoveHP }: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>("");

  const onConfirm = () => {
    const amount = Number(value);
    if (!Number.isFinite(amount)) return;

    const hpLoss = clamp(Math.floor(amount), 0, currentHp);
    if (hpLoss <= 0) return;

    onRemoveHP(instanceId, hpLoss);
    setOpen(false);
    setValue("");
  };

  return (
    <>
      <Button size="small" variant="contained" onClick={() => setOpen(true)}>
        HP -
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Remove HP</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="HP to remove"
            type="number"
            fullWidth
            value={value}
            inputProps={{ min: 0, max: currentHp }}
            onChange={(e) => setValue(e.target.value)}
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
