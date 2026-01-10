import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

import type { PlayerRef } from "../../../../../types/battleType";
import {
  fetchCharacter,
  updateCharacterDB,
} from "../../../../../helpers/dataBase&API/characterAPI";

interface Props {
  xpValue: number;
  players: PlayerRef[];
}

export default function SplitXpButton({ xpValue, players }: Props) {
  const [open, setOpen] = useState(false);

  const handleSplitXp = async () => {
    if (!players.length || xpValue <= 0) return;

    const xpPerPlayer = Math.floor(xpValue / players.length);

    if (xpPerPlayer <= 0) return;

    for (const p of players) {
      const char: any = await fetchCharacter(p.id);
      const currentXp = Number(char?.XpPoint ?? 0);

      await updateCharacterDB(p.id, {
        XpPoint: currentXp + xpPerPlayer,
      } as any);
    }

    setOpen(true);
  };

  const xpPerPlayer =
    players.length > 0 ? Math.floor(xpValue / players.length) : 0;

  return (
    <>
      <Button
        variant="contained"
        size="small"
        onClick={handleSplitXp}
        disabled={players.length === 0 || xpPerPlayer <= 0}
        sx={{ textTransform: "none", borderRadius: 2, fontWeight: 800 }}
      >
        Split XP
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 900 }}>
          XP Distributed
        </DialogTitle>

        <DialogContent>
          <Typography>
            Each player received <b>{xpPerPlayer}</b> XP.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button variant="contained" onClick={() => setOpen(false)}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
