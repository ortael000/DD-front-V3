import React, { useMemo, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

import { addOneItemToInventory } from "../../../../../helpers/calculateCharacterData/inventoryManagement";
import type { PlayerRef } from "../../../../../types/battleType";

interface Props {
  lootName: string;
  lootType: string; // e.g. "equipment", "weapon", "accessory"
  lootId: number;   // ObjectID
  players: PlayerRef[]; // ONLY battle participants (already filtered by parent)
}

export default function AllocateLootButton({ lootName, lootType, lootId, players }: Props) {
  const [open, setOpen] = useState(false);
  const [allocatingTo, setAllocatingTo] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isMoney = useMemo(() => lootType?.toLowerCase() === "money", [lootType]);

  // Optional: de-duplicate players by id, in case the same character appears twice
  const uniquePlayers = useMemo(() => {
    const map = new Map<number, PlayerRef>();
    for (const p of players ?? []) map.set(p.id, p);
    return Array.from(map.values());
  }, [players]);

  const allocateToPlayer = async (playerId: number) => {
    try {
      setError(null);
      setAllocatingTo(playerId);

      // Give +1 of that loot to that player's inventory
      await addOneItemToInventory(playerId, lootType as any, lootId);

      setOpen(false);
    } catch (e: any) {
      console.error(e);
      setError(e?.message ?? "Failed to allocate loot.");
    } finally {
      setAllocatingTo(null);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        size="small"
        onClick={() => {
          setError(null);
          setOpen(true);
        }}
        disabled={isMoney || uniquePlayers.length === 0}
        sx={{ textTransform: "none", borderRadius: 2, fontWeight: 800 }}
        title={
          isMoney
            ? "Money is not allocated to inventory this way."
            : uniquePlayers.length === 0
              ? "No players in this battle."
              : ""
        }
      >
        Allocate
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 900 }}>Allocate {lootName}</DialogTitle>

        <DialogContent> 

          {uniquePlayers.length === 0 ? (
            <Typography sx={{ opacity: 0.8 }}>No players found.</Typography>
          ) : (
            <div style={{ display: "grid", gap: 8, marginTop: 8 }}>
              {uniquePlayers.map((p) => (
                <Button
                  key={p.id}
                  variant="outlined"
                  onClick={() => allocateToPlayer(p.id)}
                  disabled={allocatingTo !== null}
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                    fontWeight: 800,
                    justifyContent: "space-between",
                  }}
                >
                  {p.Name}
                  {allocatingTo === p.id ? "…" : ""}
                </Button>
              ))}
            </div>
          )}

          {error && (
            <Typography sx={{ mt: 1.5, color: "error.main", fontWeight: 700 }}>
              {error}
            </Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button variant="text" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
