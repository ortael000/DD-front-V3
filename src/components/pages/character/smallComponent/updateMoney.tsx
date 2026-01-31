import React, { useMemo, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Alert } from "@mui/material";
import { updateCharacterDB } from "../../../../helpers/dataBase&API/characterAPI";


interface Props {
    characterId: number;
  currentMoney: number; 
  updateCharacter: () => void;
}

export default function UpdateMoney ({ characterId, currentMoney, updateCharacter }: Props) {
  const [open, setOpen] = useState(false);
  const [rawDelta, setRawDelta] = useState<string>("0");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const parsedDelta = useMemo(() => {
    // allow leading +/-, integers only
    if (!rawDelta.trim()) return NaN;
    const n = Number(rawDelta);
    return Number.isInteger(n) ? n : NaN;
  }, [rawDelta]);

  const nextMoney = useMemo(() => {
    if (!Number.isFinite(parsedDelta)) return null;
    return currentMoney + parsedDelta;
  }, [currentMoney, parsedDelta]);

  const validationMessage = useMemo(() => {
    if (!rawDelta.trim()) return "Enter an integer (can be negative).";
    if (!Number.isFinite(parsedDelta)) return "Must be an integer (e.g. 50 or -20).";
    if (nextMoney !== null && nextMoney < 0) return "Resulting money cannot be negative.";
    return null;
  }, [rawDelta, parsedDelta, nextMoney]);

  const canConfirm = !saving && !validationMessage;

  const handleClose = () => {
    if (saving) return;
    setOpen(false);
    setError(null);
    setRawDelta("0");
  };

  const handleConfirm = async () => {
    if (!canConfirm || nextMoney === null) return;

    setSaving(true);
    setError(null);

    try {
      await updateCharacterDB(characterId, { currentMoney: nextMoney });
      // refresh character in UI if provided
      handleClose();
    } catch (e: any) {
      setError(e?.message ?? "Failed to update money.");
    } finally {
      setSaving(false);
    }
    updateCharacter();
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={() => setOpen(true)}>
        add money
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Adjust money</DialogTitle>

        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="Amount (can be negative)"
            value={rawDelta}
            onChange={(e) => setRawDelta(e.target.value)}
            type="number"
            inputProps={{ step: 1 }}
            error={!!validationMessage}
            helperText={validationMessage ?? `Current: ${currentMoney}${nextMoney !== null ? ` → New: ${nextMoney}` : ""}`}
            disabled={saving}
            autoFocus
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} variant="contained" disabled={!canConfirm}>
            {saving ? "Saving..." : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
